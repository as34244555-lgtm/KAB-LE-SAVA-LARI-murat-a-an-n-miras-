import type { TribeId } from "../core/types";
import { UNITS } from "../data/tribes";

export function unitCost(tribe: TribeId, level: number): number {
  const def = UNITS.find((unit) => unit.tribe === tribe);
  if (!def) return 999;
  return Math.round(def.baseCost * (1 + (level - 1) * 0.18));
}

export function unitUpgradeDiamond(level: number): number {
  return 1 + Math.floor(level / 3);
}
