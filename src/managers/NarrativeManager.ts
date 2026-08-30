import { FINALE_LEVEL, SHADOW_TEMPLE_LEVEL, type Atmosphere, type ScrollFragment } from "../core/types";
import { FINALE_DIALOGUE, SHADOW_TEMPLE_DIALOGUE } from "../data/dialogues";
import { SCROLLS, atmosphereForLevel, scrollForLevel } from "../data/scrolls";
import { SIDE_TRIBES } from "../data/sideTribes";

export interface Palette {
  sky: string;
  fog: number;
  fogDensity: number;
  ambient: number;
  torch: number;
  bloom: number;
  music: "overture" | "suspicion" | "shadow" | "reckoning";
}

export class NarrativeManager {
  collected: number[];
  shadowTempleRevealed: boolean;
  finaleRevealed: boolean;

  constructor(collected: number[] = [], shadow = false, finale = false) {
    this.collected = [...new Set(collected)].sort((a, b) => a - b);
    this.shadowTempleRevealed = shadow;
    this.finaleRevealed = finale;
  }

  collect(level: number): ScrollFragment | null {
    const scroll = scrollForLevel(level);
    if (!scroll || this.collected.includes(level)) return null;
    this.collected.push(level);
    this.collected.sort((a, b) => a - b);
    if (level >= SHADOW_TEMPLE_LEVEL) this.shadowTempleRevealed = true;
    if (level >= FINALE_LEVEL) this.finaleRevealed = true;
    return scroll;
  }

  knownScrolls(): ScrollFragment[] {
    return this.collected
      .map((level) => scrollForLevel(level))
      .filter((scroll): scroll is ScrollFragment => Boolean(scroll));
  }

  lockedCount(): number {
    return SCROLLS.length - this.collected.length;
  }

  atmosphere(level: number): Atmosphere {
    return atmosphereForLevel(level);
  }

  palette(level: number): Palette {
    if (level >= FINALE_LEVEL || this.finaleRevealed) {
      return {
        sky: "#1a1024",
        fog: 0x2a1240,
        fogDensity: 0.042,
        ambient: 0x3a2060,
        torch: 0xff6633,
        bloom: 1.35,
        music: "reckoning",
      };
    }
    if (level >= SHADOW_TEMPLE_LEVEL || this.shadowTempleRevealed) {
      return {
        sky: "#241428",
        fog: 0x3b1850,
        fogDensity: 0.034,
        ambient: 0x4a2870,
        torch: 0xff8844,
        bloom: 1.15,
        music: "shadow",
      };
    }
    if (level >= 10) {
      return {
        sky: "#4a2a38",
        fog: 0x6a3a40,
        fogDensity: 0.022,
        ambient: 0x6a4030,
        torch: 0xffaa55,
        bloom: 0.85,
        music: "suspicion",
      };
    }
    return {
      sky: "#6a3a2c",
      fog: 0x8a5a40,
      fogDensity: 0.016,
      ambient: 0x7a5040,
      torch: 0xffcc66,
      bloom: 0.7,
      music: "overture",
    };
  }

  triggerLines(level: number) {
    if (level === FINALE_LEVEL) return FINALE_DIALOGUE;
    if (level === SHADOW_TEMPLE_LEVEL) return SHADOW_TEMPLE_DIALOGUE;
    const tribe = SIDE_TRIBES.find((entry) => entry.unlockLevel === level);
    if (!tribe) return [];
    return [
      { speaker: "narrator" as const, text: `Sis çekiliyor: ${tribe.name} belirdi.` },
      { speaker: "npc" as const, text: tribe.memory },
      { speaker: "narrator" as const, text: tribe.clue },
    ];
  }
}
