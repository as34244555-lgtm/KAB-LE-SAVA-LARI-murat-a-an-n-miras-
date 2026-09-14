import { describe, expect, it } from "vitest";
import { Game } from "../src/core/Game";
import { EconomyManager } from "../src/managers/EconomyManager";
import { LevelManager } from "../src/managers/LevelManager";
import { emptySave } from "../src/managers/SaveManager";

describe("Ekonomi ve gelişim limiti", () => {
  it("üretim bina seviyesine göre altın basar", () => {
    const eco = new EconomyManager(0, 0);
    const earned = eco.produce({ goldMine: 3, barracks: 1, forge: 0, caravanserai: 0, scrollTower: 0, shadowTemple: 0 }, 2);
    expect(earned).toBe(12);
    expect(eco.gold).toBe(12);
  });

  it("oyuncu seviyesinin üstüne bina çıkarmaz", () => {
    const eco = new EconomyManager(9999, 99);
    const levels = new LevelManager(2, 0);
    expect(eco.buildCost("goldMine", 2, levels)).toBeNull();
    expect(eco.buildCost("goldMine", 1, levels)).not.toBeNull();
  });

  it("Gölge Tapınağı 40'tan önce kurulamaz", () => {
    const game = new Game(emptySave());
    const msg = game.buildOrUpgrade("shadowTemple");
    expect(msg).toContain("sis");
    expect(game.data.buildingLevels.shadowTemple).toBe(0);
  });
});
