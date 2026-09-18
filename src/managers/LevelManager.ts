import {
  FINALE_LEVEL,
  MAX_PLAYER_LEVEL,
  SHADOW_TEMPLE_LEVEL,
  SIDE_TRIBE_INTERVAL,
  type Atmosphere,
  type LevelUpResult,
} from "../core/types";
import { atmosphereForLevel, scrollForLevel } from "../data/scrolls";
import { sideTribeForLevel } from "../data/sideTribes";

export function xpToNextLevel(level: number): number {
  if (level >= MAX_PLAYER_LEVEL) return Number.POSITIVE_INFINITY;
  return Math.round(24 + level * 15 + Math.pow(level, 1.08) * 2);
}

export class LevelManager {
  constructor(
    private level: number,
    private xp: number,
  ) {
    this.level = clampLevel(level);
    this.xp = Math.max(0, xp);
  }

  get currentLevel(): number {
    return this.level;
  }

  get currentXp(): number {
    return this.xp;
  }

  get progress(): number {
    const need = xpToNextLevel(this.level);
    if (!Number.isFinite(need)) return 1;
    return Math.min(1, this.xp / need);
  }

  get atmosphere(): Atmosphere {
    return atmosphereForLevel(this.level);
  }

  /** Hiçbir bina veya asker seviyesi oyuncu seviyesini geçemez. */
  capFor(entityLevel: number): number {
    return Math.min(entityLevel, this.level);
  }

  canUpgradeTo(nextLevel: number): boolean {
    return nextLevel <= this.level && nextLevel <= MAX_PLAYER_LEVEL;
  }

  addXp(amount: number): LevelUpResult[] {
    if (amount <= 0 || this.level >= MAX_PLAYER_LEVEL) return [];
    this.xp += amount;
    const gained: LevelUpResult[] = [];
    while (this.level < MAX_PLAYER_LEVEL && this.xp >= xpToNextLevel(this.level)) {
      this.xp -= xpToNextLevel(this.level);
      this.level += 1;
      gained.push(this.describeLevel(this.level));
    }
    if (this.level >= MAX_PLAYER_LEVEL) this.xp = 0;
    return gained;
  }

  describeLevel(level: number): LevelUpResult {
    const unlocked = level % SIDE_TRIBE_INTERVAL === 0 ? sideTribeForLevel(level) ?? null : null;
    return {
      newLevel: level,
      scroll: scrollForLevel(level) ?? null,
      unlockedSideTribe: unlocked,
      shadowTempleUnlocked: level === SHADOW_TEMPLE_LEVEL,
      finaleUnlocked: level === FINALE_LEVEL,
      atmosphere: atmosphereForLevel(level),
    };
  }

  snapshot(): { playerLevel: number; xp: number } {
    return { playerLevel: this.level, xp: this.xp };
  }
}

export function clampLevel(level: number): number {
  return Math.max(1, Math.min(MAX_PLAYER_LEVEL, Math.floor(level)));
}

export function isNarrativeBeat(level: number): "shadow" | "finale" | "side" | null {
  if (level === SHADOW_TEMPLE_LEVEL) return "shadow";
  if (level === FINALE_LEVEL) return "finale";
  if (level % SIDE_TRIBE_INTERVAL === 0) return "side";
  return null;
}
