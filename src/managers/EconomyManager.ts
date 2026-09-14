import type { HexTile, OwnerId, ResourceBag, ResourceId } from "../core/types";
import { addBag, slotKit } from "../data/tribeKits";
import type { PlayableTribe } from "../core/types";
import { buildingDiamondCost, buildingGoldCost } from "../data/buildings";
import type { LevelManager } from "./LevelManager";

const LEGACY_BASE: Record<string, number> = {
  goldMine: 40,
  barracks: 55,
  forge: 70,
  caravanserai: 80,
  scrollTower: 60,
  shadowTemple: 200,
  hall: 0,
  resource: 40,
  camp: 70,
  tower: 40,
  market: 80,
};

export const EMPTY_BAG: ResourceBag = { gold: 0, wood: 0, stone: 0, leather: 0, crystal: 0, food: 0 };

export function startBag(): ResourceBag {
  return { gold: 240, wood: 90, stone: 80, leather: 45, crystal: 24, food: 110 };
}

export class EconomyManager {
  gold: number;
  diamond: number;
  bag: ResourceBag;

  constructor(gold = 240, diamond = 6, bag: ResourceBag = startBag()) {
    this.gold = Math.max(0, Math.floor(gold));
    this.diamond = Math.max(0, Math.floor(diamond));
    this.bag = { ...startBag(), ...bag, gold: this.gold };
  }

  canAfford(resource: ResourceId | "diamond", amount: number): boolean {
    if (resource === "diamond") return this.diamond >= amount;
    return (this.bag[resource] ?? 0) >= amount;
  }

  spend(resource: ResourceId | "diamond", amount: number): boolean {
    if (!this.canAfford(resource, amount)) return false;
    if (resource === "diamond") this.diamond -= amount;
    else {
      this.bag[resource] -= amount;
      if (resource === "gold") this.gold = this.bag.gold;
    }
    return true;
  }

  grant(resource: ResourceId | "diamond", amount: number): void {
    const add = Math.max(0, Math.floor(amount));
    if (resource === "diamond") this.diamond += add;
    else {
      this.bag[resource] += add;
      if (resource === "gold") this.gold = this.bag.gold;
    }
  }

  produceTiles(tiles: HexTile[], owner: OwnerId | null, ticks = 1): ResourceBag {
    if (!owner || owner === "neutral") return { ...EMPTY_BAG };
    let earned: ResourceBag = { ...EMPTY_BAG };
    for (const tile of tiles) {
      if (tile.owner !== owner || !tile.slot || tile.level <= 0) continue;
      const kit = slotKit(owner as PlayableTribe, tile.slot);
      earned = addBag(earned, kit.produces, tile.level * ticks);
    }
    this.bag = addBag(this.bag, earned);
    this.gold = this.bag.gold;
    return earned;
  }

  buildCost(id: string, currentLevel: number, levels: LevelManager): { gold: number; diamond: number } | null {
    const next = currentLevel + 1;
    if (!levels.canUpgradeTo(next)) return null;
    const base = LEGACY_BASE[id] ?? 40;
    return {
      gold: buildingGoldCost(Math.max(1, base), next),
      diamond: buildingDiamondCost(id === "shadowTemple" ? 4 : 1, next),
    };
  }

  /** Eski testler için: altın ocağı benzeri üretim. */
  produce(levels: Record<string, number>, ticks = 1): number {
    const hall = levels.goldMine ?? levels.hall ?? 0;
    const market = levels.caravanserai ?? levels.market ?? 0;
    const earned = hall * 2 * ticks + market * 1 * ticks;
    this.grant("gold", earned);
    return earned;
  }

  snapshot() {
    return { gold: this.gold, diamond: this.diamond, bag: { ...this.bag } };
  }
}
