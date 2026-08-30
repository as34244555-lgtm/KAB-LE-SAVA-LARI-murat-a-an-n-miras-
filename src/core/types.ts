export const GAME_TITLE = "Kabile Savaşları: Murat Ağa'nın Mirası";
export const MAX_PLAYER_LEVEL = 100;
export const SHADOW_TEMPLE_LEVEL = 40;
export const FINALE_LEVEL = 100;
export const SIDE_TRIBE_INTERVAL = 10;

export type GamePhase = "boot" | "intro" | "menu" | "pick" | "map" | "build" | "battle" | "loading";

export type PlayableTribe = "sariklilar" | "gokhanli" | "demirhisar";
export type TribeId = PlayableTribe | "player";
export type Temperament = "sicak" | "gizemli" | "onurlu" | "merakli";
export type ResourceId = "gold" | "wood" | "stone" | "leather" | "crystal" | "food";
export type Biome = "desert" | "forest" | "ice";
export type OwnerId = PlayableTribe | "neutral";
export type BuildingSlot = "hall" | "resource" | "camp" | "tower" | "market" | "forge";
export type UnitClass = "bomber" | "skirmisher" | "guardian";
export type Atmosphere = "peace" | "suspicion" | "shadow" | "reckoning";
export type DockPanel = "yonetim" | "ticaret" | "insa" | "birlikler" | "arastirma";
export type BattleStance = "assault" | "ambush" | "hold";

export type BuildingId = BuildingSlot;

export interface TribeProfile {
  id: TribeId;
  name: string;
  epithet: string;
  temperament: Temperament;
  colors: { primary: string; secondary: string; accent: string };
  combat: { class: UnitClass; role: string; beats: TribeId | null; losesTo: TribeId | null };
  accuses: TribeId | null;
  accusation: string;
  voice: string;
}

export interface ScrollFragment {
  level: number;
  title: string;
  body: string;
  misdirection: TribeId | "none" | "assassins";
  tone: Atmosphere;
}

export interface SideTribe {
  unlockLevel: number;
  id: string;
  name: string;
  relation: "dost" | "dusman" | "belirsiz";
  memory: string;
  clue: string;
  isShadowCult: boolean;
}

export interface DialogueLine {
  speaker: TribeId | "npc" | "narrator" | "shadow";
  text: string;
  barb?: TribeId;
}

export interface QuestDefinition {
  id: string;
  title: string;
  giver: string;
  unlockLevel: number;
  memoryOfMurat: string;
  objective: string;
  goldReward: number;
  xpReward: number;
  diamondReward: number;
}

export interface BuildingDefinition {
  id: BuildingId;
  name: string;
  lore: string;
  baseGoldCost: number;
  baseDiamondUpgrade: number;
  goldPerTick: number;
  unlockLevel: number;
}

export interface UnitDefinition {
  id: string;
  tribe: TribeId;
  name: string;
  unitClass: UnitClass;
  lore: string;
  baseCost: number;
  baseHp: number;
  baseAttack: number;
  baseDefense: number;
  critChance: number;
  aoe: number;
}

export interface HexTile {
  id: string;
  q: number;
  r: number;
  biome: Biome;
  owner: OwnerId;
  slot?: BuildingSlot;
  level: number;
  garrison: number;
  label: string;
}

export interface ResourceBag {
  gold: number;
  wood: number;
  stone: number;
  leather: number;
  crystal: number;
  food: number;
}

export interface PlayerSave {
  version: 2;
  playerName: string;
  chosenTribe: PlayableTribe | null;
  playerLevel: number;
  xp: number;
  diamond: number;
  resources: ResourceBag;
  tiles: HexTile[];
  army: number;
  unitLevel: number;
  collectedScrolls: number[];
  discoveredSideTribes: string[];
  completedQuests: string[];
  caravan: CaravanSave | null;
  shadowTempleRevealed: boolean;
  finaleRevealed: boolean;
  lastTickAt: number;
  selectedHex: string | null;
  /** Eski köy testleri ve Gölge Tapınağı kilidi için. */
  buildingLevels: Record<string, number>;
}

export interface CaravanSave {
  destination: string;
  remainingMs: number;
  goldStake: number;
  departedAt: number;
}

export interface BattleParticipant {
  tribe: TribeId;
  name: string;
  count: number;
  startCount?: number;
  level: number;
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  critChance: number;
  aoe: number;
}

export interface BattleField {
  biome: Biome;
  tower: boolean;
  hall: boolean;
  flanking: number;
  stance: BattleStance;
  garrison: number;
}

export interface BattleResult {
  winner: "player" | "enemy" | "draw";
  log: string[];
  goldLoot: number;
  xpReward: number;
  playerRemaining: number;
  enemyRemaining: number;
}

export interface LevelUpResult {
  newLevel: number;
  scroll: ScrollFragment | null;
  unlockedSideTribe: SideTribe | null;
  shadowTempleUnlocked: boolean;
  finaleUnlocked: boolean;
  atmosphere: Atmosphere;
}
