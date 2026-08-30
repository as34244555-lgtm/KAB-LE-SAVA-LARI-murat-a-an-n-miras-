/** Sahnede kaç figür düşer: kalan / gönderilen oranı. */
export function doomedFlags(shown: number, remaining: number, sent: number): boolean[] {
  const keep = Math.max(0, Math.min(shown, Math.round((remaining / Math.max(1, sent)) * shown)));
  const deaths = shown - keep;
  return Array.from({ length: shown }, (_, index) => index < deaths);
}

export const BATTLE_CHARGE_S = 1.35;
export const BATTLE_CLASH_S = 5.1;
