export const HEX_SIZE = 1.18;

export function hexKey(q: number, r: number): string {
  return `${q},${r}`;
}

export function parseKey(id: string): { q: number; r: number } {
  const [q, r] = id.split(",").map(Number);
  return { q, r };
}

export function axialToWorld(q: number, r: number, size = HEX_SIZE): { x: number; z: number } {
  return {
    x: size * Math.sqrt(3) * (q + r / 2),
    z: size * 1.5 * r,
  };
}

export const HEX_DIRS: Array<[number, number]> = [
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, 0],
  [-1, 1],
  [0, 1],
];

export function neighbors(q: number, r: number): Array<{ q: number; r: number }> {
  return HEX_DIRS.map(([dq, dr]) => ({ q: q + dq, r: r + dr }));
}

export function isAdjacent(a: string, b: string): boolean {
  const A = parseKey(a);
  const B = parseKey(b);
  return neighbors(A.q, A.r).some((n) => n.q === B.q && n.r === B.r);
}
