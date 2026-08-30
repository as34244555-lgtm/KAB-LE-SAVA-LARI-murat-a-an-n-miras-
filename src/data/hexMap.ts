import type { Biome, HexTile, OwnerId, PlayableTribe } from "../core/types";
import { TRIBES } from "./tribes";
import { forEachHex, hash01, hexDistance, hexKey, valueNoise } from "../world/hexMath";

export const HALLS: Record<PlayableTribe, { q: number; r: number }> = {
  sariklilar: { q: -7, r: 4 },
  gokhanli: { q: 0, r: 0 },
  demirhisar: { q: 7, r: -3 },
};

export const EXPLORE_RADIUS = 8;
const START_VIEW = 7;
const HALL_CLUSTER = 2;

export function biomeAt(q: number, r: number): Biome {
  const temp = valueNoise(q, r, 4.2, 1) * 0.62 + valueNoise(q, r, 1.7, 4) * 0.38;
  const moist = valueNoise(q + 40, r - 12, 5.1, 2);
  let biome: Biome = "forest";
  if (temp < 0.36 || (temp < 0.45 && moist < 0.32)) biome = "ice";
  else if (temp > 0.64 || (temp > 0.55 && moist < 0.38)) biome = "desert";

  const anomaly = hash01(q, r, 11);
  if (anomaly < 0.07) biome = "desert";
  else if (anomaly < 0.14) biome = "ice";
  else if (anomaly < 0.21) biome = "forest";

  for (const [tribe, hall] of Object.entries(HALLS) as [PlayableTribe, { q: number; r: number }][]) {
    const d = hexDistance(q, r, hall.q, hall.r);
    if (d <= 2 && hash01(q, r, 3) > 0.28) {
      biome = tribe === "sariklilar" ? "desert" : tribe === "demirhisar" ? "ice" : "forest";
    }
  }
  return biome;
}

function ownerAt(q: number, r: number): OwnerId {
  for (const [tribe, hall] of Object.entries(HALLS) as [PlayableTribe, { q: number; r: number }][]) {
    if (hexDistance(q, r, hall.q, hall.r) <= 1) return tribe;
  }
  const far = hash01(q, r, 19);
  if (far < 0.035 && hexDistance(q, r, 0, 0) > 5) {
    if (far < 0.012) return "sariklilar";
    if (far < 0.024) return "gokhanli";
    return "demirhisar";
  }
  return "neutral";
}

function isHall(q: number, r: number, owner: OwnerId): boolean {
  if (owner === "neutral") return false;
  const hall = HALLS[owner];
  return hall.q === q && hall.r === r;
}

export function makeTile(q: number, r: number): HexTile {
  const biome = biomeAt(q, r);
  const owner = ownerAt(q, r);
  const hall = isHall(q, r, owner);
  const wild = Math.floor(hexDistance(q, r, 0, 0) / 4);
  return {
    id: hexKey(q, r),
    q,
    r,
    biome,
    owner,
    slot: hall ? "hall" : undefined,
    level: hall ? 1 : 0,
    garrison: owner === "neutral" ? 2 + wild : hall ? 8 : 4 + wild,
    label: hall ? `${TRIBES[owner as PlayableTribe].name} merkezi` : tileLabel(biome, owner),
  };
}

export function ensureTiles(tiles: HexTile[], q: number, r: number, radius: number): number {
  const have = new Set(tiles.map((tile) => tile.id));
  let added = 0;
  forEachHex(q, r, radius, (qq, rr) => {
    const id = hexKey(qq, rr);
    if (have.has(id)) return;
    tiles.push(makeTile(qq, rr));
    have.add(id);
    added += 1;
  });
  return added;
}

export function generateWorld(player: PlayableTribe): HexTile[] {
  const tiles: HexTile[] = [];
  ensureTiles(tiles, HALLS[player].q, HALLS[player].r, START_VIEW);
  (Object.keys(HALLS) as PlayableTribe[]).forEach((tribe) => {
    ensureTiles(tiles, HALLS[tribe].q, HALLS[tribe].r, HALL_CLUSTER);
  });
  return tiles;
}

export function hexById(tiles: HexTile[], id: string): HexTile | undefined {
  return tiles.find((tile) => tile.id === id);
}

export function tileLabel(biome: Biome, owner: OwnerId): string {
  const land = biome === "desert" ? "Çöl" : biome === "ice" ? "Buz" : "Orman";
  if (owner === "neutral") return `${land} geçidi`;
  return `${TRIBES[owner].name} ${land.toLowerCase()}ı`;
}

export function startingBanner(tribe: PlayableTribe): string {
  if (tribe === "sariklilar") return "GÖK-HANLI & DEMİR-HİSAR GÖRÜŞMESİ AKTİF";
  if (tribe === "gokhanli") return "YAN KABİLELER TİCARET BULUŞMASI";
  return "ÇÖL VE ORMAN KABİLELERİ HAREKETTE";
}

export function mapBanner(tribe: PlayableTribe | null, level: number): string {
  if (level >= 40 && level < 100) return "GÖLGE TAPINAĞI SİSİN ARDINDAN GÖRÜNDÜ";
  if (level >= 100) return "GÖLGE ELÇİSİ ORTAYA ÇIKTI";
  if (level > 0 && level % 10 === 0) return "YAN KABİLELER TİCARET BULUŞMASI";
  if (!tribe) return "ÜÇ KABİLE HARİTADA BEKLİYOR";
  return startingBanner(tribe);
}

export function climateHint(biome: Biome): string {
  if (biome === "desert") return "Çöl: Sarıklılar avantajlı, Demir-Hisar zorlanır.";
  if (biome === "ice") return "Buz: Demir-Hisar avantajlı, Sarıklılar zorlanır.";
  return "Orman: Gök-Hanlı avantajlı, Demir-Hisar zorlanır.";
}
