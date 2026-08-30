import type { SideTribe } from "../core/types";

/** Hikâye taşları — yan kabile / tapınak / Elçi kalesi. */
export type LandmarkKind = "side" | "temple" | "finale";

export interface LandmarkDef {
  q: number;
  r: number;
  kind: LandmarkKind;
  title: string;
  /** Yan kabile ise SIDE_TRIBES.id */
  sideId?: string;
  unlockLevel: number;
  questId?: string;
}

export const LANDMARKS: LandmarkDef[] = [
  { q: -4, r: -6, kind: "side", sideId: "korsanlar", title: "Tuz Korsanları", unlockLevel: 10, questId: "q-korsan-fener" },
  { q: 8, r: 5, kind: "side", sideId: "mogollar", title: "Bozkır Moğolları", unlockLevel: 20, questId: "q-tuz-hakki" },
  { q: -9, r: 7, kind: "side", sideId: "gocebeler", title: "Kum Göçebeleri", unlockLevel: 30, questId: "q-su-ismi" },
  { q: 0, r: 10, kind: "temple", sideId: "suikastcilar", title: "Gölge Tapınağı", unlockLevel: 40, questId: "q-gercegi-satinalma" },
  { q: 11, r: -8, kind: "side", sideId: "denizciler", title: "İnci Denizcileri", unlockLevel: 50, questId: "q-islak-taht" },
  { q: -12, r: -2, kind: "side", sideId: "colyildizlari", title: "Çöl Yıldızları", unlockLevel: 60 },
  { q: 6, r: -11, kind: "side", sideId: "dagkartallari", title: "Dağ Kartalları", unlockLevel: 70, questId: "q-dortuncu-muhur" },
  { q: -2, r: 14, kind: "side", sideId: "buzmuhafizlari", title: "Buz Muhafızları", unlockLevel: 80 },
  { q: 14, r: 3, kind: "side", sideId: "eskiyeminliler", title: "Eski Yeminliler", unlockLevel: 90, questId: "q-en-yakin" },
  { q: 3, r: 16, kind: "finale", sideId: "golge-elcisi", title: "Elçi Kalesi", unlockLevel: 100, questId: "q-miras" },
];

export function landmarkKey(q: number, r: number): string {
  return `${q},${r}`;
}

export function landmarkAt(q: number, r: number): LandmarkDef | undefined {
  return LANDMARKS.find((item) => item.q === q && item.r === r);
}

export function allLandmarkCoords(): { q: number; r: number }[] {
  return LANDMARKS.map((item) => ({ q: item.q, r: item.r }));
}

export function landmarkGarrison(def: LandmarkDef): number {
  if (def.kind === "finale") return 24;
  if (def.kind === "temple") return 16;
  return 6 + Math.floor(def.unlockLevel / 10);
}

export function questForLandmark(def: LandmarkDef): string | undefined {
  return def.questId;
}

export function sideMatches(def: LandmarkDef, tribe: SideTribe): boolean {
  return Boolean(def.sideId && def.sideId === tribe.id);
}
