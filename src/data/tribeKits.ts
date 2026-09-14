import type { BuildingSlot, PlayableTribe, ResourceBag, ResourceId } from "../core/types";

export interface SlotKit {
  slot: BuildingSlot;
  name: string;
  lore: string;
  cost: Partial<ResourceBag>;
  produces: Partial<ResourceBag>;
}

export interface TribeKit {
  tribe: PlayableTribe;
  biomeLabel: string;
  hallTitle: string;
  unitName: string;
  unitTitle: string;
  heroName: string;
  slots: SlotKit[];
}

export const TRIBE_KITS: Record<PlayableTribe, TribeKit> = {
  sariklilar: {
    tribe: "sariklilar",
    biomeLabel: "Çöl Ocağı",
    hallTitle: "Ateş Divanı",
    unitName: "Sarıklı Barutçu",
    unitTitle: "Barut ve deve akını",
    heroName: "Kum Beyi",
    slots: [
      { slot: "hall", name: "Ateş Divanı", lore: "Çölün kalbi. Altın ve emir buradan akar.", cost: { gold: 0 }, produces: { gold: 3, food: 1 } },
      { slot: "resource", name: "Hurma Tarlası", lore: "Vaha tarlaları kabilenin karnını doyurur.", cost: { gold: 40, wood: 20 }, produces: { food: 3, leather: 1 } },
      { slot: "camp", name: "Barut Çadırı", lore: "Fitil ve toz burada uyanır.", cost: { gold: 70, leather: 15, food: 20 }, produces: { gold: 1 } },
      { slot: "tower", name: "Kum Kulesi", lore: "Çöl rüzgârını gözetler.", cost: { stone: 30, gold: 40 }, produces: {} },
      { slot: "market", name: "Deve Pazarı", lore: "Kervanlar vaha gölgesinde durur.", cost: { gold: 80, leather: 20 }, produces: { gold: 4 } },
      { slot: "forge", name: "Fitil Ocağı", lore: "Barutçu tüfekleri burada dolanır.", cost: { gold: 90, stone: 20 }, produces: {} },
    ],
  },
  gokhanli: {
    tribe: "gokhanli",
    biomeLabel: "Sisli Orman",
    hallTitle: "Rüzgâr Ocağı",
    unitName: "Gök-Hanlı Rüzgâr",
    unitTitle: "Gölge ve panter binicisi",
    heroName: "Sis Hanı",
    slots: [
      { slot: "hall", name: "Rüzgâr Ocağı", lore: "Ormanın kalbi. Kristal ve sır burada birikir.", cost: { gold: 0 }, produces: { gold: 2, crystal: 1 } },
      { slot: "resource", name: "Kristal Kök", lore: "Mor damarlar ağaçların altında atar.", cost: { gold: 45, wood: 25 }, produces: { wood: 3, crystal: 2 } },
      { slot: "camp", name: "Gölge Kampı", lore: "Sessiz adımlar burada eğitilir.", cost: { gold: 75, wood: 20, crystal: 10 }, produces: { gold: 1 } },
      { slot: "tower", name: "Sis Kulesi", lore: "Yaprakların üstünden bakar.", cost: { wood: 40, gold: 35 }, produces: {} },
      { slot: "market", name: "Yaprak Pazarı", lore: "Yan kabileler burada takas eder.", cost: { gold: 80, wood: 25 }, produces: { gold: 3, crystal: 1 } },
      { slot: "forge", name: "Gölge Tezgâhı", lore: "Hançerler ve panter semerleri.", cost: { gold: 95, crystal: 15 }, produces: {} },
    ],
  },
  demirhisar: {
    tribe: "demirhisar",
    biomeLabel: "Buz Hisarı",
    hallTitle: "Çelik Taht",
    unitName: "Demir-Hisar Muhafızı",
    unitTitle: "Zırh ve aslan kalkanı",
    heroName: "Hisar Beyi",
    slots: [
      { slot: "hall", name: "Çelik Taht", lore: "Buzun kalbi. Taş ve yemin burada tutulur.", cost: { gold: 0 }, produces: { gold: 2, stone: 1 } },
      { slot: "resource", name: "Buz Ocağı", lore: "Kristal damarlar ve taş damar.", cost: { gold: 50, stone: 15 }, produces: { stone: 3, gold: 1 } },
      { slot: "camp", name: "Yemin Kışlası", lore: "Aslan kalkanları burada omuzlanır.", cost: { gold: 80, stone: 25, food: 15 }, produces: { gold: 1 } },
      { slot: "tower", name: "Buz Burcu", lore: "Surların gözü.", cost: { stone: 45, gold: 40 }, produces: {} },
      { slot: "market", name: "Demir Çarşı", lore: "Zırh ve tuz takası.", cost: { gold: 85, stone: 20 }, produces: { gold: 4 } },
      { slot: "forge", name: "Aslan Demirhanesi", lore: "Çeliğe vurulan her çekiç bir yemini hatırlar.", cost: { gold: 100, stone: 30 }, produces: {} },
    ],
  },
};

export function kitFor(tribe: PlayableTribe): TribeKit {
  return TRIBE_KITS[tribe];
}

export function slotKit(tribe: PlayableTribe, slot: BuildingSlot): SlotKit {
  return TRIBE_KITS[tribe].slots.find((item) => item.slot === slot) ?? TRIBE_KITS[tribe].slots[0];
}

export function canPay(bag: ResourceBag, cost: Partial<ResourceBag>): boolean {
  return (Object.keys(cost) as ResourceId[]).every((key) => (bag[key] ?? 0) >= (cost[key] ?? 0));
}

export function pay(bag: ResourceBag, cost: Partial<ResourceBag>): ResourceBag {
  const next = { ...bag };
  for (const key of Object.keys(cost) as ResourceId[]) {
    next[key] -= cost[key] ?? 0;
  }
  return next;
}

export function addBag(bag: ResourceBag, add: Partial<ResourceBag>, mul = 1): ResourceBag {
  const next = { ...bag };
  for (const key of Object.keys(add) as ResourceId[]) {
    next[key] += Math.floor((add[key] ?? 0) * mul);
  }
  return next;
}

export const TRAIN_COST: Partial<ResourceBag> = { gold: 35, food: 12 };
export const UPGRADE_COST: Partial<ResourceBag> = { gold: 60, crystal: 8 };
