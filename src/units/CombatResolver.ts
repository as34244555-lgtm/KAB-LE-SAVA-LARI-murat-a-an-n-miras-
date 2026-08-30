import type { BattleParticipant, BattleResult, TribeId } from "../core/types";
import { TRIBES, UNITS, enemyPowerAtLevel, rpsMultiplier } from "../data/tribes";
import type { LevelManager } from "../managers/LevelManager";

export function scaleUnit(
  tribe: TribeId,
  count: number,
  level: number,
  playerLevels: LevelManager,
): BattleParticipant {
  const def = UNITS.find((unit) => unit.tribe === tribe) ?? UNITS[2];
  const capped = playerLevels.capFor(level);
  const mul = 1 + (capped - 1) * 0.12;
  const hp = Math.round(def.baseHp * mul * Math.max(1, count));
  return {
    tribe,
    name: def.name,
    count,
    level: capped,
    hp,
    maxHp: hp,
    attack: Math.round(def.baseAttack * mul),
    defense: Math.round(def.baseDefense * mul),
    critChance: def.critChance,
    aoe: def.aoe,
  };
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

export function resolveBattle(
  player: BattleParticipant[],
  enemy: BattleParticipant,
  rng: () => number = Math.random,
): BattleResult {
  const log: string[] = [];
  let round = 0;
  const living = () => player.filter((unit) => unit.hp > 0 && unit.count > 0);

  while (round < 14 && living().length && enemy.hp > 0) {
    round += 1;
    for (const unit of living()) {
      const dealt = strike(unit, enemy, rng);
      log.push(`${unit.name} ${TRIBES[enemy.tribe].name} saflarına ${dealt} hasar indirdi.`);
      if (enemy.hp <= 0) break;
    }
    if (enemy.hp <= 0) break;
    const target = living()[Math.floor(rng() * living().length)];
    if (!target) break;
    const dealt = strike(enemy, target, rng);
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

function strike(attacker: BattleParticipant, defender: BattleParticipant, rng: () => number): number {
  const rps = rpsMultiplier(attacker.tribe, defender.tribe);
  const crit = rng() < attacker.critChance ? 1.6 : 1;
  const aoe = 1 + attacker.aoe;
  const raw = attacker.attack * rps * crit * aoe * Math.max(1, attacker.count * 0.35);
  const mitigated = Math.max(4, raw - defender.defense * 0.55);
  const dealt = Math.round(mitigated);
  defender.hp = Math.max(0, defender.hp - dealt);
  if (defender.hp === 0) defender.count = 0;
  return dealt;
}
