import * as THREE from "three";
import type { BuildingId, PlayerSave } from "../core/types";
import { stylizedPerson, toyMaterial } from "./materials";

const SLOTS: Record<BuildingId, THREE.Vector3> = {
  goldMine: new THREE.Vector3(-3.2, 0, -1.2),
  barracks: new THREE.Vector3(0.2, 0, -2.4),
  forge: new THREE.Vector3(3.4, 0, -1.0),
  caravanserai: new THREE.Vector3(-3.6, 0, 2.4),
  scrollTower: new THREE.Vector3(3.6, 0, 2.6),
  shadowTemple: new THREE.Vector3(0, 0, 4.6),
};

export class VillageScene {
  readonly root = new THREE.Group();
  private buildings = new THREE.Group();
  private folks = new THREE.Group();
  private crystals: THREE.Mesh[] = [];

  constructor() {
    this.root.name = "village";
    this.paintGround();
    this.root.add(this.buildings, this.folks);
    this.scatterPeople();
  }

  sync(save: PlayerSave) {
    this.buildings.clear();
    this.crystals = [];
    (Object.keys(SLOTS) as BuildingId[]).forEach((id) => {
      const level = save.buildingLevels[id] ?? 0;
      if (id === "shadowTemple" && !save.shadowTempleRevealed && level <= 0) return;
      this.buildings.add(this.makeBuilding(id, Math.max(level, id === "shadowTemple" ? 1 : level), SLOTS[id]));
    });
  }

  update(elapsed: number) {
    for (const crystal of this.crystals) {
      crystal.rotation.y = elapsed * 0.7;
      crystal.position.y = 1.6 + Math.sin(elapsed * 2 + crystal.position.x) * 0.08;
    }
    this.folks.children.forEach((child, index) => {
      child.position.x += Math.sin(elapsed * 0.4 + index) * 0.003;
      child.rotation.y = Math.sin(elapsed * 0.3 + index) * 0.4;
    });
  }

  private paintGround() {
    const soil = new THREE.Mesh(new THREE.CylinderGeometry(9.5, 9.5, 0.4, 36), toyMaterial(0x6d8b4e, { roughness: 0.75 }));
    soil.position.y = -0.2;
    soil.receiveShadow = true;
    const path = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.08, 10), toyMaterial(0xc4a574, { roughness: 0.65 }));
    path.position.y = 0.02;
    const wall = new THREE.Mesh(new THREE.TorusGeometry(8.4, 0.35, 8, 40), toyMaterial(0x8d8374, { roughness: 0.7 }));
    wall.rotation.x = Math.PI / 2;
    wall.position.y = 0.35;
    const gate = new THREE.Mesh(new THREE.BoxGeometry(2.8, 2.4, 0.5), toyMaterial(0x5d4037));
    gate.position.set(0, 1.2, 8.2);
    const crest = new THREE.Mesh(new THREE.CircleGeometry(0.45, 16), toyMaterial(0xd4af37, { metal: 0.65 }));
    crest.position.set(0, 2.3, 8.5);
    this.root.add(soil, path, wall, gate, crest);
  }

  private makeBuilding(id: BuildingId, level: number, pos: THREE.Vector3): THREE.Group {
    const g = new THREE.Group();
    g.position.copy(pos);
    const height = 0.9 + level * 0.22;
    const palette: Record<BuildingId, number> = {
      goldMine: 0xd4a017,
      barracks: 0x8d2b1e,
      forge: 0x6e6e6e,
      caravanserai: 0xc47b2b,
      scrollTower: 0x2e86c1,
      shadowTemple: 0x4a148c,
    };
    const body = new THREE.Mesh(new THREE.BoxGeometry(1.5, height, 1.5), toyMaterial(palette[id], { metal: id === "forge" ? 0.45 : 0.12 }));
    body.position.y = height / 2;
    body.castShadow = true;
    body.receiveShadow = true;
    g.add(body);
    if (id === "scrollTower" || id === "goldMine") {
      const dome = new THREE.Mesh(new THREE.SphereGeometry(0.55, 16, 12), toyMaterial(0xf7ca18, { metal: 0.55 }));
      dome.position.y = height + 0.15;
      g.add(dome);
    }
    if (id === "shadowTemple") {
      const spire = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.45),
        toyMaterial(0xce93d8, { emissive: 0x7b1fa2, emit: 1.1 }),
      );
      spire.position.y = height + 0.5;
      this.crystals.push(spire);
      g.add(spire);
    }
    const plaque = new THREE.Mesh(new THREE.CircleGeometry(0.18, 12), toyMaterial(0xf5e6c8, { metal: 0.2 }));
    plaque.position.set(0, 0.7, 0.78);
    g.add(plaque);
    return g;
  }

  private scatterPeople() {
    const casts: Array<["turban" | "hood" | "helm" | "none", number, number]> = [
      ["turban", 0xc0392b, 0xf4d03f],
      ["hood", 0x2c1a4d, 0x7d3c98],
      ["helm", 0x7b241c, 0xd4ac0d],
      ["none", 0x2471a3, 0xd4a574],
    ];
    casts.forEach(([hat, primary, accent], i) => {
      const person = stylizedPerson(primary, accent, hat);
      person.position.set(-2.8 + i * 1.7, 0, 0.8);
      person.scale.setScalar(0.85);
      this.folks.add(person);
    });
  }
}
