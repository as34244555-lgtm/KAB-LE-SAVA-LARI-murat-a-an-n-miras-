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

export function hexDistance(aq: number, ar: number, bq: number, br: number): number {
  return Math.max(Math.abs(aq - bq), Math.abs(ar - br), Math.abs(aq + ar - bq - br));
}

export function hexRound(q: number, r: number): { q: number; r: number } {
  const s = -q - r;
  let rq = Math.round(q);
  let rr = Math.round(r);
  const rs = Math.round(s);
  const dq = Math.abs(rq - q);
  const dr = Math.abs(rr - r);
  const ds = Math.abs(rs - s);
  if (dq > dr && dq > ds) rq = -rr - rs;
  else if (dr > ds) rr = -rq - rs;
  return { q: rq, r: rr };
}

export function worldToAxial(x: number, z: number, size = HEX_SIZE): { q: number; r: number } {
  const q = ((Math.sqrt(3) / 3) * x - (1 / 3) * z) / size;
  const r = ((2 / 3) * z) / size;
  return hexRound(q, r);
}

export function forEachHex(q0: number, r0: number, radius: number, visit: (q: number, r: number) => void): void {
  for (let q = q0 - radius; q <= q0 + radius; q += 1) {
    for (let r = r0 - radius; r <= r0 + radius; r += 1) {
      if (hexDistance(q0, r0, q, r) <= radius) visit(q, r);
    }
  }
}

/** 0..1 deterministic noise — iklim karışımı için. */
export function hash01(q: number, r: number, salt = 0): number {
  let n = (q + salt * 17) * 374761393 + (r - salt * 9) * 668265263;
  n = (n ^ (n >>> 13)) * 1274126177;
  return ((n ^ (n >>> 16)) >>> 0) / 4294967296;
}

export function valueNoise(q: number, r: number, scale: number, salt = 0): number {
  const fq = q / scale;
  const fr = r / scale;
  const q0 = Math.floor(fq);
  const r0 = Math.floor(fr);
  const tx = fq - q0;
  const ty = fr - r0;
  const a = hash01(q0, r0, salt);
  const b = hash01(q0 + 1, r0, salt);
  const c = hash01(q0, r0 + 1, salt);
  const d = hash01(q0 + 1, r0 + 1, salt);
  const u = tx * tx * (3 - 2 * tx);
  const v = ty * ty * (3 - 2 * ty);
  return a * (1 - u) * (1 - v) + b * u * (1 - v) + c * (1 - u) * v + d * u * v;
}
