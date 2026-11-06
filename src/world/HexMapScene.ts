import * as THREE from "three";
import { bus } from "../core/EventBus";
import type { HexTile, OwnerId, PlayableTribe, PlayerSave } from "../core/types";
import { HEX_SIZE, axialToWorld, forEachHex, hexDistance, hexKey, worldToAxial } from "./hexMath";
import { hexBuildingMesh } from "./hexBuildings";
import { garrisonFor } from "./warriors";
import { CARPET_RADIUS, DETAIL_RADIUS, biomeAt } from "../data/hexMap";
import type { Biome } from "../core/types";

const OWNER_TINT: Record<OwnerId, THREE.Color> = {
  sariklilar: new THREE.Color(0xc45a22),
  gokhanli: new THREE.Color(0x2f6a44),
  demirhisar: new THREE.Color(0x8aa0b8),
  neutral: new THREE.Color(0xffffff),
};

const MAX_CARPET = 3 * CARPET_RADIUS * (CARPET_RADIUS + 1) + 1;
const MAX_DETAIL = 3 * DETAIL_RADIUS * (DETAIL_RADIUS + 1) + 1;

const TREE_GEO = new THREE.ConeGeometry(0.2, 0.48, 5);
const DUNE_GEO = new THREE.SphereGeometry(0.26, 6, 4, 0, Math.PI * 2, 0, Math.PI / 2);
const ICE_GEO = new THREE.OctahedronGeometry(0.18);
const STAR_GEO = new THREE.OctahedronGeometry(0.07);
const STAR_MAT = new THREE.MeshLambertMaterial({ color: 0xf0d060, emissive: 0xc9a227, emissiveIntensity: 0.4 });

const MARK_MAT = {
  pole: new THREE.MeshLambertMaterial({ color: 0x6a4a28 }),
  cloth: new THREE.MeshLambertMaterial({ color: 0xc9a66b, emissive: 0x4a3010, emissiveIntensity: 0.12 }),
  crystal: new THREE.MeshLambertMaterial({ color: 0x4a1a6a, emissive: 0x6a1b9a, emissiveIntensity: 0.4 }),
  ring: new THREE.MeshLambertMaterial({ color: 0x2a1020, emissive: 0x3a1048, emissiveIntensity: 0.25 }),
  keep: new THREE.MeshLambertMaterial({ color: 0x1a1218, emissive: 0x2a0810, emissiveIntensity: 0.15 }),
  spire: new THREE.MeshLambertMaterial({ color: 0x4a1020, emissive: 0x6a1028, emissiveIntensity: 0.3 }),
};

const MARK_GEO = {
  pole: new THREE.CylinderGeometry(0.04, 0.05, 0.7, 5),
  cloth: new THREE.ConeGeometry(0.42, 0.38, 5),
  crystal: new THREE.OctahedronGeometry(0.42),
  ring: new THREE.TorusGeometry(0.38, 0.04, 4, 10),
  keep: new THREE.BoxGeometry(0.55, 0.9, 0.55),
  spire: new THREE.ConeGeometry(0.22, 0.4, 5),
};

function tileKey(tile: HexTile): string {
  return `${tile.id}|${tile.owner}|${tile.slot ?? ""}|${tile.level}|${tile.garrison}|${tile.landmark ?? ""}|${tile.stars ?? 0}`;
}

export class HexMapScene {
  readonly root = new THREE.Group();
  active = false;
  private marks = new THREE.Group();
  private selectRing: THREE.Mesh;
  private ray = new THREE.Raycaster();
  private pointer = new THREE.Vector2();
  private dragging = false;
  private moved = false;
  private lastX = 0;
  private lastY = 0;
  private pinch = 0;
  private target = new THREE.Vector3(0, 0.4, 0);
  private yaw = 0.62;
  private pitch = 0.92;
  private dist = 18;
  private lookId: string | null = null;
  private save: PlayerSave | null = null;
  private focus = new THREE.Vector3();
  private lookAt = new THREE.Vector3();
  private focusStep = new THREE.Vector3();
  private lastExplore = "";
  private exploreAt = 0;
  private followSelect = true;
  private carpet: THREE.InstancedMesh;
  private trees: THREE.InstancedMesh;
  private dunes: THREE.InstancedMesh;
  private ice: THREE.InstancedMesh;
  private carpetIds: string[] = [];
  private carpetKey = "";
  private readonly dummy = new THREE.Object3D();
  private readonly tint = new THREE.Color();
  private readonly props = new Map<string, THREE.Object3D>();
  private readonly propKey = new Map<string, string>();
  private readonly byId = new Map<string, HexTile>();
  private readonly carpetColors: Record<Biome, THREE.Color> = {
    desert: new THREE.Color(0xc4a05a),
    forest: new THREE.Color(0x3f6a3a),
    ice: new THREE.Color(0xc8d8e8),
  };

  constructor(
    private readonly canvas: HTMLCanvasElement,
    private readonly camera: THREE.PerspectiveCamera,
  ) {
    this.root.name = "hex-map";
    this.root.add(this.marks);
    this.selectRing = new THREE.Mesh(
      new THREE.TorusGeometry(HEX_SIZE * 0.92, 0.045, 6, 6),
      new THREE.MeshLambertMaterial({ color: 0xf0d060, emissive: 0xc9a227, emissiveIntensity: 0.45 }),
    );
    this.selectRing.rotation.x = -Math.PI / 2;
    this.selectRing.position.y = 0.42;
    this.selectRing.visible = false;
    this.root.add(this.selectRing);

    this.carpet = this.makeInstances(new THREE.CylinderGeometry(HEX_SIZE * 0.96, HEX_SIZE * 0.96, 0.28, 6), 0xffffff, MAX_CARPET);
    this.carpet.position.y = -0.04;
    this.trees = this.makeInstances(TREE_GEO, 0x245a32, MAX_DETAIL);
    this.dunes = this.makeInstances(DUNE_GEO, 0xe8c070, MAX_DETAIL);
    this.ice = this.makeInstances(ICE_GEO, 0xa8d8ff, MAX_DETAIL);
    this.root.add(this.carpet, this.trees, this.dunes, this.ice);
    this.bindInput();
  }

  sync(save: PlayerSave): void {
    this.save = save;
    if (this.byId.size !== save.tiles.length) {
      this.byId.clear();
      for (const tile of save.tiles) this.byId.set(tile.id, tile);
    }
    if (this.followSelect) this.lookId = save.selectedHex;
    const selected = this.followSelect && save.selectedHex ? this.byId.get(save.selectedHex) : undefined;
    const focus = selected
      ? { q: selected.q, r: selected.r }
      : worldToAxial(this.target.x, this.target.z);
    this.layoutCarpet(focus.q, focus.r, save);
    this.syncProps(save, focus.q, focus.r);
    if (`${focus.q},${focus.r}` !== this.lastExplore) {
      this.lastExplore = `${focus.q},${focus.r}`;
      bus.emit("explore", focus);
    }
    this.placeSelect(save.selectedHex);
  }

  update(elapsed: number): void {
    this.selectRing.rotation.z = elapsed * 0.45;
  }

  placeCamera(): void {
    this.focus.copy(this.target);
    if (this.lookId && this.save) {
      const tile = this.byId.get(this.lookId);
      if (tile) {
        const { x, z } = axialToWorld(tile.q, tile.r);
        this.focusStep.set(x, 0.3, z);
        this.focus.lerp(this.focusStep, 0.12);
        this.target.copy(this.focus);
      }
    }
    const x = this.focus.x + Math.sin(this.yaw) * Math.cos(this.pitch) * this.dist;
    const y = this.focus.y + Math.sin(this.pitch) * this.dist;
    const z = this.focus.z + Math.cos(this.yaw) * Math.cos(this.pitch) * this.dist;
    this.camera.position.set(x, y, z);
    this.lookAt.set(this.focus.x, 0.35, this.focus.z);
    this.camera.lookAt(this.lookAt);
  }

  private makeInstances(geometry: THREE.BufferGeometry, color: number, capacity: number): THREE.InstancedMesh {
    const mesh = new THREE.InstancedMesh(geometry, new THREE.MeshLambertMaterial({ color }), capacity);
    mesh.castShadow = false;
    mesh.receiveShadow = false;
    mesh.count = 0;
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    mesh.frustumCulled = false;
    return mesh;
  }

  private layoutCarpet(q: number, r: number, save: PlayerSave): void {
    const known = new Map<string, HexTile>();
    let stamp = 0;
    for (const tile of save.tiles) {
      known.set(tile.id, tile);
      if (hexDistance(q, r, tile.q, tile.r) <= CARPET_RADIUS) stamp = (stamp + tile.level + tile.owner.charCodeAt(0)) | 0;
    }
    const key = `${q},${r}|${stamp}`;
    if (key === this.carpetKey) return;
    this.carpetKey = key;
    this.carpetIds = [];
    let index = 0;
    let trees = 0;
    let dunes = 0;
    let shards = 0;
    forEachHex(q, r, CARPET_RADIUS, (qq, rr) => {
      const id = hexKey(qq, rr);
      const tile = known.get(id);
      const biome = tile?.biome ?? biomeAt(qq, rr);
      const { x, z } = axialToWorld(qq, rr);
      const height = biome === "ice" ? 0.38 : biome === "forest" ? 0.3 : 0.24;
      this.dummy.position.set(x, height / 2, z);
      this.dummy.rotation.set(0, 0, 0);
      this.dummy.scale.set(1, height / 0.28, 1);
      this.dummy.updateMatrix();
      this.carpet.setMatrixAt(index, this.dummy.matrix);
      this.tint.copy(this.carpetColors[biome]);
      if (tile && tile.owner !== "neutral") this.tint.lerp(OWNER_TINT[tile.owner], 0.38);
      this.carpet.setColorAt(index, this.tint);
      this.carpetIds[index] = id;
      index += 1;

      if (hexDistance(q, r, qq, rr) > DETAIL_RADIUS) return;
      if (tile?.slot || tile?.landmark) return;
      if (Math.abs(qq * 3 + rr * 5) % 3 !== 0) return;
      this.dummy.position.set(x, 0.28, z);
      this.dummy.rotation.set(0, (qq + rr) * 0.4, 0);
      this.dummy.scale.set(1, 1, 1);
      this.dummy.updateMatrix();
      if (biome === "forest" && trees < MAX_DETAIL) this.trees.setMatrixAt(trees++, this.dummy.matrix);
      else if (biome === "desert" && dunes < MAX_DETAIL) this.dunes.setMatrixAt(dunes++, this.dummy.matrix);
      else if (biome === "ice" && shards < MAX_DETAIL) this.ice.setMatrixAt(shards++, this.dummy.matrix);
    });
    this.carpet.count = index;
    this.trees.count = trees;
    this.dunes.count = dunes;
    this.ice.count = shards;
    this.carpet.instanceMatrix.needsUpdate = true;
    this.trees.instanceMatrix.needsUpdate = true;
    this.dunes.instanceMatrix.needsUpdate = true;
    this.ice.instanceMatrix.needsUpdate = true;
    if (this.carpet.instanceColor) this.carpet.instanceColor.needsUpdate = true;
  }

  private syncProps(save: PlayerSave, q: number, r: number): void {
    const keep = new Set<string>();
    for (const tile of save.tiles) {
      if (hexDistance(q, r, tile.q, tile.r) > DETAIL_RADIUS) continue;
      if (!tile.slot && !tile.landmark && !(tile.stars && tile.stars > 0)) continue;
      keep.add(tile.id);
      const key = tileKey(tile);
      if (this.propKey.get(tile.id) === key) continue;
      const prev = this.props.get(tile.id);
      if (prev) this.marks.remove(prev);
      const made = this.dress(tile);
      this.marks.add(made);
      this.props.set(tile.id, made);
      this.propKey.set(tile.id, key);
    }
    for (const [id, obj] of this.props) {
      if (keep.has(id)) continue;
      this.marks.remove(obj);
      this.props.delete(id);
      this.propKey.delete(id);
    }
  }

  private emitExplore(): void {
    const now = performance.now();
    if (now - this.exploreAt < 280) return;
    this.exploreAt = now;
    const focus = worldToAxial(this.target.x, this.target.z);
    const key = `${focus.q},${focus.r}`;
    if (key === this.lastExplore) return;
    this.lastExplore = key;
    bus.emit("explore", focus);
  }

  private dress(tile: HexTile): THREE.Group {
    const group = new THREE.Group();
    const { x, z } = axialToWorld(tile.q, tile.r);
    group.position.set(x, 0.28, z);
    const tribe = (tile.owner === "neutral" ? biomeTribe(tile.biome) : tile.owner) as PlayableTribe;
    if (tile.landmark) {
      group.add(landmarkMesh(tile.landmark));
    } else {
      const built = hexBuildingMesh(tile, tribe);
      if (built) group.add(built);
    }
    if (tile.stars && tile.stars > 0) group.add(starMarks(tile.stars));
    if (tile.owner !== "neutral" && (tile.slot === "hall" || tile.slot === "camp") && !tile.landmark) {
      const troops = garrisonFor(tile.owner, tile.slot === "hall" ? 2 : 1);
      troops.position.set(0.15, 0, 0.28);
      group.add(troops);
    }
    return group;
  }

  private placeSelect(id: string | null): void {
    if (!id || !this.save) {
      this.selectRing.visible = false;
      return;
    }
    const tile = this.byId.get(id);
    if (!tile) {
      this.selectRing.visible = false;
      return;
    }
    const { x, z } = axialToWorld(tile.q, tile.r);
    this.selectRing.position.set(x, 0.48, z);
    this.selectRing.visible = true;
  }

  private bindInput(): void {
    this.canvas.addEventListener("pointerdown", (event) => {
      if (!this.active) return;
      this.dragging = true;
      this.moved = false;
      this.lastX = event.clientX;
      this.lastY = event.clientY;
    });
    this.canvas.addEventListener("pointermove", (event) => {
      if (!this.active || !this.dragging) return;
      const dx = event.clientX - this.lastX;
      const dy = event.clientY - this.lastY;
      if (Math.hypot(dx, dy) > 6) this.moved = true;
      this.lastX = event.clientX;
      this.lastY = event.clientY;
      this.target.x -= (dx * 0.022 + dy * 0.012) * (this.dist / 16);
      this.target.z -= (dy * 0.022 - dx * 0.008) * (this.dist / 16);
      this.lookId = null;
      this.followSelect = false;
      this.emitExplore();
    });
    this.canvas.addEventListener("pointerup", (event) => {
      if (!this.active) return;
      if (this.dragging && !this.moved) this.pick(event.clientX, event.clientY);
      this.dragging = false;
    });
    this.canvas.addEventListener(
      "wheel",
      (event) => {
        if (!this.active) return;
        event.preventDefault();
        this.dist = THREE.MathUtils.clamp(this.dist + event.deltaY * 0.014, 10, 42);
      },
      { passive: false },
    );
    this.canvas.addEventListener("touchstart", (event) => {
      if (!this.active) return;
      if (event.touches.length === 2) this.pinch = gap(event.touches[0], event.touches[1]);
    });
    this.canvas.addEventListener("touchmove", (event) => {
      if (!this.active || event.touches.length !== 2) return;
      const next = gap(event.touches[0], event.touches[1]);
      this.dist = THREE.MathUtils.clamp(this.dist + (this.pinch - next) * 0.02, 10, 42);
      this.pinch = next;
    });
  }

  private pick(cx: number, cy: number): void {
    const rect = this.canvas.getBoundingClientRect();
    this.pointer.x = ((cx - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -((cy - rect.top) / rect.height) * 2 + 1;
    this.ray.setFromCamera(this.pointer, this.camera);
    const carpetHit = this.ray.intersectObject(this.carpet, false)[0];
    const id = carpetHit && carpetHit.instanceId != null ? this.carpetIds[carpetHit.instanceId] : undefined;
    if (!id) return;
    this.lookId = id;
    this.followSelect = true;
    this.placeSelect(id);
    bus.emit("hex-select", id);
  }
}

function landmarkMesh(kind: NonNullable<HexTile["landmark"]>): THREE.Group {
  const group = new THREE.Group();
  if (kind === "side") {
    const pole = new THREE.Mesh(MARK_GEO.pole, MARK_MAT.pole);
    pole.position.y = 0.35;
    const cloth = new THREE.Mesh(MARK_GEO.cloth, MARK_MAT.cloth);
    cloth.position.y = 0.72;
    group.add(pole, cloth);
  } else if (kind === "temple") {
    const crystal = new THREE.Mesh(MARK_GEO.crystal, MARK_MAT.crystal);
    crystal.position.y = 0.48;
    const ring = new THREE.Mesh(MARK_GEO.ring, MARK_MAT.ring);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.18;
    group.add(crystal, ring);
  } else {
    const keep = new THREE.Mesh(MARK_GEO.keep, MARK_MAT.keep);
    keep.position.y = 0.5;
    const spire = new THREE.Mesh(MARK_GEO.spire, MARK_MAT.spire);
    spire.position.y = 1.1;
    group.add(keep, spire);
  }
  return group;
}

function starMarks(stars: number): THREE.Group {
  const group = new THREE.Group();
  group.position.y = 0.7;
  for (let i = 0; i < stars; i += 1) {
    const star = new THREE.Mesh(STAR_GEO, STAR_MAT);
    star.position.set((i - (stars - 1) / 2) * 0.2, 0, 0);
    group.add(star);
  }
  return group;
}

function biomeTribe(biome: HexTile["biome"]): PlayableTribe {
  if (biome === "desert") return "sariklilar";
  if (biome === "ice") return "demirhisar";
  return "gokhanli";
}

function gap(a: Touch, b: Touch): number {
  return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
}
