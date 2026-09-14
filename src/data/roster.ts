import type { DiplomacyMood, PlayableTribe } from "../core/types";
import { UNITS } from "./tribes";

export function unitsFor(tribe: PlayableTribe) {
  return UNITS.filter((unit) => unit.tribe === tribe);
}

export function starterUnitId(tribe: PlayableTribe): string {
  return unitsFor(tribe)[0]?.id ?? "muhafiz";
}

export function rosterSum(roster: Record<string, number> | undefined): number {
  return Object.values(roster ?? {}).reduce((sum, n) => sum + Math.max(0, n), 0);
}

export function rosterFromArmy(tribe: PlayableTribe, army: number): Record<string, number> {
  return { [starterUnitId(tribe)]: Math.max(0, army) };
}

export function defaultDiplomacy(): Record<PlayableTribe, DiplomacyMood> {
  return { sariklilar: "talks", gokhanli: "talks", demirhisar: "talks" };
}

export function alignRoster(
  roster: Record<string, number> | undefined,
  army: number,
  tribe: PlayableTribe,
): Record<string, number> {
  const next: Record<string, number> = { ...(roster ?? {}) };
  const starter = starterUnitId(tribe);
  let sum = rosterSum(next);
  if (army > sum) {
    next[starter] = (next[starter] ?? 0) + (army - sum);
  } else if (army < sum) {
    let need = sum - army;
    const order = [...unitsFor(tribe).map((unit) => unit.id)].reverse();
    for (const id of order) {
      if (need <= 0) break;
      const take = Math.min(next[id] ?? 0, need);
      next[id] = (next[id] ?? 0) - take;
      need -= take;
    }
  }
  return next;
}

export function takeFromRoster(
  roster: Record<string, number>,
  count: number,
  tribe: PlayableTribe,
): Record<string, number> {
  const taken: Record<string, number> = {};
  let left = count;
  for (const unit of unitsFor(tribe)) {
    const have = roster[unit.id] ?? 0;
    const n = Math.min(have, left);
    if (n <= 0) continue;
    taken[unit.id] = n;
    roster[unit.id] = have - n;
    left -= n;
  }
  if (left > 0) {
    const starter = starterUnitId(tribe);
    taken[starter] = (taken[starter] ?? 0) + left;
  }
  return taken;
}

export function returnToRoster(
  roster: Record<string, number>,
  taken: Record<string, number>,
  remaining: number,
): void {
  const sent = Object.values(taken).reduce((sum, n) => sum + n, 0);
  if (sent <= 0) return;
  let assigned = 0;
  const entries = Object.entries(taken);
  entries.forEach(([id, n], index) => {
    const back =
      index === entries.length - 1 ? Math.max(0, remaining - assigned) : Math.round((n * remaining) / sent);
    roster[id] = (roster[id] ?? 0) + back;
    assigned += back;
  });
}

export function moodLabel(mood: DiplomacyMood): string {
  if (mood === "war") return "savaş";
  if (mood === "trade") return "ticaret";
  return "görüşme";
}
