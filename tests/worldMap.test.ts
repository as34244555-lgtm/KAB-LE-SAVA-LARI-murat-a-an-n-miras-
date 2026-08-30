import { describe, expect, it } from "vitest";
import { biomeAt, generateWorld } from "../src/data/hexMap";
import { forEachHex } from "../src/world/hexMath";
import { Game } from "../src/core/Game";
import { emptySave } from "../src/managers/SaveManager";

describe("Sonsuz karışık harita", () => {
  it("geniş bir diskte üç iklim birden görünür", () => {
    const seen = new Set<string>();
    forEachHex(0, 0, 8, (q, r) => seen.add(biomeAt(q, r)));
    expect(seen.has("desert")).toBe(true);
    expect(seen.has("forest")).toBe(true);
    expect(seen.has("ice")).toBe(true);
  });

  it("başlangıç dünyası üç kabile salonunu ve 40+ altıgeni taşır", () => {
    const tiles = generateWorld("gokhanli");
    expect(tiles.length).toBeGreaterThan(40);
    expect(tiles.some((tile) => tile.owner === "sariklilar" && tile.slot === "hall")).toBe(true);
    expect(tiles.some((tile) => tile.owner === "gokhanli" && tile.slot === "hall")).toBe(true);
    expect(tiles.some((tile) => tile.owner === "demirhisar" && tile.slot === "hall")).toBe(true);
    const biomes = new Set(tiles.map((tile) => tile.biome));
    expect(biomes.size).toBe(3);
  });

  it("keşif yeni altıgen üretir", () => {
    const game = new Game(emptySave());
    game.chooseTribe("sariklilar");
    const before = game.data.tiles.length;
    const grew = game.ensureAround(20, -8, 4);
    expect(grew).toBe(true);
    expect(game.data.tiles.length).toBeGreaterThan(before);
  });
});
