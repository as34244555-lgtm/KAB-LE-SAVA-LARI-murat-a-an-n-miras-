import { AdsManager } from "../managers/AdsManager";
import { EconomyManager } from "../managers/EconomyManager";
import { LevelManager } from "../managers/LevelManager";
import { NarrativeManager } from "../managers/NarrativeManager";
import { QuestManager } from "../managers/QuestManager";
import { SaveManager, emptySave } from "../managers/SaveManager";
import { CaravanSystem } from "../economy/CaravanSystem";
import { Soundtrack } from "../audio/Soundtrack";
import { enemyArmy, resolveBattle, scaleUnit } from "../units/CombatResolver";
import { unitCost, unitUpgradeDiamond } from "../units/Unit";
import { BUILDINGS } from "../data/buildings";
import { SIDE_TRIBES } from "../data/sideTribes";
import { TRIBES } from "../data/tribes";
import { dialogueForTribe } from "../data/dialogues";
import type { BattleParticipant, BattleResult, BuildingId, PlayerSave, TribeId } from "./types";
import { GameStateMachine } from "./GameStateMachine";
import { bus } from "./EventBus";

export class Game {
  readonly state = new GameStateMachine();
  readonly saveIo = new SaveManager();
  readonly ads = new AdsManager(true);
  readonly audio = new Soundtrack();
  levels: LevelManager;
  economy: EconomyManager;
  narrative: NarrativeManager;
  quests: QuestManager;
  caravan: CaravanSystem;
  data: PlayerSave;
  lastBattle: BattleResult | null = null;
  lastEnemy: BattleParticipant | null = null;
  toast = "";

  constructor(data: PlayerSave = emptySave()) {
    this.data = data;
    this.levels = new LevelManager(data.playerLevel, data.xp);
    this.economy = new EconomyManager(data.gold, data.diamond);
    this.narrative = new NarrativeManager(data.collectedScrolls, data.shadowTempleRevealed, data.finaleRevealed);
    this.quests = new QuestManager(data.completedQuests);
    this.caravan = new CaravanSystem(data.caravan);
  }

  hydrate() {
    this.syncFromManagers();
    bus.emit("save", this.data);
  }

  async bootFromDisk(): Promise<boolean> {
    const loaded = await this.saveIo.load();
    if (!loaded) return false;
    this.data = loaded;
    this.levels = new LevelManager(loaded.playerLevel, loaded.xp);
    this.economy = new EconomyManager(loaded.gold, loaded.diamond);
    this.narrative = new NarrativeManager(loaded.collectedScrolls, loaded.shadowTempleRevealed, loaded.finaleRevealed);
    this.quests = new QuestManager(loaded.completedQuests);
    this.caravan = new CaravanSystem(loaded.caravan);
    return true;
  }

  newGame() {
    this.data = emptySave();
    this.levels = new LevelManager(1, 0);
    this.economy = new EconomyManager(220, 6);
    this.narrative = new NarrativeManager([1], false, false);
    this.quests = new QuestManager();
    this.caravan = new CaravanSystem();
    this.lastBattle = null;
    this.hydrate();
  }

  tick(dtMs: number) {
    const produced = this.economy.produce(this.data.buildingLevels, dtMs / 1000);
    if (produced > 0) this.data.gold = this.economy.gold;
    const caravan = this.caravan.tick(dtMs);
    if (caravan?.arrived) {
      if (caravan.raid) {
        this.toast = "Kervan düzdayken haydutlar çıktı! Taş-kâğıt-makas savaşı başlıyor.";
        this.startRaid();
      } else {
        this.economy.grant("gold", caravan.goldReturn);
        this.toast = `Kervan ${caravan.goldReturn} altınla döndü. Yol, Murat Ağa'nın eski dostlarını hatırlattı.`;
        this.gainXp(18);
      }
    }
    this.syncFromManagers();
  }

  buildOrUpgrade(id: BuildingId): string {
    const def = BUILDINGS.find((building) => building.id === id);
    if (!def) return "Bilinmeyen yapı.";
    if (id === "shadowTemple" && !this.narrative.shadowTempleRevealed) {
      return "Gölge Tapınağı henüz sisin ardında.";
    }
    const current = this.data.buildingLevels[id] ?? 0;
    const cost = this.economy.buildCost(id, current, this.levels);
    if (!cost) return `Gelişim limiti: yapı seviyesi oyuncu seviyesini (${this.levels.currentLevel}) geçemez.`;
    if (!this.economy.canAfford("gold", cost.gold) || (cost.diamond > 0 && !this.economy.canAfford("diamond", cost.diamond))) {
      return "Kesede yeterince altın veya elmas yok.";
    }
    this.economy.spend("gold", cost.gold);
    if (cost.diamond) this.economy.spend("diamond", cost.diamond);
    this.data.buildingLevels[id] = current + 1;
    this.gainXp(12);
    this.maybeComplete("q-yas-atesi");
    this.syncFromManagers();
    return current === 0 ? `${def.name} kuruldu. ${def.lore}` : `${def.name} seviye ${current + 1}. ${def.lore}`;
  }

  train(tribe: TribeId): string {
    if (tribe === "player") return "Vâris eğitilmez; vâris hatırlar.";
    const level = this.levels.capFor(this.data.unitLevels[tribe] ?? 1);
    const cost = unitCost(tribe, level);
    if (!this.economy.spend("gold", cost)) return "Asker bakiyesi yetmedi.";
    this.data.army[tribe] += 1;
    this.gainXp(8);
    this.maybeComplete("q-aslan-kalkani");
    this.syncFromManagers();
    return `${TRIBES[tribe].name} saflarına bir birim katıldı.`;
  }

  upgradeUnit(tribe: TribeId): string {
    const next = (this.data.unitLevels[tribe] ?? 1) + 1;
    if (!this.levels.canUpgradeTo(next)) {
      return `Asker seviyesi oyuncu seviyesini geçemez.`;
    }
    const cost = unitUpgradeDiamond(this.data.unitLevels[tribe] ?? 1);
    if (!this.economy.spend("diamond", cost)) return "Elmas yetmedi. Nadir mührü reklam veya zaferle kazan.";
    this.data.unitLevels[tribe] = next;
    this.gainXp(10);
    this.syncFromManagers();
    return `${TRIBES[tribe].name} birimleri seviye ${next}.`;
  }

  sendCaravan(): string {
    if ((this.data.buildingLevels.caravanserai ?? 0) <= 0) return "Önce Kervansaray'ı kur.";
    if (this.caravan.busy) return "Kervan hâlâ yolda.";
    const stake = Math.min(80, Math.max(25, Math.floor(this.economy.gold * 0.18)));
    if (!this.economy.spend("gold", stake)) return "Kervan için altın yok.";
    const dest = this.unlockedTribes()[0]?.name ?? "Tuz Yolu";
    this.caravan.depart(dest, stake);
    this.maybeComplete("q-ruzgar-izi");
    this.syncFromManagers();
    return `${dest} yoluna ${stake} altınlık kervan çıktı. Düzdayken haydut baskını olabilir.`;
  }

  fight(tribe: TribeId): BattleResult {
    const player = (["sariklilar", "gokhanli", "demirhisar"] as TribeId[]).map((id) =>
      scaleUnit(id, this.data.army[id], this.data.unitLevels[id], this.levels),
    );
    const enemy = enemyArmy(this.levels.currentLevel, tribe, this.levels);
    const result = resolveBattle(player, enemy);
    this.lastBattle = result;
    this.lastEnemy = enemy;
    this.economy.grant("gold", result.goldLoot);
    this.gainXp(result.xpReward);
    if (result.winner === "player") this.maybeComplete("q-aslan-kalkani");
    this.syncFromManagers();
    return result;
  }

  startRaid() {
    const foes: TribeId[] = ["sariklilar", "gokhanli", "demirhisar"];
    const pick = foes[Math.floor(Math.random() * foes.length)];
    this.fight(pick);
  }

  talk(tribe: TribeId) {
    return dialogueForTribe(tribe, this.levels.currentLevel);
  }

  completeQuest(id: string): string {
    const quest = this.quests.complete(id);
    if (!quest) return "Bu görev zaten mühürlendi.";
    this.economy.grant("gold", quest.goldReward);
    this.economy.grant("diamond", quest.diamondReward);
    this.gainXp(quest.xpReward);
    this.syncFromManagers();
    return `${quest.title} tamam. ${quest.memoryOfMurat}`;
  }

  async watchAd(kind: "fast_production" | "diamond" | "caravan_speed"): Promise<string> {
    const reward = await this.ads.watch(kind);
    if (!reward) return "Reklam köprüsü yanıt vermedi.";
    if (reward.ticks) this.economy.produce(this.data.buildingLevels, reward.ticks);
    if (reward.diamond) this.economy.grant("diamond", reward.diamond);
    if (reward.caravanMsSaved) this.caravan.speedUp(reward.caravanMsSaved);
    this.syncFromManagers();
    return kind === "diamond"
      ? "Elmas mührü kese düştü. Nadir yükseltmeler için sakla."
      : kind === "caravan_speed"
        ? "Kervan rüzgâr aldı — yol kısaldı."
        : "Ocaklar hızlandı. Altın, yas gününde bile akar.";
  }

  unlockedTribes() {
    return SIDE_TRIBES.filter((tribe) => tribe.unlockLevel <= this.levels.currentLevel);
  }

  gainXp(amount: number) {
    const ups = this.levels.addXp(amount);
    for (const up of ups) {
      const scroll = this.narrative.collect(up.newLevel);
      if (up.unlockedSideTribe && !this.data.discoveredSideTribes.includes(up.unlockedSideTribe.id)) {
        this.data.discoveredSideTribes.push(up.unlockedSideTribe.id);
      }
      if (up.shadowTempleUnlocked) {
        this.narrative.shadowTempleRevealed = true;
        this.toast = "Kırılma noktası: Gölge Tapınağı sisin içinden doğdu. Müzik ve renkler karardı.";
      }
      if (up.finaleUnlocked) {
        this.narrative.finaleRevealed = true;
        this.toast = "Final: Gölge Elçisi ifşa oldu. Miras, birliktir.";
      }
      bus.emit("levelup", { ...up, scroll });
    }
    this.syncFromManagers();
    return ups;
  }

  /** Tasarım / doğrulama: anlatı tetikleyicilerini atlamadan seviye verir. */
  debugSetLevel(level: number) {
    while (this.levels.currentLevel < level) {
      this.gainXp(10_000);
    }
  }

  async persist() {
    this.syncFromManagers();
    await this.saveIo.persist(this.data);
  }

  private maybeComplete(id: string) {
    if (this.quests.open(this.levels.currentLevel).some((quest) => quest.id === id)) {
      this.completeQuest(id);
    }
  }

  private syncFromManagers() {
    this.data.playerLevel = this.levels.currentLevel;
    this.data.xp = this.levels.currentXp;
    this.data.gold = this.economy.gold;
    this.data.diamond = this.economy.diamond;
    this.data.collectedScrolls = this.narrative.collected;
    this.data.shadowTempleRevealed = this.narrative.shadowTempleRevealed;
    this.data.finaleRevealed = this.narrative.finaleRevealed;
    this.data.completedQuests = this.quests.completed;
    this.data.caravan = this.caravan.current;
    this.data.lastTickAt = Date.now();
  }
}
