import type { PlayableTribe } from "./core/types";
import { TRIBES, UNITS } from "./data/tribes";
import { BUILDINGS } from "./data/buildings";
import { SCROLLS } from "./data/scrolls";
import { QUESTS } from "./data/quests";
import { SIDE_TRIBES } from "./data/sideTribes";
import { LANDMARKS, landmarkGarrison } from "./data/landmarks";
import { HALLS, generateWorld } from "./data/hexMap";
import {
  FINALE_DIALOGUE,
  OPENING_CRAWL,
  SHADOW_TEMPLE_DIALOGUE,
  TRIBE_DIALOGUES,
} from "./data/dialogues";

export interface UnrealTableBundle {
  name: string;
  csv: string;
  json: string;
  rowCount: number;
}

function csvEscape(value: string | number | boolean | null | undefined): string {
  const raw = value === null || value === undefined ? "" : String(value);
  if (raw.includes('"') || raw.includes(",") || raw.includes("\n") || raw.includes("\r")) {
    return `"${raw.replace(/"/g, '""')}"`;
  }
  return raw;
}

export function toUnrealCsv(
  headers: string[],
  rows: Array<Array<string | number | boolean | null | undefined>>,
): string {
  const lines = [headers.map(csvEscape).join(",")];
  for (const row of rows) {
    lines.push(row.map(csvEscape).join(","));
  }
  return `${lines.join("\n")}\n`;
}

export function generateUnrealTables(): UnrealTableBundle[] {
  const tables: UnrealTableBundle[] = [];

  const tribeEntries = Object.values(TRIBES);
  tables.push({
    name: "DT_Tribes",
    rowCount: tribeEntries.length,
    csv: toUnrealCsv(
      [
        "---",
        "Id",
        "Name",
        "Epithet",
        "Temperament",
        "PrimaryColorHex",
        "SecondaryColorHex",
        "AccentColorHex",
        "UnitClass",
        "CombatRole",
        "BeatsTribe",
        "LosesToTribe",
        "AccusesTribe",
        "Accusation",
        "Voice",
      ],
      tribeEntries.map((t) => [
        t.id,
        t.id,
        t.name,
        t.epithet,
        t.temperament,
        t.colors.primary,
        t.colors.secondary,
        t.colors.accent,
        t.combat.class,
        t.combat.role,
        t.combat.beats ?? "",
        t.combat.losesTo ?? "",
        t.accuses ?? "",
        t.accusation,
        t.voice,
      ]),
    ),
    json: `${JSON.stringify(tribeEntries, null, 2)}\n`,
  });

  tables.push({
    name: "DT_Units",
    rowCount: UNITS.length,
    csv: toUnrealCsv(
      [
        "---",
        "Id",
        "Tribe",
        "Name",
        "UnitClass",
        "Lore",
        "BaseCost",
        "BaseHp",
        "BaseAttack",
        "BaseDefense",
        "CritChance",
        "Aoe",
      ],
      UNITS.map((u) => [
        u.id,
        u.id,
        u.tribe,
        u.name,
        u.unitClass,
        u.lore,
        u.baseCost,
        u.baseHp,
        u.baseAttack,
        u.baseDefense,
        u.critChance,
        u.aoe,
      ]),
    ),
    json: `${JSON.stringify(UNITS, null, 2)}\n`,
  });

  tables.push({
    name: "DT_Buildings",
    rowCount: BUILDINGS.length,
    csv: toUnrealCsv(
      ["---", "Id", "Name", "Lore", "BaseGoldCost", "BaseDiamondUpgrade", "GoldPerTick", "UnlockLevel"],
      BUILDINGS.map((b) => [
        b.id,
        b.id,
        b.name,
        b.lore,
        b.baseGoldCost,
        b.baseDiamondUpgrade,
        b.goldPerTick,
        b.unlockLevel,
      ]),
    ),
    json: `${JSON.stringify(BUILDINGS, null, 2)}\n`,
  });

  tables.push({
    name: "DT_Scrolls",
    rowCount: SCROLLS.length,
    csv: toUnrealCsv(
      ["---", "Level", "Title", "Body", "Misdirection", "Tone"],
      SCROLLS.map((s) => [`Scroll_${s.level}`, s.level, s.title, s.body, s.misdirection, s.tone]),
    ),
    json: `${JSON.stringify(SCROLLS, null, 2)}\n`,
  });

  tables.push({
    name: "DT_Quests",
    rowCount: QUESTS.length,
    csv: toUnrealCsv(
      [
        "---",
        "Id",
        "Title",
        "Giver",
        "UnlockLevel",
        "MemoryOfMurat",
        "Objective",
        "GoldReward",
        "XpReward",
        "DiamondReward",
      ],
      QUESTS.map((q) => [
        q.id,
        q.id,
        q.title,
        q.giver,
        q.unlockLevel,
        q.memoryOfMurat,
        q.objective,
        q.goldReward,
        q.xpReward,
        q.diamondReward,
      ]),
    ),
    json: `${JSON.stringify(QUESTS, null, 2)}\n`,
  });

  tables.push({
    name: "DT_SideTribes",
    rowCount: SIDE_TRIBES.length,
    csv: toUnrealCsv(
      ["---", "Id", "UnlockLevel", "Name", "Relation", "Memory", "Clue", "bIsShadowCult"],
      SIDE_TRIBES.map((st) => [
        st.id,
        st.id,
        st.unlockLevel,
        st.name,
        st.relation,
        st.memory,
        st.clue,
        st.isShadowCult,
      ]),
    ),
    json: `${JSON.stringify(SIDE_TRIBES, null, 2)}\n`,
  });

  tables.push({
    name: "DT_Landmarks",
    rowCount: LANDMARKS.length,
    csv: toUnrealCsv(
      ["---", "Q", "R", "Kind", "SideId", "Title", "UnlockLevel", "QuestId", "Garrison"],
      LANDMARKS.map((lm, index) => [
        `Landmark_${index + 1}_${lm.sideId ?? lm.kind}`,
        lm.q,
        lm.r,
        lm.kind,
        lm.sideId ?? "",
        lm.title,
        lm.unlockLevel,
        lm.questId ?? "",
        landmarkGarrison(lm),
      ]),
    ),
    json: `${JSON.stringify(
      LANDMARKS.map((lm) => ({ ...lm, garrison: landmarkGarrison(lm) })),
      null,
      2,
    )}\n`,
  });

  const hallRows: Array<{
    rowName: string;
    tribe: PlayableTribe;
    q: number;
    r: number;
    isCapital: boolean;
    label: string;
  }> = [];
  for (const tribe of Object.keys(HALLS) as PlayableTribe[]) {
    HALLS[tribe].forEach((coord, idx) => {
      const isCapital = idx === 0;
      hallRows.push({
        rowName: `${tribe}_${isCapital ? "capital" : `outpost_${idx}`}`,
        tribe,
        q: coord.q,
        r: coord.r,
        isCapital,
        label: `${TRIBES[tribe].name} ${isCapital ? "merkezi" : "karakolu"}`,
      });
    });
  }

  tables.push({
    name: "DT_Halls",
    rowCount: hallRows.length,
    csv: toUnrealCsv(
      ["---", "Tribe", "Q", "R", "bIsCapital", "Label"],
      hallRows.map((h) => [h.rowName, h.tribe, h.q, h.r, h.isCapital, h.label]),
    ),
    json: `${JSON.stringify(hallRows, null, 2)}\n`,
  });

  const dialogueRows: Array<{
    rowName: string;
    group: string;
    speaker: string;
    text: string;
    barb: string;
  }> = [];
  OPENING_CRAWL.forEach((line, idx) => {
    dialogueRows.push({
      rowName: `opening_${idx + 1}`,
      group: "opening",
      speaker: line.speaker,
      text: line.text,
      barb: line.barb ?? "",
    });
  });
  for (const tribe of ["sariklilar", "gokhanli", "demirhisar"] as const) {
    TRIBE_DIALOGUES[tribe].forEach((line, idx) => {
      dialogueRows.push({
        rowName: `${tribe}_${idx + 1}`,
        group: tribe,
        speaker: line.speaker,
        text: line.text,
        barb: line.barb ?? "",
      });
    });
  }
  SHADOW_TEMPLE_DIALOGUE.forEach((line, idx) => {
    dialogueRows.push({
      rowName: `shadow_temple_${idx + 1}`,
      group: "shadow_temple",
      speaker: line.speaker,
      text: line.text,
      barb: line.barb ?? "",
    });
  });
  FINALE_DIALOGUE.forEach((line, idx) => {
    dialogueRows.push({
      rowName: `finale_${idx + 1}`,
      group: "finale",
      speaker: line.speaker,
      text: line.text,
      barb: line.barb ?? "",
    });
  });

  tables.push({
    name: "DT_Dialogues",
    rowCount: dialogueRows.length,
    csv: toUnrealCsv(
      ["---", "Group", "Speaker", "Text", "Barb"],
      dialogueRows.map((d) => [d.rowName, d.group, d.speaker, d.text, d.barb]),
    ),
    json: `${JSON.stringify(dialogueRows, null, 2)}\n`,
  });

  const sampleWorld = generateWorld("sariklilar");
  tables.push({
    name: "DT_HexWorldSeed",
    rowCount: sampleWorld.length,
    csv: toUnrealCsv(
      ["---", "Id", "Q", "R", "Biome", "Owner", "Slot", "Level", "Garrison", "Label", "Landmark", "SideId"],
      sampleWorld.map((tile) => [
        `Hex_${tile.q}_${tile.r}`,
        tile.id,
        tile.q,
        tile.r,
        tile.biome,
        tile.owner,
        tile.slot ?? "",
        tile.level,
        tile.garrison,
        tile.label,
        tile.landmark ?? "",
        tile.sideId ?? "",
      ]),
    ),
    json: `${JSON.stringify(sampleWorld, null, 2)}\n`,
  });

  return tables;
}
