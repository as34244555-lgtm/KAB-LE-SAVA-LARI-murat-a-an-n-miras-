import type { BuildingDefinition, BuildingId } from "../core/types";

export const BUILDINGS: BuildingDefinition[] = [
  { id: "hall", name: "Divan", lore: "Kabile merkezi.", baseGoldCost: 0, baseDiamondUpgrade: 2, goldPerTick: 3, unlockLevel: 1 },
  { id: "resource", name: "Ocak", lore: "Arazi üretimi.", baseGoldCost: 40, baseDiamondUpgrade: 1, goldPerTick: 2, unlockLevel: 1 },
  { id: "camp", name: "Kışla", lore: "Birlik eğitimi.", baseGoldCost: 70, baseDiamondUpgrade: 2, goldPerTick: 0, unlockLevel: 1 },
  { id: "tower", name: "Kule", lore: "Savunma.", baseGoldCost: 40, baseDiamondUpgrade: 2, goldPerTick: 0, unlockLevel: 1 },
  { id: "market", name: "Pazar", lore: "Ticaret.", baseGoldCost: 80, baseDiamondUpgrade: 3, goldPerTick: 4, unlockLevel: 1 },
  { id: "forge", name: "Demirhane", lore: "Silah.", baseGoldCost: 90, baseDiamondUpgrade: 3, goldPerTick: 0, unlockLevel: 1 },
];

export function buildingGoldCost(base: number, nextLevel: number): number {
  return Math.round(base * Math.pow(1.28, nextLevel - 1));
}

export function buildingDiamondCost(base: number, nextLevel: number): number {
  return base + Math.max(0, nextLevel - 1);
}

export function isBuildingId(id: string): id is BuildingId {
  return BUILDINGS.some((item) => item.id === id);
}
