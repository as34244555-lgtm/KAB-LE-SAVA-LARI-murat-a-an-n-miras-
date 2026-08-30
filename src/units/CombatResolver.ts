import type { BattleField, BattleParticipant, BattleResult, BattleStance, Biome, TribeId } from "../core/types";
import { TRIBES, UNITS, enemyPowerAtLevel, rpsMultiplier } from "../data/tribes";
import type { LevelManager } from "../managers/LevelManager";

export function scaleById(
  id: string,
  count: number,
  level: number,
  playerLevels: LevelManager,
): BattleParticipant {
  const def = UNITS.find((unit) => unit.id === id) ?? UNITS[2];
  const capped = playerLevels.capFor(level);
  const mul = 1 + (capped - 1) * 0.12;
  const hp = Math.round(def.baseHp * mul * Math.max(1, count));
  return {
    tribe: def.tribe,
    name: def.name,
    count,
    startCount: count,
    level: capped,
    hp,
    maxHp: hp,
    attack: Math.round(def.baseAttack * mul),
    defense: Math.round(def.baseDefense * mul),
    critChance: def.critChance,
    aoe: def.aoe,
  };
}

export function scaleUnit(
  tribe: TribeId,
  count: number,
  level: number,
  playerLevels: LevelManager,
): BattleParticipant {
  const def = UNITS.find((unit) => unit.tribe === tribe) ?? UNITS[2];
  return scaleById(def.id, count, level, playerLevels);
}

export function enemyArmy(level: number, tribe: TribeId, playerLevels: LevelManager): BattleParticipant {
  const power = enemyPowerAtLevel(level);
  const count = Math.max(1, Math.round(2 + level / 8));
  const unit = scaleUnit(tribe, count, Math.max(1, Math.round(level * 0.85)), playerLevels);
  unit.hp = Math.round(unit.hp * power);
  unit.maxHp = unit.hp;
  unit.attack = Math.round(unit.attack * power);
  unit.defense = Math.round(unit.defense * power);
  unit.name = `${TRIBES[tribe].name} Akını`;
  return unit;
}

export function enemyFromGarrison(
  tribe: TribeId,
  garrison: number,
  level: number,
  playerLevels: LevelManager,
): BattleParticipant {
  const unit = enemyArmy(level, tribe, playerLevels);
  const n = Math.max(1, garrison);
  const ratio = n / Math.max(1, unit.count);
  unit.count = n;
  unit.startCount = n;
  unit.hp = Math.round(unit.hp * ratio);
  unit.maxHp = unit.hp;
  return unit;
}

export function biomeAffinity(tribe: TribeId, biome: Biome): number {
  if (tribe === "sariklilar") return biome === "desert" ? 1.22 : biome === "ice" ? 0.82 : 1;
  if (tribe === "gokhanli") return biome === "forest" ? 1.22 : biome === "desert" ? 0.88 : 1;
  if (tribe === "demirhisar") return biome === "ice" ? 1.22 : biome === "forest" ? 0.88 : 1;
  return 1;
}

export function stanceMods(stance: BattleStance, tribe: TribeId): { atk: number; def: number; crit: number } {
  if (stance === "assault") {
    return { atk: tribe === "sariklilar" ? 1.26 : 1.16, def: 0.88, crit: 0 };
  }
  if (stance === "ambush") {
    return { atk: 1.02, def: 0.9, crit: tribe === "gokhanli" ? 0.2 : 0.12 };
  }
  return { atk: 0.88, def: tribe === "demirhisar" ? 1.3 : 1.18, crit: 0 };
}

export function resolveBattle(
  player: BattleParticipant[],
  enemy: BattleParticipant,
  rng: () => number = Math.random,
  field?: BattleField,
): BattleResult {
  const log: string[] = [];
  const living = () => player.filter((unit) => unit.hp > 0 && unit.count > 0);
  const stance = field?.stance ?? "assault";
  const playerMod = stanceMods(stance, player[0]?.tribe ?? "player");
  const biomeAtk = field ? biomeAffinity(player[0]?.tribe ?? "player", field.biome) : 1;
  const biomeDef = field ? biomeAffinity(enemy.tribe, field.biome) : 1;
  const flank = 1 + Math.min(4, field?.flanking ?? 0) * 0.06;
  if (field) {
    enemy.defense = Math.round(enemy.defense * biomeDef * (field.tower ? 1.2 : 1) * (field.hall ? 1.08 : 1));
    enemy.hp = Math.round(enemy.hp * (field.hall ? 1.12 : 1));
    enemy.maxHp = Math.max(enemy.maxHp, enemy.hp);
    log.push(
      `${field.biome === "desert" ? "Çöl" : field.biome === "ice" ? "Buz" : "Orman"} savaşı · ${stanceLabel(stance)} · kanat ${field.flanking}`,
    );
  }

  let round = 0;
  while (round < 14 && living().length && enemy.hp > 0) {
    round += 1;
    for (const unit of living()) {
      const dealt = strike(unit, enemy, rng, playerMod.atk * biomeAtk * flank, playerMod.crit);
      log.push(`${unit.name} ${TRIBES[enemy.tribe]?.name ?? "vahşi"} saflarına ${dealt} hasar indirdi.`);
      if (enemy.hp <= 0) break;
    }
    if (enemy.hp <= 0) break;
    const target = living()[Math.floor(rng() * living().length)];
    if (!target) break;
    const dealt = strike(enemy, target, rng, 1, 0);
    log.push(`${enemy.name} ${target.name} birliğini ${dealt} hasarla sarstı.`);
  }

  const playerHp = living().reduce((sum, unit) => sum + unit.hp, 0);
  const winner: BattleResult["winner"] =
    enemy.hp <= 0 && playerHp > 0 ? "player" : playerHp <= 0 && enemy.hp > 0 ? "enemy" : "draw";

  const goldLoot = winner === "player" ? 40 + enemy.level * 8 : 8;
  const xpReward = winner === "player" ? 28 + enemy.level * 6 : 10;

  log.push(
    winner === "player"
      ? "Saha senin. Ama hançerin mührü hâlâ parlıyor."
      : winner === "enemy"
        ? "Saflar dağıldı. Murat Ağa'nın mirası bu gece yaralı."
        : "Toz durdu. Kimse tahtı kazanamadı.",
  );

  return {
    winner,
    log,
    goldLoot,
    xpReward,
    playerRemaining: living().reduce((sum, unit) => sum + unit.count, 0),
    enemyRemaining: enemy.hp > 0 ? enemy.count : 0,
  };
}

function stanceLabel(stance: BattleStance): string {
  if (stance === "assault") return "hücum";
  if (stance === "ambush") return "pusu";
  return "kalkan";
}

function strike(
  attacker: BattleParticipant,
  defender: BattleParticipant,
  rng: () => number,
  atkMul = 1,
  extraCrit = 0,
): number {
  const rps = rpsMultiplier(attacker.tribe, defender.tribe);
  const crit = rng() < attacker.critChance + extraCrit ? 1.6 : 1;
  const aoe = 1 + attacker.aoe;
  const raw = attacker.attack * rps * crit * aoe * atkMul * Math.max(1, attacker.count * 0.35);
  const mitigated = Math.max(4, raw - defender.defense * 0.55);
  const dealt = Math.round(mitigated);
  defender.hp = Math.max(0, defender.hp - dealt);
  const start = defender.startCount ?? defender.count;
  defender.count = defender.hp <= 0 ? 0 : Math.max(1, Math.round(start * (defender.hp / defender.maxHp)));
  return dealt;
}
