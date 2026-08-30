import type { QuestDefinition } from "../core/types";
import { availableQuests } from "../data/quests";

export class QuestManager {
  completed: string[];

  constructor(completed: string[] = []) {
    this.completed = [...completed];
  }

  open(level: number): QuestDefinition[] {
    return availableQuests(level, this.completed);
  }

  complete(id: string): QuestDefinition | null {
    const quest = availableQuests(Number.MAX_SAFE_INTEGER, []).find((entry) => entry.id === id);
    if (!quest || this.completed.includes(id)) return null;
    this.completed.push(id);
    return quest;
  }
}
