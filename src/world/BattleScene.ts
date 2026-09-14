import * as THREE from "three";
import type { BattleParticipant, BattleResult, TribeId } from "../core/types";
import { cornerTower, heraldicShield, stall, wallSegment } from "./kit";
import { toyMaterial } from "./materials";
import { spawnUnit } from "./soldiers";
import { pbr } from "./textures";
import { BATTLE_CHARGE_S, BATTLE_CLASH_S, doomedFlags } from "./combatAnim";

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

interface Fighter {
  mesh: THREE.Group;
  side: "player" | "enemy";
  home: THREE.Vector3;
  clash: THREE.Vector3;
  doomed: boolean;
  fallen: boolean;
  pair: number;
}

export class BattleScene {
  readonly root = new THREE.Group();
  finished = false;
  private fighters: Fighter[] = [];
  private sparks = new THREE.Group();
  private clock = 0;
  private announced = false;

  constructor() {
    this.root.name = "battle";
    const ground = new THREE.Mesh(new THREE.CircleGeometry(9, 40), pbr("sand", 0xffffff, { repeat: 5 }));
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
    this.root.add(ground, ring, wall, t1, t2, market, crest, this.sparks);
  }

  refreshFighters() {
    /* canlı savaşta figürler sahnede yeniden kurulmaz */
  }

  stage(player: BattleParticipant[], enemy: BattleParticipant, result?: BattleResult) {
    this.fighters.forEach((item) => this.root.remove(item.mesh));
    this.fighters = [];
    this.sparks.clear();
    this.clock = 0;
    this.finished = false;
    this.announced = false;

    const playerShown = player.reduce((sum, unit) => sum + Math.min(4, Math.max(1, unit.startCount ?? unit.count)), 0);
    const foeShown = Math.min(5, Math.max(2, enemy.count));
    const playerSent = player.reduce((sum, unit) => sum + Math.max(1, unit.startCount ?? unit.count), 0);
    const playerLeft = result?.playerRemaining ?? playerSent;
    const enemyLeft = result?.enemyRemaining ?? foeShown;
    const playerDoom = doomedFlags(playerShown, playerLeft, playerSent);
    const enemyDoom = doomedFlags(foeShown, enemyLeft, Math.max(1, enemy.startCount ?? enemy.count));

    let pIndex = 0;
    player.forEach((unit) => {
      const n = Math.min(4, Math.max(1, unit.startCount ?? unit.count));
      for (let i = 0; i < n; i += 1) {
        const z = -1.4 + pIndex * 0.85;
        this.addFighter("player", unit.tribe, new THREE.Vector3(-3.4 - (i % 2) * 0.35, 0, z), z, playerDoom[pIndex] ?? false, pIndex);
        pIndex += 1;
      }
    });
    for (let i = 0; i < foeShown; i += 1) {
      const z = -1.4 + i * 0.85;
      this.addFighter("enemy", enemy.tribe, new THREE.Vector3(3.4 + (i % 2) * 0.35, 0, z), z, enemyDoom[i] ?? false, i);
    }
  }

  consumeFinished(): boolean {
    if (!this.finished || this.announced) return false;
    this.announced = true;
    return true;
  }

  update(_elapsed: number, frameDt = 1 / 60) {
    const dt = Math.max(0.008, Math.min(0.05, frameDt || 1 / 60));
    if (!this.fighters.length) {
      if (this.clock > 0) this.finished = true;
      return;
    }
    this.clock += dt;
    const t = this.clock;

    for (const fighter of this.fighters) {
      if (fighter.fallen) continue;
      if (t < BATTLE_CHARGE_S) {
        const u = t / BATTLE_CHARGE_S;
        fighter.mesh.position.lerpVectors(fighter.home, fighter.clash, easeOut(u));
        fighter.mesh.rotation.y = fighter.side === "player" ? Math.PI / 2 : -Math.PI / 2;
        walkBob(fighter.mesh, t, 10);
      } else if (t < BATTLE_CLASH_S) {
        const clashT = t - BATTLE_CHARGE_S;
        const lunge = Math.sin(clashT * 9 + fighter.pair) * 0.22;
        const dir = fighter.side === "player" ? 1 : -1;
        fighter.mesh.position.x = fighter.clash.x + lunge * dir;
        fighter.mesh.position.z = fighter.clash.z + Math.sin(clashT * 7 + fighter.pair * 0.6) * 0.06;
        fighter.mesh.rotation.y = fighter.side === "player" ? Math.PI / 2 : -Math.PI / 2;
        fighter.mesh.rotation.z = Math.sin(clashT * 11 + fighter.pair) * 0.18 * dir;
        walkBob(fighter.mesh, t, 16);
        if (fighter.doomed && clashT > 1.4 + fighter.pair * 0.18) {
          this.fall(fighter);
        }
        if (Math.floor(clashT * 6 + fighter.pair) !== Math.floor((clashT - dt) * 6 + fighter.pair)) {
          this.spark(fighter.clash.x, 1.1, fighter.clash.z);
        }
      } else if (fighter.doomed && !fighter.fallen) {
        this.fall(fighter);
      } else {
        fighter.mesh.position.lerp(fighter.clash, 0.08);
        fighter.mesh.rotation.z *= 0.9;
        fighter.mesh.position.y = 0;
      }
    }

    this.sparks.children.forEach((spark) => {
      spark.position.y += dt * 1.4;
      spark.scale.multiplyScalar(1 - dt * 3);
      (spark as THREE.Mesh).rotation.z += dt * 8;
    });
    if (t >= BATTLE_CLASH_S + 0.35) this.finished = true;
  }

  private addFighter(side: "player" | "enemy", tribe: TribeId, home: THREE.Vector3, z: number, doomed: boolean, pair: number) {
    const mesh = spawnUnit(...COLORS[tribe], HATS[tribe]);
    mesh.position.copy(home);
    mesh.rotation.y = side === "player" ? Math.PI / 2 : -Math.PI / 2;
    mesh.add(weapon(side === "player" ? 0xd4b24a : 0x8a8a8a));
    const clash = new THREE.Vector3(side === "player" ? -0.45 : 0.45, 0, z);
    this.root.add(mesh);
    this.fighters.push({ mesh, side, home: home.clone(), clash, doomed, fallen: false, pair });
  }

  private fall(fighter: Fighter) {
    fighter.fallen = true;
    fighter.mesh.rotation.x = Math.PI / 2;
    fighter.mesh.rotation.z = fighter.side === "player" ? -0.4 : 0.4;
    fighter.mesh.position.y = 0.08;
  }

  private spark(x: number, y: number, z: number) {
    const flash = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.08),
      new THREE.MeshBasicMaterial({ color: 0xffe08a }),
    );
    flash.position.set(x + (Math.random() - 0.5) * 0.3, y, z + (Math.random() - 0.5) * 0.2);
    this.sparks.add(flash);
    if (this.sparks.children.length > 14) this.sparks.remove(this.sparks.children[0]);
  }
}

function walkBob(mesh: THREE.Group, t: number, speed: number) {
  mesh.position.y = Math.abs(Math.sin(t * speed)) * 0.06;
}

function easeOut(u: number) {
  return 1 - (1 - Math.min(1, Math.max(0, u))) ** 2;
}

function weapon(color: number): THREE.Group {
  const g = new THREE.Group();
  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.02, 0.85, 5), toyMaterial(0x5a3a18, { roughness: 0.7 }));
  shaft.position.set(0.22, 1.15, 0.12);
  shaft.rotation.z = -0.55;
  const tip = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.14, 5), toyMaterial(color, { metal: 0.6, roughness: 0.28 }));
  tip.position.set(0.42, 1.48, 0.12);
  tip.rotation.z = -0.55;
  g.add(shaft, tip);
  return g;
}
