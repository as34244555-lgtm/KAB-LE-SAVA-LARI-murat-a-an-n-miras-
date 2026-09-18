import type { CaravanSave } from "../core/types";

export const CARAVAN_DURATION_MS = 28_000;
export const RAID_CHANCE = 0.42;

export interface CaravanTick {
  remainingMs: number;
  arrived: boolean;
  raid: boolean;
  goldReturn: number;
}

export class CaravanSystem {
  current: CaravanSave | null;

  constructor(current: CaravanSave | null = null) {
    this.current = current;
  }

  get busy(): boolean {
    return this.current !== null;
  }

  depart(destination: string, goldStake: number, now = Date.now()): CaravanSave | null {
    if (this.current || goldStake <= 0) return null;
    this.current = {
      destination,
      remainingMs: CARAVAN_DURATION_MS,
      goldStake,
      departedAt: now,
    };
    return this.current;
  }

  speedUp(ms: number): void {
    if (!this.current) return;
    this.current.remainingMs = Math.max(0, this.current.remainingMs - ms);
  }

  tick(dtMs: number, rng: () => number = Math.random): CaravanTick | null {
    if (!this.current) return null;
    this.current.remainingMs = Math.max(0, this.current.remainingMs - dtMs);
    if (this.current.remainingMs > 0) {
      return { remainingMs: this.current.remainingMs, arrived: false, raid: false, goldReturn: 0 };
    }
    const raid = rng() < RAID_CHANCE;
    const goldReturn = raid
      ? Math.round(this.current.goldStake * 0.35)
      : Math.round(this.current.goldStake * 1.7 + 25);
    const result: CaravanTick = {
      remainingMs: 0,
      arrived: true,
      raid,
      goldReturn,
    };
    this.current = null;
    return result;
  }
}
