import { describe, expect, it } from "vitest";
import { generateUnrealTables } from "../src/unrealExporter";

describe("Unreal Engine 5 veri tabloları", () => {
  it("10 adet DataTable (100 parşömen, 9 merkez, 3 kabile, birimler, binalar) üretir", () => {
    const tables = generateUnrealTables();
    expect(tables).toHaveLength(10);

    const byName = Object.fromEntries(tables.map((t) => [t.name, t]));
    expect(byName.DT_Scrolls.rowCount).toBe(100);
    expect(byName.DT_Scrolls.csv).toContain("Gölge Tapınağı");
    expect(byName.DT_Scrolls.csv).toContain("Gölge Elçisi");

    expect(byName.DT_Halls.rowCount).toBe(9);
    expect(byName.DT_Tribes.csv).toContain("sariklilar");
    expect(byName.DT_Tribes.csv).toContain("gokhanli");
    expect(byName.DT_Tribes.csv).toContain("demirhisar");
    expect(byName.DT_Units.rowCount).toBe(6);
    expect(byName.DT_Buildings.rowCount).toBe(6);
  });
});
