import type { TribeProfile, UnitDefinition } from "../core/types";

export const TRIBES: Record<Exclude<TribeProfile["id"], never>, TribeProfile> = {
  sariklilar: {
    id: "sariklilar",
    name: "Sarıklılar",
    epithet: "Ateşin ve Barutun Çocukları",
    temperament: "sicak",
    colors: { primary: "#c0392b", secondary: "#f4d03f", accent: "#fff4d6" },
    combat: {
      class: "bomber",
      role: "Alan hasarı / bomba",
      beats: "demirhisar",
      losesTo: "gokhanli",
    },
    accuses: "gokhanli",
    accusation:
      "Hançer bir gölge kadar sessiz saplandı. Bunu ancak rüzgârın çocukları yapardı — Gök-Hanlılar tahtın arkasında duruyordu.",
    voice: "sıcak, öfkeli, iğneleyici",
  },
  gokhanli: {
    id: "gokhanli",
    name: "Gök-Hanlı",
    epithet: "Gölgelerin ve Rüzgârın Kabilesi",
    temperament: "gizemli",
    colors: { primary: "#2c1a4d", secondary: "#7d3c98", accent: "#d7bde2" },
    combat: {
      class: "skirmisher",
      role: "Hız / kritik hasar",
      beats: "sariklilar",
      losesTo: "demirhisar",
    },
    accuses: "demirhisar",
    accusation:
      "Saraya fark edilmeden girmek için o kadar ağır bir zırh gerekir ki adımlar taşları uyutur. Demir-Hisar bunu bilir.",
    voice: "alçak, hızlı, iğneleyici",
  },
  demirhisar: {
    id: "demirhisar",
    name: "Demir-Hisar",
    epithet: "Çelik ve Yeminin Muhafızları",
    temperament: "onurlu",
    colors: { primary: "#7b241c", secondary: "#d4ac0d", accent: "#f5e6c8" },
    combat: {
      class: "guardian",
      role: "Zırh / savunma",
      beats: "gokhanli",
      losesTo: "sariklilar",
    },
    accuses: "sariklilar",
    accusation:
      "Barışı bozmak için kendi liderlerini feda edenler, barutu dualarının yanına koyanlardır. Sarıklılar tahtı yakmak istedi.",
    voice: "sert, onurlu, iğneleyici",
  },
  player: {
    id: "player",
    name: "Vâris",
    epithet: "Parşömenlerin Koruyucusu",
    temperament: "merakli",
    colors: { primary: "#2471a3", secondary: "#d4a574", accent: "#fdebd0" },
    combat: {
      class: "skirmisher",
      role: "Keşif / komuta",
      beats: null,
      losesTo: null,
    },
    accuses: null,
    accusation: "Ben kimseyi suçlamadan önce mührü okuyacağım.",
    voice: "kararlı, hüzünlü",
  },
};

export const UNITS: UnitDefinition[] = [
  {
    id: "barutcu",
    tribe: "sariklilar",
    name: "Sarıklı Barutçu",
    unitClass: "bomber",
    lore: "Murat Ağa'nın festival gecelerinde gökyüzünü yakan ustaların torunları. Şimdi aynı kıvılcımı surlara çeviriyorlar.",
    baseCost: 40,
    baseHp: 70,
    baseAttack: 28,
    baseDefense: 8,
    critChance: 0.08,
    aoe: 0.45,
  },
  {
    id: "ruzgar",
    tribe: "gokhanli",
    name: "Gök-Hanlı Rüzgâr",
    unitClass: "skirmisher",
    lore: "Sessiz adımları Murat Ağa'nın av partilerinde övülürdü. Şimdi aynı adımlar şüpheyle ölçülüyor.",
    baseCost: 45,
    baseHp: 55,
    baseAttack: 22,
    baseDefense: 6,
    critChance: 0.28,
    aoe: 0,
  },
  {
    id: "muhafiz",
    tribe: "demirhisar",
    name: "Demir-Hisar Muhafızı",
    unitClass: "guardian",
    lore: "Aslan başlı kalkanlarını Murat Ağa'nın yeminiyle dövdüler. Zırhları hâlâ o yemini taşır.",
    baseCost: 50,
    baseHp: 110,
    baseAttack: 16,
    baseDefense: 22,
    critChance: 0.04,
    aoe: 0,
  },
];

/** Taş-kâğıt-makas: Sarıklılar > Demir-Hisar > Gök-Hanlı > Sarıklılar */
export const RPS_MULTIPLIER = 1.35;

export function rpsMultiplier(attacker: TribeProfile["id"], defender: TribeProfile["id"]): number {
  const profile = TRIBES[attacker];
  if (profile.combat.beats === defender) return RPS_MULTIPLIER;
  if (profile.combat.losesTo === defender) return 1 / RPS_MULTIPLIER;
  return 1;
}

export function enemyPowerAtLevel(level: number): number {
  return 1 + Math.pow(level / 12, 1.15) * 0.22;
}
