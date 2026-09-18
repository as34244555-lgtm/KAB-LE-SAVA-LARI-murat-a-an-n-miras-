import { describe, expect, it } from "vitest";
import { decryptPayload, emptySave, encryptPayload } from "../src/managers/SaveManager";

describe("Kayıt güvenliği", () => {
  it("boş kayıt vâris ve ilk parşömenle başlar", () => {
    const save = emptySave("Deniz");
    expect(save.playerName).toBe("Deniz");
    expect(save.collectedScrolls).toEqual([1]);
    expect(save.playerLevel).toBe(1);
  });

  it("yükü şifreleyip geri açar", async () => {
    const sealed = await encryptPayload(JSON.stringify({ hançer: "mor" }));
    expect(sealed.startsWith("gcm.") || sealed.startsWith("xor.")).toBe(true);
    const plain = await decryptPayload(sealed);
    expect(JSON.parse(plain)).toEqual({ hançer: "mor" });
  });
});
