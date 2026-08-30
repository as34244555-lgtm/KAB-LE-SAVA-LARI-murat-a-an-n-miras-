import type { Biome, HexTile, OwnerId, PlayableTribe } from "../core/types";
import { TRIBES } from "./tribes";
import { hexKey } from "../world/hexMath";

const RADIUS = 3;

export function biomeAt(q: number, r: number): Biome {
  if (q <= -1 && r >= 0) return "desert";
  if (q >= 1 && r <= 0) return "ice";
  if (q + r <= -2) return "desert";
  if (q + r >= 2) return "ice";
  return "forest";
}

function ownerAt(q: number, r: number, biome: Biome): OwnerId {
  if (biome === "desert" && (q <= -2 || (q === -1 && r >= 1))) return "sariklilar";
  if (biome === "ice" && (q >= 2 || (q === 1 && r <= -1))) return "demirhisar";
  if (biome === "forest" && Math.abs(q) <= 1 && Math.abs(r) <= 1 && Math.abs(q + r) <= 1) return "gokhanli";
  return "neutral";
}

function isHall(q: number, r: number, owner: OwnerId): boolean {
  if (owner === "sariklilar") return q === -3 && r === 1;
  if (owner === "gokhanli") return q === 0 && r === 0;
  if (owner === "demirhisar") return q === 3 && r === -1;
  return false;
}

export function generateWorld(_player: PlayableTribe): HexTile[] {
  const tiles: HexTile[] = [];
  for (let q = -RADIUS; q <= RADIUS; q += 1) {
    for (let r = -RADIUS; r <= RADIUS; r += 1) {
      if (Math.abs(q + r) > RADIUS) continue;
      const biome = biomeAt(q, r);
      const owner = ownerAt(q, r, biome);
      const hall = isHall(q, r, owner);
      tiles.push({
        id: hexKey(q, r),
        q,
        r,
        biome,
        owner,
        slot: hall ? "hall" : undefined,
        level: hall ? 1 : 0,
        garrison: owner === "neutral" ? 2 : hall ? 8 : 5,
        label: hall ? `${TRIBES[owner === "neutral" ? "player" : owner].name} merkezi` : tileLabel(biome, owner),
      });
    }
  }
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
