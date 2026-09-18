/**
 * Google AdMob Rewarded Ads şablonu.
 * Web/dev ortamında güvenli bir sahte (stub) ödül akar.
 * Native (Capacitor/Cordova) katmanında `window.admob` köprüsü beklenir.
 */

export type RewardKind = "fast_production" | "diamond" | "caravan_speed";

export interface RewardGrant {
  kind: RewardKind;
  gold?: number;
  diamond?: number;
  ticks?: number;
  caravanMsSaved?: number;
}

export interface AdMobBridge {
  isReady(): Promise<boolean>;
  showRewarded(placement: string): Promise<boolean>;
}

declare global {
  interface Window {
    admob?: AdMobBridge;
  }
}

const PLACEMENTS: Record<RewardKind, string> = {
  fast_production: "ca-app-pub-xxxxxxxx/fast-prod",
  diamond: "ca-app-pub-xxxxxxxx/diamond",
  caravan_speed: "ca-app-pub-xxxxxxxx/caravan",
};

export class AdsManager {
  constructor(private readonly mock: boolean = true) {}

  async isAvailable(): Promise<boolean> {
    if (this.mock) return true;
    return Boolean(await globalThis.window?.admob?.isReady());
  }

  async watch(kind: RewardKind): Promise<RewardGrant | null> {
    const ready = await this.isAvailable();
    if (!ready) return null;
    const shown = this.mock
      ? true
      : Boolean(await globalThis.window?.admob?.showRewarded(PLACEMENTS[kind]));
    if (!shown) return null;
    return grantFor(kind);
  }
}

export function grantFor(kind: RewardKind): RewardGrant {
  switch (kind) {
    case "fast_production":
      return { kind, ticks: 45, gold: 0 };
    case "diamond":
      return { kind, diamond: 2 };
    case "caravan_speed":
      return { kind, caravanMsSaved: 20_000 };
  }
}
