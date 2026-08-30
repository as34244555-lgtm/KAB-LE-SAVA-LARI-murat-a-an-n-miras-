import type { PlayerSave } from "../core/types";
import { generateWorld } from "../data/hexMap";
import { defaultDiplomacy } from "../data/roster";
import { startBag } from "./EconomyManager";

const STORAGE_KEY = "ksmam.save.v2";
const SECRET = "murat-aga-mirasi-v1";

export function emptySave(playerName = "Kabile Lideri"): PlayerSave {
  return {
    version: 2,
    playerName,
    chosenTribe: null,
    playerLevel: 1,
    xp: 0,
    diamond: 6,
    resources: startBag(),
    tiles: generateWorld("gokhanli"),
    army: 4,
    roster: {},
    unitLevel: 1,
    collectedScrolls: [1],
    discoveredSideTribes: [],
    completedQuests: [],
    caravan: null,
    shadowTempleRevealed: false,
    finaleRevealed: false,
    lastTickAt: Date.now(),
    selectedHex: null,
    diplomacy: defaultDiplomacy(),
    visitedLandmarks: [],
    lastDailyAt: Math.floor(Date.now() / 86_400_000),
    buildingLevels: {
      goldMine: 0,
      barracks: 0,
      forge: 0,
      caravanserai: 0,
      scrollTower: 0,
      shadowTemple: 0,
    },
  };
}

export async function encryptPayload(plain: string): Promise<string> {
  if (globalThis.crypto?.subtle) {
    const key = await deriveKey();
    const iv = globalThis.crypto.getRandomValues(new Uint8Array(12));
    const encoded = new TextEncoder().encode(plain);
    const cipher = await globalThis.crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, encoded);
    return `gcm.${bufferToB64(iv)}.${bufferToB64(new Uint8Array(cipher))}`;
  }
  return `xor.${xorEncode(plain)}`;
}

export async function decryptPayload(payload: string): Promise<string> {
  if (payload.startsWith("gcm.") && globalThis.crypto?.subtle) {
    const [, ivB64, dataB64] = payload.split(".");
    const key = await deriveKey();
    const iv = copyBytes(b64ToBytes(ivB64));
    const data = copyBytes(b64ToBytes(dataB64));
    const plain = await globalThis.crypto.subtle.decrypt(
      { name: "AES-GCM", iv: iv as BufferSource },
      key,
      data as BufferSource,
    );
    return new TextDecoder().decode(plain);
  }
  if (payload.startsWith("xor.")) return xorDecode(payload.slice(4));
  throw new Error("Bozuk kayıt zarfı");
}

export class SaveManager {
  async persist(save: PlayerSave): Promise<void> {
    const sealed = await encryptPayload(JSON.stringify(save));
    if (typeof localStorage !== "undefined") localStorage.setItem(STORAGE_KEY, sealed);
  }

  async load(): Promise<PlayerSave | null> {
    if (typeof localStorage === "undefined") return null;
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    try {
      const parsed = JSON.parse(await decryptPayload(raw)) as PlayerSave;
      if (parsed.version !== 2 || !parsed.resources || !parsed.tiles) return null;
      return migrateSave(parsed);
    } catch {
      return null;
    }
  }

  clear() {
    if (typeof localStorage !== "undefined") localStorage.removeItem(STORAGE_KEY);
  }
}

export function migrateSave(save: PlayerSave): PlayerSave {
  save.roster ??= {};
  save.diplomacy ??= defaultDiplomacy();
  save.visitedLandmarks ??= [];
  save.lastDailyAt ??= 0;
  return save;
}

async function deriveKey(): Promise<CryptoKey> {
  const material = await globalThis.crypto.subtle.importKey("raw", new TextEncoder().encode(SECRET), "PBKDF2", false, ["deriveKey"]);
  return globalThis.crypto.subtle.deriveKey(
    { name: "PBKDF2", salt: new TextEncoder().encode("kanli-taht"), iterations: 120_000, hash: "SHA-256" },
    material,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"],
  );
}

function xorEncode(value: string): string {
  const bytes = new TextEncoder().encode(value);
  const key = new TextEncoder().encode(SECRET);
  return bufferToB64(bytes.map((byte, index) => byte ^ key[index % key.length]));
}

function xorDecode(value: string): string {
  const bytes = b64ToBytes(value);
  const key = new TextEncoder().encode(SECRET);
  return new TextDecoder().decode(bytes.map((byte, index) => byte ^ key[index % key.length]));
}

function bufferToB64(bytes: Uint8Array): string {
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

function b64ToBytes(value: string): Uint8Array {
  return Uint8Array.from(atob(value), (char) => char.charCodeAt(0));
}

function copyBytes(bytes: Uint8Array): Uint8Array {
  const copy = new Uint8Array(bytes.byteLength);
  copy.set(bytes);
  return copy;
}
