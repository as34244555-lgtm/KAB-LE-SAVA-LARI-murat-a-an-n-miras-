import { describe, expect, it } from "vitest";
import { pixelCap, targetFrameMs } from "../src/world/perf";

describe("Cihaz ısınmasın", () => {
  it("piksel oranı ekranı birkaç kat şişirmez", () => {
    Object.defineProperty(window, "devicePixelRatio", { value: 3, configurable: true });
    expect(pixelCap()).toBeLessThanOrEqual(1.1);
  });

  it("kare hedefi 30'un üstüne çıkmaz", () => {
    expect(targetFrameMs()).toBeGreaterThanOrEqual(1000 / 30);
  });
});
