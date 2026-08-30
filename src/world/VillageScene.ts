import * as THREE from "three";
import type { BuildingId, PlayerSave } from "../core/types";
import {
  caravanInn,
  darkTemple,
  goldStore,
  oakBarrel,
  scrollMinaret3d,
  stoneCitadel,
  stoneForge,
  stoneWell,
  timberCottage,
  watchTower,
} from "./architecture";
import { crate, stall, torch } from "./kit";
import { pbr } from "./textures";
import { spawnProp, type PropId } from "./props";
import { spawnUnit, tickUnit } from "./soldiers";

const SLOTS: Record<BuildingId, THREE.Vector3> = {
  goldMine: new THREE.Vector3(-3.6, 0, -2.1),
  barracks: new THREE.Vector3(-0.15, 0, -3.7),
  forge: new THREE.Vector3(3.6, 0, -2.0),
  caravanserai: new THREE.Vector3(-4.2, 0, 1.9),
  scrollTower: new THREE.Vector3(3.9, 0, 2.1),
  shadowTemple: new THREE.Vector3(0.25, 0, 4.4),
};

export class VillageScene {
  readonly root = new THREE.Group();
  private buildings = new THREE.Group();
  private folks = new THREE.Group();
  private props = new THREE.Group();
  private fx: THREE.Object3D[] = [];
  private lastElapsed = 0;

  constructor() {
    this.root.name = "village";
    this.paintGround();
    this.buildHorizon();
    this.dressCourtyard();
    this.root.add(this.buildings, this.folks, this.props);
    this.scatterPeople();
  }

  sync(save: PlayerSave) {
    this.buildings.clear();
    this.fx = [];
    (Object.keys(SLOTS) as BuildingId[]).forEach((id) => {
      const level = save.buildingLevels[id] ?? 0;
      if (id === "shadowTemple" && !save.shadowTempleRevealed && level <= 0) return;
      const shown = Math.max(level, id === "shadowTemple" ? 1 : level);
      if (shown <= 0 && id !== "shadowTemple") return;
      const built = this.makeBuilding(id, Math.max(1, shown));
      built.position.copy(SLOTS[id]);
      this.collectFx(built);
      this.buildings.add(built);
    });
  }

  update(elapsed: number) {
    const dt = Math.max(0, elapsed - this.lastElapsed);
    this.lastElapsed = elapsed;
    this.folks.children.forEach((child) => tickUnit(child, dt));
    for (const obj of this.fx) {
      if (obj.userData.smoke) {
        obj.position.y += 0.006;
        obj.scale.setScalar(1 + Math.sin(elapsed * 2 + obj.position.x) * 0.15);
        const mat = (obj as THREE.Mesh).material as THREE.MeshStandardMaterial;
        mat.opacity = 0.25 + Math.abs(Math.sin(elapsed + obj.position.x)) * 0.25;
        if (obj.position.y > 3.4) obj.position.y = 2.05;
      }
      if (obj.userData.crystal) {
        obj.rotation.y = elapsed * 0.7;
        obj.position.y += Math.sin(elapsed * 2 + obj.position.x) * 0.0015;
      }
      if (obj.userData.flame) {
        const flame = obj.userData.flame as THREE.Mesh;
        flame.scale.setScalar(0.9 + Math.sin(elapsed * 9 + obj.position.x) * 0.12);
      }
    }
    this.folks.children.forEach((child, index) => {
      child.rotation.y = Math.sin(elapsed * 0.35 + index) * 0.35;
    });
  }

  refreshUnits() {
    this.folks.clear();
    this.scatterPeople();
  }

  dressProps() {
    this.props.clear();
    const place = (id: PropId, h: number, x: number, z: number, rot = 0) => {
      const mesh = spawnProp(id, h, x, z, rot);
      if (mesh) this.props.add(mesh);
    };
    place("cannon", 0.85, 2.5, 3.1, -0.7);
    place("lantern", 0.55, 0.85, 0.35, 0.2);
    place("lantern", 0.55, -0.95, 0.55, -0.4);
    place("table", 0.78, 1.7, 0.55, 0.35);
    place("crate", 0.38, -2.5, 0.35, 0.5);
    place("crate", 0.32, -2.15, 0.55, -0.3);
    place("boulder", 0.9, -6.4, -4.2, 0.4);
    place("boulder", 1.25, 7.2, -5.1, 1.1);
    place("boulder", 0.7, 5.6, 3.8, 0.2);
    place("stove", 0.95, 4.6, -1.15, 0.6);
    place("cannon", 0.7, -5.8, 3.4, 2.3);
  }

  private makeBuilding(id: BuildingId, level: number): THREE.Group {
    if (id === "barracks") return timberCottage(level);
    if (id === "forge") return stoneForge(level);
    if (id === "goldMine") return goldStore(level);
    if (id === "caravanserai") return caravanInn(level);
    if (id === "scrollTower") return scrollMinaret3d(level);
    return darkTemple(level);
  }

  private paintGround() {
    const soil = new THREE.Mesh(new THREE.CircleGeometry(22, 72), pbr("sand", 0xffffff, { repeat: 8 }));
    soil.rotation.x = -Math.PI / 2;
    soil.receiveShadow = true;
    const plaza = new THREE.Mesh(new THREE.CircleGeometry(4.6, 48), pbr("cobble", 0xffffff, { repeat: 3.5 }));
    plaza.rotation.x = -Math.PI / 2;
    plaza.position.y = 0.015;
    plaza.receiveShadow = true;
    const path = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.04, 18), pbr("cobble", 0xffffff, { repeat: 4 }));
    path.position.y = 0.02;
    path.receiveShadow = true;
    this.root.add(soil, plaza, path);
  }

  private buildHorizon() {
    const citadel = stoneCitadel();
    citadel.position.set(-3.4, 0.2, -16.2);
    citadel.rotation.y = 0.52;
    citadel.scale.setScalar(1.05);
    this.root.add(citadel);
    const watch = watchTower();
    watch.position.set(6.2, 0, -6.8);
    this.root.add(watch);
    const curb = new THREE.Mesh(new THREE.BoxGeometry(20, 0.55, 0.7), pbr("stone", 0xffffff, { repeat: 3 }));
    curb.position.set(0, 0.22, 8.6);
    curb.castShadow = true;
    curb.receiveShadow = true;
    this.root.add(curb);
  }

  private dressCourtyard() {
    const extras = [stall(), stall()];
    extras[0].position.set(1.85, 0, 0.45);
    extras[1].position.set(-1.9, 0, 0.55);
    const well = stoneWell();
    well.position.set(0.15, 0, 0.05);
    const t = torch();
    t.position.set(1.05, 0, 0.2);
    const b1 = oakBarrel(1);
    b1.position.set(-1.15, 0, 1.35);
    const b2 = oakBarrel(0.85);
    b2.position.set(1.25, 0, 1.45);
    const c1 = crate(1.3);
    c1.position.set(2.15, 0, 1.2);
    this.root.add(...extras, well, t, b1, b2, c1);
    this.collectFx(t);
  }

  private scatterPeople() {
    const casts: Array<["turban" | "hood" | "helm" | "none", number, number, number, number]> = [
      ["turban", 0xc0392b, 0xf4d03f, -1.8, 0.6],
      ["hood", 0x2c1a4d, 0x7d3c98, -0.4, 0.85],
      ["helm", 0x7b241c, 0xd4ac0d, 1.1, 0.55],
      ["none", 0x2471a3, 0xd4a574, 2.2, 0.9],
    ];
    casts.forEach(([hat, primary, accent, x, z]) => {
      const person = spawnUnit(primary, accent, hat);
      person.position.set(x, 0, z);
      this.folks.add(person);
    });
  }

  private collectFx(root: THREE.Object3D) {
    root.traverse((child) => {
      if (child.userData.smoke || child.userData.crystal || child.userData.flame) {
        this.fx.push(child);
      }
    });
  }
}
