import { describe, expect, it } from "vitest";
import { Game } from "../src/core/Game";
import { emptySave } from "../src/managers/SaveManager";
import { neighbors } from "../src/world/hexMath";

describe("Hex RTS döngüsü", () => {
  it("kabile seçimi haritayı ve birlik kitini kilitler", () => {
    const game = new Game(emptySave("Deniz"));
    game.chooseTribe("sariklilar");
    expect(game.data.chosenTribe).toBe("sariklilar");
    expect(game.kit.unitName).toContain("Barutçu");
    expect(game.data.tiles.some((tile) => tile.owner === "sariklilar" && tile.slot === "hall")).toBe(true);
    expect(game.data.tiles.some((tile) => tile.owner === "gokhanli")).toBe(true);
    expect(game.data.tiles.some((tile) => tile.owner === "demirhisar")).toBe(true);
  });

  it("kendi boş altıgenine kabileye özel bina kurar", () => {
    const game = new Game(emptySave());
    game.chooseTribe("gokhanli");
    const empty = game.data.tiles.find((tile) => tile.owner === "gokhanli" && !tile.slot);
    expect(empty).toBeTruthy();
    game.selectHex(empty!.id);
    const msg = game.buildOnSelected("camp");
    expect(msg).toContain("Kamp");
    expect(empty!.slot).toBe("camp");
    expect(empty!.level).toBe(1);
  });

  it("yalnızca komşu düşman veya boş toprağa yürür", () => {
    const game = new Game(emptySave());
    game.chooseTribe("demirhisar");
    game.data.army = 20;
    const mine = game.data.tiles.filter((tile) => tile.owner === "demirhisar");
    const hall = mine.find((tile) => tile.slot === "hall")!;
    const far = game.data.tiles.find((tile) => {
      if (tile.owner === "demirhisar") return false;
      return !neighbors(hall.q, hall.r).some((n) => n.q === tile.q && n.r === tile.r);
    })!;
    game.selectHex(far.id);
    expect(game.claimOrAttack(far.id)).toContain("komşu");

    const near = game.data.tiles.find((tile) => {
      if (tile.owner === "demirhisar") return false;
      return mine.some((owned) => neighbors(owned.q, owned.r).some((n) => n.q === tile.q && n.r === tile.r));
    })!;
    const result = game.claimOrAttack(near.id);
    expect(result.includes("komşu")).toBe(false);
    expect(near.owner === "demirhisar" || result.includes("Pusuya") || result.includes("berabere")).toBe(true);
  });
});
