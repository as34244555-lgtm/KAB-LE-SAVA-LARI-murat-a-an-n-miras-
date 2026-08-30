import { describe, expect, it } from "vitest";
import { Game } from "../src/core/Game";
import { emptySave } from "../src/managers/SaveManager";
import { generateWorld } from "../src/data/hexMap";
import { LANDMARKS } from "../src/data/landmarks";
import { scaleById } from "../src/units/CombatResolver";
import { LevelManager } from "../src/managers/LevelManager";
import { neighbors } from "../src/world/hexMath";
import { UNITS } from "../src/data/tribes";

describe("Hikâye hex ve kadro", () => {
  it("dünya tapınak ve Elçi taşlarını taşır", () => {
    const tiles = generateWorld("gokhanli");
    expect(tiles.some((tile) => tile.landmark === "temple" && tile.label.includes("Gölge"))).toBe(true);
    expect(tiles.some((tile) => tile.landmark === "finale")).toBe(true);
    expect(tiles.filter((tile) => tile.landmark).length).toBe(LANDMARKS.length);
  });

  it("yan kabile hex'ini almak parşömen ve görevi açar", () => {
    const game = new Game(emptySave());
    game.chooseTribe("gokhanli");
    const mark = game.data.tiles.find((tile) => tile.sideId === "korsanlar");
    expect(mark).toBeTruthy();
    const n = neighbors(mark!.q, mark!.r)[0];
    game.ensureAround(n.q, n.r, 1);
    const neigh = game.data.tiles.find((tile) => tile.q === n.q && tile.r === n.r)!;
    neigh.owner = "gokhanli";
    game.data.army = 40;
    game.data.roster = { ruzgar: 40 };
    const msg = game.claimOrAttack(mark!.id);
    expect(msg.includes("komşu")).toBe(false);
    expect(mark!.owner).toBe("gokhanli");
    expect(mark!.stars).toBeGreaterThan(0);
    expect(game.data.discoveredSideTribes).toContain("korsanlar");
    expect(game.narrative.collected).toContain(10);
    expect(game.data.completedQuests).toContain("q-korsan-fener");
  });

  it("eğitim kadroyu ve ordu toplamını büyütür", () => {
    const game = new Game(emptySave());
    game.chooseTribe("sariklilar");
    const empty = game.data.tiles.find((tile) => tile.owner === "sariklilar" && !tile.slot)!;
    game.selectHex(empty.id);
    game.economy.grant("gold", 400);
    game.economy.grant("food", 200);
    game.buildOnSelected("camp");
    const before = game.data.army;
    game.train(2);
    expect(game.data.army).toBe(before + 2);
    expect(game.data.roster.barutcu).toBeGreaterThanOrEqual(before + 2);
    game.trainUnit("deve", 1);
    expect(game.data.roster.deve).toBe(1);
    expect(game.data.army).toBe(before + 3);
  });

  it("yapay zekâ komşu boş toprağı genişletir", () => {
    const game = new Game(emptySave());
    game.chooseTribe("gokhanli");
    const before = game.data.tiles.filter((tile) => tile.owner === "sariklilar").length;
    game.tickAi(() => 0.01);
    const after = game.data.tiles.filter((tile) => tile.owner === "sariklilar").length;
    expect(after).toBeGreaterThanOrEqual(before);
  });

  it("kabilede ikinci birim ölçeklenir", () => {
    const levels = new LevelManager(4, 0);
    const deve = UNITS.find((unit) => unit.id === "deve")!;
    const scaled = scaleById("deve", 3, 4, levels);
    expect(scaled.name).toBe(deve.name);
    expect(scaled.count).toBe(3);
    expect(scaled.hp).toBeGreaterThan(deve.baseHp);
  });
});
