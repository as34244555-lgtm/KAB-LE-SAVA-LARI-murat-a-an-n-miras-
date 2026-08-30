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
import { mapped, maps } from "./textures";
import { stylizedPerson, toyMaterial } from "./materials";

const SLOTS: Record<BuildingId, THREE.Vector3> = {
  goldMine: new THREE.Vector3(-3.4, 0, -2.2),
  barracks: new THREE.Vector3(-0.2, 0, -3.6),
  forge: new THREE.Vector3(3.5, 0, -2.0),
  caravanserai: new THREE.Vector3(-4.0, 0, 1.8),
  scrollTower: new THREE.Vector3(3.8, 0, 2.0),
  shadowTemple: new THREE.Vector3(0.2, 0, 4.2),
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
    const citadel = heroPlate("/art/citadel.png", 36, 18);
    citadel.position.set(-1.5, 5.2, -14);
    citadel.lookAt(7, 3.4, 10);
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
      built.scale.setScalar(1.05);
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
    const soil = new THREE.Mesh(
      new THREE.CircleGeometry(14, 48),
      mapped(0x6b5a42, maps.sand, { roughness: 0.95, normal: maps.sandN }),
    );
    soil.rotation.x = -Math.PI / 2;
    soil.receiveShadow = true;
    const path = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.04, 16), mapped(0x5a4a36, maps.sand, { roughness: 0.9, normal: maps.sandN }));
    path.position.y = 0.02;
    path.receiveShadow = true;
    this.root.add(soil, path);
  }

  private buildFort() {
    const curb = new THREE.Mesh(
      new THREE.BoxGeometry(18, 0.45, 0.55),
      mapped(0x5d5a54, maps.stone, { roughness: 0.88, normal: maps.stoneN }),
    );
    curb.position.set(0, 0.2, 8.4);
    curb.castShadow = true;
    curb.receiveShadow = true;
    this.root.add(curb);
  }

  private dressCourtyard() {
    const extras = [
      domeHouse(1, 0xf5e6c8),
      stall(),
      stall(),
      cottage(1),
    ];
    extras[0].position.set(-6.2, 0, -4.6);
    extras[0].scale.setScalar(0.85);
    extras[1].position.set(1.8, 0, 0.4);
    extras[2].position.set(-1.8, 0, 0.5);
    extras[3].position.set(6.4, 0, -4.4);
    extras[3].scale.setScalar(0.82);
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
      person.scale.setScalar(1);
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
