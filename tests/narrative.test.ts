import { describe, expect, it } from "vitest";
import { Game } from "../src/core/Game";
import { NarrativeManager } from "../src/managers/NarrativeManager";
import { SCROLLS } from "../src/data/scrolls";
import { SIDE_TRIBES } from "../src/data/sideTribes";

describe("Anlatı motoru", () => {
  it("100 parşömen ve her 10 seviyede bir yan kabile tanımlıdır", () => {
    expect(SCROLLS).toHaveLength(100);
    expect(SIDE_TRIBES.map((t) => t.unlockLevel)).toEqual([10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);
  });

  it("1-39 sahte iz, 40 tapınak, 100 Gölge Elçisi", () => {
    expect(SCROLLS[21].misdirection).not.toBe("none");
    expect(SCROLLS[39].title).toContain("Gölge Tapınağı");
    expect(SCROLLS[99].body).toContain("Gölge Elçisi");
  });

  it("seviye 40 paleti ve müziği karartır", () => {
    const story = new NarrativeManager();
    expect(story.palette(10).music).toBe("suspicion");
    expect(story.palette(40).music).toBe("shadow");
    expect(story.palette(100).music).toBe("reckoning");
    expect(story.palette(40).fogDensity).toBeGreaterThan(story.palette(5).fogDensity);
  });

  it("Game kırılma ve final bayraklarını yakar", () => {
    const game = new Game();
    game.debugSetLevel(40);
    expect(game.narrative.shadowTempleRevealed).toBe(true);
    expect(game.narrative.collected).toContain(40);
    game.debugSetLevel(100);
    expect(game.narrative.finaleRevealed).toBe(true);
    expect(game.narrative.knownScrolls().at(-1)?.title).toBe("Gölge Elçisi");
  });

  it("vâris kabile seçince hançer izini taşır ve erken banner Kanlı Taht'tır", () => {
    const game = new Game();
    game.chooseTribe("gokhanli");
    expect(game.toast).toContain("Vâris");
    expect(game.toast).toContain("hançer");
    expect(game.mapBanner()).toContain("KANLI TAHT");
    game.debugSetLevel(40);
    expect(game.mapBanner()).toContain("GÖLGE TAPINAĞI");
    game.debugSetLevel(100);
    expect(game.mapBanner()).toContain("GÖLGE ELÇİSİ");
  });
});
