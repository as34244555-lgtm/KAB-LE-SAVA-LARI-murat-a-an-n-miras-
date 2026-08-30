import * as THREE from "three";
import type { BuildingId, PlayerSave } from "../core/types";
import {
  blacksmith,
  cottage,
  crystalTemple,
  deck,
  domeHouse,
  inn,
  scrollMinaret,
  stall,
  torch,
  heroPlate,
} from "./kit";
import { maps } from "./textures";
import { stylizedPerson, toyMaterial } from "./materials";

const SLOTS: Record<BuildingId, THREE.Vector3> = {
  goldMine: new THREE.Vector3(-2.6, 0, -1.6),
  barracks: new THREE.Vector3(-0.1, 0, -2.8),
  forge: new THREE.Vector3(2.7, 0, -1.4),
  caravanserai: new THREE.Vector3(-3.2, 0, 1.5),
  scrollTower: new THREE.Vector3(3.1, 0, 1.7),
  shadowTemple: new THREE.Vector3(0.1, 0, 3.4),
};

export class VillageScene {
  readonly root = new THREE.Group();
  private buildings = new THREE.Group();
  private folks = new THREE.Group();
  private fx: THREE.Object3D[] = [];

  constructor() {
    this.root.name = "village";
    this.paintGround();
    this.buildFort();
    this.dressCourtyard();
    this.root.add(this.buildings, this.folks);
    this.scatterPeople();
    const citadel = heroPlate("/art/citadel.png", 30, 16);
    citadel.position.set(-2.2, 4.4, -11);
    citadel.lookAt(5.4, 3.2, 8.2);
    this.root.add(citadel);
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
      built.scale.setScalar(1.28);
      this.collectFx(built);
      this.buildings.add(built);
    });
  }

  update(elapsed: number) {
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

  private makeBuilding(id: BuildingId, level: number): THREE.Group {
    if (id === "barracks") return cottage(level);
    if (id === "forge") return blacksmith(level);
    if (id === "goldMine") return domeHouse(level, 0xe8c96a);
    if (id === "caravanserai") return inn(level);
    if (id === "scrollTower") return scrollMinaret(level);
    return crystalTemple(level);
  }

  private paintGround() {
    const soil = new THREE.Mesh(new THREE.CylinderGeometry(7.4, 7.4, 0.36, 48), toyMaterial(0xc4b396, { roughness: 0.88 }));
    (soil.material as THREE.MeshStandardMaterial).map = maps.sand;
    soil.position.y = -0.18;
    soil.receiveShadow = true;
    const path = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.06, 12), toyMaterial(0xb08960, { roughness: 0.75 }));
    path.position.y = 0.02;
    path.receiveShadow = true;
    this.root.add(soil, path);
  }

  private buildFort() {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(7.2, 0.38, 10, 48),
      toyMaterial(0x8d8a82, { roughness: 0.8 }),
    );
    (ring.material as THREE.MeshStandardMaterial).map = maps.stone;
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.28;
    ring.receiveShadow = true;
    this.root.add(ring);
  }

  private dressCourtyard() {
    const extras = [
      domeHouse(1, 0xf5e6c8),
      stall(),
      stall(),
      cottage(1),
    ];
    extras[0].position.set(-4.6, 0, -3.8);
    extras[0].scale.setScalar(0.72);
    extras[1].position.set(1.6, 0, 0.2);
    extras[2].position.set(-1.5, 0, 0.35);
    extras[3].position.set(4.8, 0, -3.6);
    extras[3].scale.setScalar(0.68);
    const well = deck(0.7);
    well.position.set(0.2, 0, 0.1);
    const bucket = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.14, 0.28, 10), toyMaterial(0x6b4226));
    bucket.position.set(0.2, 0.35, 0.1);
    const t = torch();
    t.position.set(0.85, 0, 0.15);
    this.root.add(...extras, well, bucket, t);
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
      const person = stylizedPerson(primary, accent, hat);
      person.position.set(x, 0, z);
      person.scale.setScalar(0.72);
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
