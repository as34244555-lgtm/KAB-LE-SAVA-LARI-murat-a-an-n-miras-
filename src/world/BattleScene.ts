import * as THREE from "three";
import type { BattleParticipant, TribeId } from "../core/types";
import { cornerTower, heraldicShield, stall, wallSegment } from "./kit";
import { toyMaterial } from "./materials";
import { spawnUnit, tickUnit } from "./soldiers";
import { mapped, maps } from "./textures";

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
    const ground = new THREE.Mesh(
      new THREE.CircleGeometry(9, 40),
      mapped(0x6b5a42, maps.sand, { roughness: 0.95, normal: maps.sandN }),
    );
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    const ring = new THREE.Mesh(new THREE.TorusGeometry(6.4, 0.14, 8, 40), toyMaterial(0xd4af37, { metal: 0.55 }));
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.07;
    const wall = wallSegment(8);
    wall.position.set(0, 0, -6.4);
    const t1 = cornerTower();
    t1.position.set(-5.5, 0, -5.8);
    t1.scale.setScalar(0.7);
    const t2 = cornerTower();
    t2.position.set(5.5, 0, -5.8);
    t2.scale.setScalar(0.7);
    const market = stall();
    market.position.set(-4.2, 0, 3.4);
    const crest = heraldicShield();
    crest.position.set(0, 2.3, -6.1);
    this.root.add(ground, ring, wall, t1, t2, market, crest, this.fighters);
  }

  stage(player: BattleParticipant[], enemy: BattleParticipant) {
    this.fighters.clear();
    player.forEach((unit, index) => {
      const n = Math.min(4, Math.max(1, unit.count));
      for (let i = 0; i < n; i += 1) {
        const mesh = spawnUnit(...COLORS[unit.tribe], HATS[unit.tribe]);
        mesh.position.set(-2.6 - (i % 2) * 0.75, 0, -1.2 + index * 1.15 + i * 0.12);
        mesh.userData.side = "player";
        this.fighters.add(mesh);
      }
    });
    const foes = Math.min(5, Math.max(2, enemy.count));
    for (let i = 0; i < foes; i += 1) {
      const mesh = spawnUnit(...COLORS[enemy.tribe], HATS[enemy.tribe]);
      mesh.position.set(2.5 + (i % 2) * 0.7, 0, -1.5 + i * 0.85);
      mesh.userData.side = "enemy";
      this.fighters.add(mesh);
    }
  }

  private lastElapsed = 0;

  update(elapsed: number) {
    const dt = Math.max(0, elapsed - this.lastElapsed);
    this.lastElapsed = elapsed;
    this.fighters.children.forEach((child, index) => {
      tickUnit(child, dt);
      const dir = child.userData.side === "player" ? 1 : -1;
      child.position.x += Math.sin(elapsed * 6 + index) * 0.004 * dir;
    });
  }
}
