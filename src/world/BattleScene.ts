import * as THREE from "three";
import type { BattleParticipant, TribeId } from "../core/types";
import { stylizedPerson, toyMaterial } from "./materials";

const HATS: Record<TribeId, "turban" | "hood" | "helm" | "none"> = {
  sariklilar: "turban",
  gokhanli: "hood",
  demirhisar: "helm",
  player: "none",
};

const COLORS: Record<TribeId, [number, number]> = {
  sariklilar: [0xc0392b, 0xf4d03f],
  gokhanli: [0x2c1a4d, 0x7d3c98],
  demirhisar: [0x7b241c, 0xd4ac0d],
  player: [0x2471a3, 0xd4a574],
};

export class BattleScene {
  readonly root = new THREE.Group();
  private fighters = new THREE.Group();

  constructor() {
    this.root.name = "battle";
    const ground = new THREE.Mesh(new THREE.CircleGeometry(7, 36), toyMaterial(0x7a6a4a, { roughness: 0.72 }));
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    const ring = new THREE.Mesh(new THREE.TorusGeometry(6.2, 0.16, 8, 40), toyMaterial(0xd4af37, { metal: 0.5 }));
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.08;
    this.root.add(ground, ring, this.fighters);
  }

  stage(player: BattleParticipant[], enemy: BattleParticipant) {
    this.fighters.clear();
    player.forEach((unit, index) => {
      const n = Math.min(4, Math.max(1, unit.count));
      for (let i = 0; i < n; i += 1) {
        const mesh = stylizedPerson(...COLORS[unit.tribe], HATS[unit.tribe]);
        mesh.position.set(-2.4 - (i % 2) * 0.7, 0, -1.4 + index * 1.15 + i * 0.15);
        mesh.userData.side = "player";
        this.fighters.add(mesh);
      }
    });
    const foes = Math.min(5, Math.max(2, enemy.count));
    for (let i = 0; i < foes; i += 1) {
      const mesh = stylizedPerson(...COLORS[enemy.tribe], HATS[enemy.tribe]);
      mesh.position.set(2.3 + (i % 2) * 0.65, 0, -1.6 + i * 0.85);
      mesh.userData.side = "enemy";
      this.fighters.add(mesh);
    }
  }

  update(elapsed: number) {
    this.fighters.children.forEach((child, index) => {
      const dir = child.userData.side === "player" ? 1 : -1;
      child.position.x += Math.sin(elapsed * 6 + index) * 0.01 * dir;
      child.position.y = Math.abs(Math.sin(elapsed * 8 + index)) * 0.08;
    });
  }
}
