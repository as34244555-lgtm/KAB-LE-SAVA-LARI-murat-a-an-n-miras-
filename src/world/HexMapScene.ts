import * as THREE from "three";
import { bus } from "../core/EventBus";
import type { HexTile, OwnerId, PlayableTribe, PlayerSave } from "../core/types";
import { HEX_SIZE, axialToWorld, forEachHex, hexDistance, hexKey, worldToAxial } from "./hexMath";
import { hexBuildingMesh } from "./hexBuildings";
import { garrisonFor } from "./warriors";
import { cachedPbr } from "./textures";
import { hexTopMat } from "./hexTerrain";
import { CARPET_RADIUS, DETAIL_RADIUS, biomeAt } from "../data/hexMap";
import type { Biome } from "../core/types";

const OWNER_RIM: Record<OwnerId, number> = {
  sariklilar: 0xc45a22,
  gokhanli: 0x3a7a58,
  demirhisar: 0x7a8aaa,
  neutral: 0x6a6054,
};

const HEX_GEO = {
  desert: new THREE.CylinderGeometry(HEX_SIZE * 0.96, HEX_SIZE * 0.96, 0.24, 6),
  forest: new THREE.CylinderGeometry(HEX_SIZE * 0.96, HEX_SIZE * 0.96, 0.3, 6),
  ice: new THREE.CylinderGeometry(HEX_SIZE * 0.96, HEX_SIZE * 0.96, 0.38, 6),
  rim: new THREE.CylinderGeometry(HEX_SIZE * 0.97, HEX_SIZE * 0.97, 0.05, 6, 1, true),
};

const LEAF = new THREE.MeshStandardMaterial({ color: 0x2f6a38, roughness: 0.7 });
const CROWN = new THREE.MeshStandardMaterial({ color: 0x245a32, roughness: 0.72 });
const ICE = new THREE.MeshStandardMaterial({ color: 0xa8d8ff, roughness: 0.18, metalness: 0.3 });

const RIM_MAT: Record<OwnerId, THREE.MeshStandardMaterial> = {
  sariklilar: rimMat(OWNER_RIM.sariklilar, 0.18),
  gokhanli: rimMat(OWNER_RIM.gokhanli, 0.18),
  demirhisar: rimMat(OWNER_RIM.demirhisar, 0.18),
  neutral: rimMat(OWNER_RIM.neutral, 0.04),
};

function rimMat(color: number, emit: number): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: 0.45,
    metalness: 0.2,
    emissive: color,
    emissiveIntensity: emit,
  });
}

function tileKey(tile: HexTile): string {
  return `${tile.id}|${tile.owner}|${tile.slot ?? ""}|${tile.level}|${tile.garrison}|${tile.landmark ?? ""}|${tile.stars ?? 0}`;
}

export class HexMapScene {
  readonly root = new THREE.Group();
  active = false;
  private tiles = new THREE.Group();
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
  private worldKey = "";
  private focus = new THREE.Vector3();
  private lookAt = new THREE.Vector3();
  private lastExplore = "";
  private exploreAt = 0;
  private followSelect = true;
  private carpet: THREE.InstancedMesh;
  private carpetIds: string[] = [];
  private carpetKey = "";
  private readonly dummy = new THREE.Object3D();
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
    this.root.add(this.tiles, this.marks);
    this.selectRing = new THREE.Mesh(
      new THREE.TorusGeometry(HEX_SIZE * 0.92, 0.045, 8, 6),
      new THREE.MeshStandardMaterial({
        color: 0xf0d060,
        emissive: 0xc9a227,
        emissiveIntensity: 0.65,
        roughness: 0.35,
        metalness: 0.25,
      }),
    );
    this.selectRing.rotation.x = -Math.PI / 2;
    this.selectRing.position.y = 0.42;
    this.selectRing.visible = false;
    this.root.add(this.selectRing);
    const maxCarpet = 3 * CARPET_RADIUS * (CARPET_RADIUS + 1) + 1;
    this.carpet = new THREE.InstancedMesh(
      new THREE.CylinderGeometry(HEX_SIZE * 0.96, HEX_SIZE * 0.96, 0.28, 6),
      new THREE.MeshStandardMaterial({ roughness: 0.72, metalness: 0.08 }),
      maxCarpet,
    );
    this.carpet.receiveShadow = false;
    this.carpet.castShadow = false;
    this.carpet.position.y = -0.04;
    this.carpet.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.carpet.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(maxCarpet * 3), 3);
    this.root.add(this.carpet);
    this.bindInput();
  }

  sync(save: PlayerSave): void {
    this.save = save;
    if (this.followSelect) this.lookId = save.selectedHex;
    const selected = this.followSelect && save.selectedHex
      ? save.tiles.find((tile) => tile.id === save.selectedHex)
      : undefined;
    const focus = selected
      ? { q: selected.q, r: selected.r }
      : worldToAxial(this.target.x, this.target.z);
    this.layoutCarpet(focus.q, focus.r);
    if (`${focus.q},${focus.r}` !== this.lastExplore) {
      this.lastExplore = `${focus.q},${focus.r}`;
      bus.emit("explore", focus);
    }
    const visible = save.tiles.filter((tile) => hexDistance(focus.q, focus.r, tile.q, tile.r) <= DETAIL_RADIUS);
    const next = `${focus.q},${focus.r}|` + visible.map(tileKey).join(";");
    if (next !== this.worldKey) {
      this.worldKey = next;
      this.rebuild(visible);
    }
    this.placeSelect(save.selectedHex);
  }

  update(elapsed: number): void {
    this.selectRing.rotation.z = elapsed * 0.45;
  }

  placeCamera(): void {
    this.focus.copy(this.target);
    if (this.lookId && this.save) {
      const tile = this.save.tiles.find((item) => item.id === this.lookId);
      if (tile) {
        const { x, z } = axialToWorld(tile.q, tile.r);
        this.focus.lerp(new THREE.Vector3(x, 0.3, z), 0.12);
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

  private rebuild(visible: HexTile[]): void {
    this.tiles.clear();
    this.marks.clear();
    for (const tile of visible) {
      this.tiles.add(this.makeCell(tile));
      this.dress(tile);
    }
  }

  private layoutCarpet(q: number, r: number): void {
    const key = `${q},${r}`;
    if (key === this.carpetKey) return;
    this.carpetKey = key;
    this.carpetIds = [];
    let index = 0;
    forEachHex(q, r, CARPET_RADIUS, (qq, rr) => {
      if (hexDistance(q, r, qq, rr) <= DETAIL_RADIUS) return;
      const biome = biomeAt(qq, rr);
      const { x, z } = axialToWorld(qq, rr);
      const height = biome === "ice" ? 0.38 : biome === "forest" ? 0.3 : 0.24;
      this.dummy.position.set(x, height / 2, z);
      this.dummy.scale.set(1, height / 0.28, 1);
      this.dummy.updateMatrix();
      this.carpet.setMatrixAt(index, this.dummy.matrix);
      this.carpet.setColorAt(index, this.carpetColors[biome]);
      this.carpetIds[index] = hexKey(qq, rr);
      index += 1;
    });
    this.carpet.count = index;
    this.carpet.instanceMatrix.needsUpdate = true;
    if (this.carpet.instanceColor) this.carpet.instanceColor.needsUpdate = true;
  }

  private emitExplore(): void {
    const now = performance.now();
    if (now - this.exploreAt < 180) return;
    this.exploreAt = now;
    const focus = worldToAxial(this.target.x, this.target.z);
    const key = `${focus.q},${focus.r}`;
    if (key === this.lastExplore) return;
    this.lastExplore = key;
    bus.emit("explore", focus);
  }

  private makeCell(tile: HexTile): THREE.Mesh {
    const height = tile.biome === "ice" ? 0.38 : tile.biome === "forest" ? 0.3 : 0.24;
    const geo = HEX_GEO[tile.biome];
    const mesh = new THREE.Mesh(geo, hexTopMat(tile.biome));
    const { x, z } = axialToWorld(tile.q, tile.r);
    mesh.position.set(x, height / 2, z);
    mesh.castShadow = false;
    mesh.receiveShadow = false;
    mesh.userData.hexId = tile.id;
    const rim = new THREE.Mesh(HEX_GEO.rim, RIM_MAT[tile.owner]);
    rim.position.y = height / 2 + 0.01;
    mesh.add(rim);
    return mesh;
  }

  private dress(tile: HexTile): void {
    const { x, z } = axialToWorld(tile.q, tile.r);
    const tribe = (tile.owner === "neutral" ? biomeTribe(tile.biome) : tile.owner) as PlayableTribe;
    if (tile.landmark) {
      const mark = landmarkMesh(tile.landmark);
      mark.position.set(x, 0.3, z);
      this.marks.add(mark);
    } else {
      const built = hexBuildingMesh(tile, tribe);
      if (built) {
        built.position.set(x, 0.28, z);
        this.marks.add(built);
      } else {
        this.scatterNature(tile, x, z);
      }
    }
    if (tile.stars && tile.stars > 0) {
      this.marks.add(starMarks(x, z, tile.stars));
    }
    if (tile.owner !== "neutral" && (tile.slot === "hall" || tile.slot === "camp") && !tile.landmark) {
      const troops = garrisonFor(tile.owner, tile.slot === "hall" ? 2 : 1);
      troops.position.set(x + 0.15, 0.26, z + 0.28);
      troops.scale.setScalar(0.85);
      this.marks.add(troops);
    }
  }

  private scatterNature(tile: HexTile, x: number, z: number): void {
    const group = new THREE.Group();
    group.position.set(x, 0.22, z);
    if (tile.biome === "desert") {
      const dune = new THREE.Mesh(
        new THREE.SphereGeometry(0.28, 8, 6, 0, Math.PI * 2, 0, Math.PI / 2),
        cachedPbr("sand", 0xe8c070, { repeat: 1.4 }),
      );
      dune.position.set(-0.2, 0, 0.1);
      const palm = new THREE.Mesh(
        new THREE.CylinderGeometry(0.03, 0.045, 0.55, 5),
        cachedPbr("wood", 0x8a5a28, { repeat: 1 }),
      );
      palm.position.set(0.22, 0.28, -0.1);
      const leaf = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.18, 5), LEAF);
      leaf.position.set(0.22, 0.58, -0.1);
      group.add(dune, palm, leaf);
    } else if (tile.biome === "forest") {
      const trunk = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.05, 0.4, 5),
        cachedPbr("wood", 0x4a2e18, { repeat: 1 }),
      );
      trunk.position.set(0, 0.2, 0);
      const crown = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.42, 6), CROWN);
      crown.position.set(0, 0.52, 0);
      group.add(trunk, crown);
    } else {
      const shard = new THREE.Mesh(new THREE.OctahedronGeometry(0.2), ICE);
      shard.position.set(0.1, 0.28, -0.08);
      group.add(shard);
    }
    this.marks.add(group);
  }

  private placeSelect(id: string | null): void {
    if (!id || !this.save) {
      this.selectRing.visible = false;
      return;
    }
    const tile = this.save.tiles.find((item) => item.id === id);
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
    const detailHits = this.ray.intersectObjects(this.tiles.children, true);
    const detail = detailHits.find((item) => item.object.userData.hexId || item.object.parent?.userData.hexId);
    let id = (detail?.object.userData.hexId ?? detail?.object.parent?.userData.hexId) as string | undefined;
    if (!id) {
      const carpetHit = this.ray.intersectObject(this.carpet, false)[0];
      if (carpetHit && carpetHit.instanceId != null) id = this.carpetIds[carpetHit.instanceId];
    }
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
    const pole = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.05, 0.7, 6),
      new THREE.MeshStandardMaterial({ color: 0x6a4a28, roughness: 0.7 }),
    );
    pole.position.y = 0.35;
    const cloth = new THREE.Mesh(
      new THREE.ConeGeometry(0.42, 0.38, 6),
      new THREE.MeshStandardMaterial({ color: 0xc9a66b, roughness: 0.55, emissive: 0x4a3010, emissiveIntensity: 0.12 }),
    );
    cloth.position.y = 0.72;
    group.add(pole, cloth);
  } else if (kind === "temple") {
    const crystal = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.42),
      new THREE.MeshStandardMaterial({
        color: 0x4a1a6a,
        roughness: 0.18,
        metalness: 0.35,
        emissive: 0x6a1b9a,
        emissiveIntensity: 0.55,
      }),
    );
    crystal.position.y = 0.48;
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(0.38, 0.04, 6, 16),
      new THREE.MeshStandardMaterial({ color: 0x2a1020, emissive: 0x3a1048, emissiveIntensity: 0.3 }),
    );
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.18;
    group.add(crystal, ring);
  } else {
    const keep = new THREE.Mesh(
      new THREE.BoxGeometry(0.55, 0.9, 0.55),
      new THREE.MeshStandardMaterial({ color: 0x1a1218, roughness: 0.5, metalness: 0.25, emissive: 0x2a0810, emissiveIntensity: 0.2 }),
    );
    keep.position.y = 0.5;
    const spire = new THREE.Mesh(
      new THREE.ConeGeometry(0.22, 0.4, 5),
      new THREE.MeshStandardMaterial({ color: 0x4a1020, emissive: 0x6a1028, emissiveIntensity: 0.35 }),
    );
    spire.position.y = 1.1;
    group.add(keep, spire);
  }
  return group;
}

function starMarks(x: number, z: number, stars: number): THREE.Group {
  const group = new THREE.Group();
  group.position.set(x, 0.95, z);
  const mat = new THREE.MeshStandardMaterial({ color: 0xf0d060, emissive: 0xc9a227, emissiveIntensity: 0.55, roughness: 0.3 });
  for (let i = 0; i < stars; i += 1) {
    const star = new THREE.Mesh(new THREE.OctahedronGeometry(0.07), mat);
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
