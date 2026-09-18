import { describe, expect, it } from "vitest";
import { CARAVAN_DURATION_MS, CaravanSystem } from "../src/economy/CaravanSystem";
import { GameStateMachine } from "../src/core/GameStateMachine";
import { grantFor } from "../src/managers/AdsManager";

describe("Kervan ve durum makinesi", () => {
  it("varışta ya baskın ya kâr üretir", () => {
    const road = new CaravanSystem();
    road.depart("Tuz Yolu", 50);
    const raid = road.tick(CARAVAN_DURATION_MS + 1, () => 0);
    expect(raid?.arrived).toBe(true);
    expect(raid?.raid).toBe(true);
    expect(raid?.goldReturn).toBeLessThan(50);

    const peace = new CaravanSystem();
    peace.depart("Tuz Yolu", 50);
    const safe = peace.tick(CARAVAN_DURATION_MS + 1, () => 0.99);
    expect(safe?.raid).toBe(false);
    expect(safe?.goldReturn).toBeGreaterThan(50);
  });

  it("menüden inşaata, inşaattan savaşa geçer", () => {
    const fsm = new GameStateMachine();
    fsm.enter("intro");
    fsm.enter("menu");
    fsm.enter("build");
    fsm.enter("battle");
    expect(fsm.current).toBe("battle");
    expect(() => fsm.enter("boot")).toThrow();
  });

  it("ödüllü reklam şablonu elmas ve üretim verir", () => {
    expect(grantFor("diamond").diamond).toBe(2);
    expect(grantFor("fast_production").ticks).toBe(45);
  });
});
