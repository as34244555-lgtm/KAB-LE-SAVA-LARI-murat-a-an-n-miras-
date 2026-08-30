import { describe, expect, it } from "vitest";
import { doomedFlags } from "../src/world/combatAnim";
import { CARPET_RADIUS, DETAIL_RADIUS, EXPLORE_RADIUS } from "../src/data/hexMap";

describe("Canlı savaş ve halı harita", () => {
  it("kalan birliğe göre figür düşürür", () => {
    expect(doomedFlags(4, 4, 4).filter(Boolean)).toHaveLength(0);
    expect(doomedFlags(4, 0, 4).every(Boolean)).toBe(true);
    expect(doomedFlags(4, 2, 4).filter(Boolean).length).toBe(2);
  });

  it("görünür yarıçap mavi boşluk bırakmayacak kadar geniştir", () => {
    expect(CARPET_RADIUS).toBeGreaterThanOrEqual(16);
    expect(EXPLORE_RADIUS).toBeGreaterThanOrEqual(12);
    expect(DETAIL_RADIUS).toBeGreaterThanOrEqual(8);
  });
});
