import { describe, expect, it } from "vitest";
import { LevelManager } from "../src/managers/LevelManager";
import { enemyPowerAtLevel, rpsMultiplier } from "../src/data/tribes";
import { biomeAffinity, enemyArmy, resolveBattle, scaleUnit } from "../src/units/CombatResolver";

const rng = () => 0.1;

describe("Savaş dengesi", () => {
  it("Sarıklılar Demir-Hisar'ı, Demir-Hisar Gök-Hanlı'yı, Gök-Hanlı Sarıklılar'ı keser", () => {
    expect(rpsMultiplier("sariklilar", "demirhisar")).toBeGreaterThan(1);
    expect(rpsMultiplier("demirhisar", "gokhanli")).toBeGreaterThan(1);
    expect(rpsMultiplier("gokhanli", "sariklilar")).toBeGreaterThan(1);
    expect(rpsMultiplier("sariklilar", "gokhanli")).toBeLessThan(1);
  });

  it("rakip gücü seviyeyle artar", () => {
    expect(enemyPowerAtLevel(80)).toBeGreaterThan(enemyPowerAtLevel(10));
  });

  it("üstün eşleşme savaşı oyuncuya yatırır", () => {
    const levels = new LevelManager(8, 0);
    const player = [scaleUnit("sariklilar", 6, 8, levels)];
    const enemy = enemyArmy(3, "demirhisar", levels);
    const result = resolveBattle(player, enemy, rng);
    expect(result.winner).toBe("player");
    expect(result.xpReward).toBeGreaterThan(0);
  });

  it("iklim kabileye avantaj verir", () => {
    expect(biomeAffinity("sariklilar", "desert")).toBeGreaterThan(biomeAffinity("sariklilar", "ice"));
    expect(biomeAffinity("gokhanli", "forest")).toBeGreaterThan(biomeAffinity("gokhanli", "desert"));
    expect(biomeAffinity("demirhisar", "ice")).toBeGreaterThan(biomeAffinity("demirhisar", "forest"));
  });
});
