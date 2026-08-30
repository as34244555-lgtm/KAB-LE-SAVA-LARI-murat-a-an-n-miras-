import type { BuildingDefinition } from "../core/types";

export const BUILDINGS: BuildingDefinition[] = [
  {
    id: "goldMine",
    name: "Altın Ocağı",
    lore: "Murat Ağa, madeni 'barışın nabzı' diye çağırırdı. Damarlar hâlâ atıyor; lider yok.",
    baseGoldCost: 80,
    baseDiamondUpgrade: 1,
    goldPerTick: 2,
    unlockLevel: 1,
  },
  {
    id: "barracks",
    name: "Yemin Kışlası",
    lore: "Üç kabile burada omuz omuza talim ederdi. Şimdi aynı avluda birbirlerini ölçüyorlar.",
    baseGoldCost: 120,
    baseDiamondUpgrade: 2,
    goldPerTick: 0,
    unlockLevel: 1,
  },
  {
    id: "forge",
    name: "Aslan Demirhanesi",
    lore: "Çeliğe vurulan her çekiç, Murat Ağa'nın kalkanındaki aslanı hatırlar.",
    baseGoldCost: 160,
    baseDiamondUpgrade: 2,
    goldPerTick: 0,
    unlockLevel: 1,
  },
  {
    id: "caravanserai",
    name: "Kervansaray",
    lore: "Eski dostlar hâlâ yolu bilir. Haydutlar da öyle — ve bazen yol, bir savaş sahnesine döner.",
    baseGoldCost: 200,
    baseDiamondUpgrade: 3,
    goldPerTick: 1,
    unlockLevel: 1,
  },
  {
    id: "scrollTower",
    name: "Parşömen Kulesi",
    lore: "Vârisin kulesi. Her kat, Murat Ağa'nın gizlediği bir cümleyi daha yakına taşır.",
    baseGoldCost: 240,
    baseDiamondUpgrade: 3,
    goldPerTick: 0,
    unlockLevel: 1,
  },
  {
    id: "shadowTemple",
    name: "Gölge Tapınağı",
    lore: "Haritanın en karanlık yerinde beliren tarikat. İlk bakışta bilgi verirler. Son bakışta toprak isterler.",
    baseGoldCost: 0,
    baseDiamondUpgrade: 5,
    goldPerTick: 0,
    unlockLevel: 40,
  },
];

export function buildingGoldCost(base: number, nextLevel: number): number {
  return Math.round(base * Math.pow(1.28, nextLevel - 1));
}

export function buildingDiamondCost(base: number, nextLevel: number): number {
  return base + Math.max(0, nextLevel - 1);
}
