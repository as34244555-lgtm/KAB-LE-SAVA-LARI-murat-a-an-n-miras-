import type { BuildingId, ResourceId } from "../core/types";
import { BUILDINGS, buildingDiamondCost, buildingGoldCost } from "../data/buildings";
import type { LevelManager } from "./LevelManager";

export class EconomyManager {
  gold: number;
  diamond: number;

  constructor(gold = 220, diamond = 6) {
    this.gold = Math.max(0, Math.floor(gold));
    this.diamond = Math.max(0, Math.floor(diamond));
  }

  canAfford(resource: ResourceId, amount: number): boolean {
    return this[resource] >= amount;
  }

  spend(resource: ResourceId, amount: number): boolean {
    if (!this.canAfford(resource, amount)) return false;
    this[resource] -= amount;
    return true;
  }

  grant(resource: ResourceId, amount: number): void {
    this[resource] += Math.max(0, Math.floor(amount));
  }

  produce(buildingLevels: Record<BuildingId, number>, ticks = 1): number {
    let earned = 0;
    for (const def of BUILDINGS) {
      const level = buildingLevels[def.id] ?? 0;
      if (level <= 0 || def.goldPerTick <= 0) continue;
      earned += def.goldPerTick * level * ticks;
    }
    this.grant("gold", earned);
    return earned;
  }

  buildCost(id: BuildingId, currentLevel: number, levels: LevelManager): { gold: number; diamond: number } | null {
    const def = BUILDINGS.find((building) => building.id === id);
    if (!def) return null;
    const next = currentLevel + 1;
    if (next > levels.currentLevel) return null;
    if (levels.currentLevel < def.unlockLevel) return null;
    if (currentLevel === 0) return { gold: def.baseGoldCost, diamond: 0 };
    return {
      gold: buildingGoldCost(def.baseGoldCost, next),
      diamond: buildingDiamondCost(def.baseDiamondUpgrade, next),
    };
  }

  snapshot() {
    return { gold: this.gold, diamond: this.diamond };
  }
}
