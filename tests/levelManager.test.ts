import { describe, expect, it } from "vitest";
import { LevelManager, isNarrativeBeat, xpToNextLevel } from "../src/managers/LevelManager";

describe("LevelManager", () => {
  it("seviye 1-100 arasında kalır ve XP ile yükselir", () => {
    const levels = new LevelManager(1, 0);
    const ups = levels.addXp(10_000);
    expect(ups.length).toBeGreaterThan(0);
    expect(levels.currentLevel).toBeGreaterThan(1);
    expect(levels.currentLevel).toBeLessThanOrEqual(100);
  });

  it("gelişim limiti oyuncu seviyesini aşamaz", () => {
    const levels = new LevelManager(4, 0);
    expect(levels.canUpgradeTo(4)).toBe(true);
    expect(levels.canUpgradeTo(5)).toBe(false);
    expect(levels.capFor(99)).toBe(4);
  });

  it("40 ve 100 anlatı tetikleyicileridir", () => {
    expect(isNarrativeBeat(40)).toBe("shadow");
    expect(isNarrativeBeat(100)).toBe("finale");
    expect(isNarrativeBeat(10)).toBe("side");
    expect(isNarrativeBeat(11)).toBeNull();
  });

  it("100. seviyede XP birikmez", () => {
    const levels = new LevelManager(99, xpToNextLevel(99) - 1);
    levels.addXp(50_000);
    expect(levels.currentLevel).toBe(100);
    expect(levels.currentXp).toBe(0);
  });

  it("erken seviyeler biraz daha çabuk çıkar", () => {
    expect(xpToNextLevel(1)).toBeLessThan(50);
    expect(xpToNextLevel(5)).toBeLessThan(120);
    expect(xpToNextLevel(1)).toBeGreaterThan(30);
  });
});
