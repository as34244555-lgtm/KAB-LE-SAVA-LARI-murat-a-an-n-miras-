export const GAME_TITLE = "Kabile Savaşları: Murat Ağa'nın Mirası";
export const MAX_PLAYER_LEVEL = 100;
export const SHADOW_TEMPLE_LEVEL = 40;
export const FINALE_LEVEL = 100;
export const SIDE_TRIBE_INTERVAL = 10;

export type GamePhase =
  | "boot"
  | "intro"
  | "menu"
  | "build"
  | "explore"
  | "battle"
  | "dialogue"
  | "journal"
  | "loading";

export type TribeId = "sariklilar" | "gokhanli" | "demirhisar" | "player";

export type Temperament = "sicak" | "gizemli" | "onurlu" | "merakli";

export type ResourceId = "gold" | "diamond";

export type BuildingId =
  | "goldMine"
  | "barracks"
  | "forge"
  | "caravanserai"
  | "scrollTower"
  | "shadowTemple";

export type UnitClass = "bomber" | "skirmisher" | "guardian";

export type Atmosphere = "peace" | "suspicion" | "shadow" | "reckoning";

export interface TribeProfile {
  id: TribeId;
  name: string;
  epithet: string;
  temperament: Temperament;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  combat: {
    class: UnitClass;
    role: string;
    beats: TribeId | null;
    losesTo: TribeId | null;
  };
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

export interface PlayerSave {
  version: 1;
  playerName: string;
  playerLevel: number;
  xp: number;
  gold: number;
  diamond: number;
  collectedScrolls: number[];
  discoveredSideTribes: string[];
  buildingLevels: Record<BuildingId, number>;
  army: Record<TribeId, number>;
  unitLevels: Record<TribeId, number>;
  completedQuests: string[];
  caravan: CaravanSave | null;
  shadowTempleRevealed: boolean;
  finaleRevealed: boolean;
  lastTickAt: number;
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
  level: number;
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  critChance: number;
  aoe: number;
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
