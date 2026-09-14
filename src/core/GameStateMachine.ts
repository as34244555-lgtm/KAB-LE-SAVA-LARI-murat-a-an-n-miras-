import type { GamePhase } from "./types";

const TRANSITIONS: Record<GamePhase, GamePhase[]> = {
  boot: ["intro", "menu", "pick"],
  intro: ["menu", "pick"],
  menu: ["intro", "pick", "map", "build", "loading"],
  pick: ["map", "build", "menu"],
  loading: ["map", "build", "menu"],
  map: ["battle", "menu", "pick", "build"],
  build: ["battle", "menu", "pick", "map"],
  battle: ["map", "build", "menu"],
};

export class GameStateMachine {
  private phase: GamePhase = "boot";
  private readonly history: GamePhase[] = ["boot"];

  get current(): GamePhase {
    return this.phase;
  }

  canEnter(next: GamePhase): boolean {
    return TRANSITIONS[this.phase].includes(next);
  }

  enter(next: GamePhase): GamePhase {
    if (next === this.phase) return this.phase;
    if (!this.canEnter(next)) throw new Error(`Geçersiz durum geçişi: ${this.phase} → ${next}`);
    this.phase = next;
    this.history.push(next);
    return this.phase;
  }

  force(next: GamePhase): GamePhase {
    this.phase = next;
    this.history.push(next);
    return this.phase;
  }

  trail(): readonly GamePhase[] {
    return this.history;
  }
}
