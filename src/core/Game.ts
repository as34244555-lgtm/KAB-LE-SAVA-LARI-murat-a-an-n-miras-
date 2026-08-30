import type {
  BattleParticipant,
  BattleResult,
  BattleStance,
  BuildingSlot,
  DockPanel,
  HexTile,
  PlayableTribe,
  ResourceBag,
  ResourceId,
  TribeId,
} from "./types";
import { GameStateMachine } from "./GameStateMachine";
import { SaveManager, emptySave, migrateSave } from "../managers/SaveManager";
import { EconomyManager } from "../managers/EconomyManager";
import { LevelManager } from "../managers/LevelManager";
import { NarrativeManager } from "../managers/NarrativeManager";
import { QuestManager } from "../managers/QuestManager";
import { AdsManager, type RewardKind } from "../managers/AdsManager";
import { CaravanSystem } from "../economy/CaravanSystem";
import { Soundtrack } from "../audio/Soundtrack";
import { EXPLORE_RADIUS, climateHint, ensureTiles, generateWorld, hexById, stampLandmarks, startingBanner } from "../data/hexMap";
import { scrollForLevel } from "../data/scrolls";
import { sideTribeForLevel } from "../data/sideTribes";
import { kitFor, TRAIN_COST, UPGRADE_COST, canPay, pay, slotKit } from "../data/tribeKits";
import { TRIBES, UNITS } from "../data/tribes";
import { TRIBE_DIALOGUES } from "../data/dialogues";
import { SIDE_TRIBES } from "../data/sideTribes";
import { landmarkAt } from "../data/landmarks";
import {
  alignRoster,
  defaultDiplomacy,
  returnToRoster,
  rosterFromArmy,
  rosterSum,
  starterUnitId,
  takeFromRoster,
  unitsFor,
} from "../data/roster";
import { neighbors, parseKey } from "../world/hexMath";
import { enemyArmy, enemyFromGarrison, resolveBattle, scaleById, scaleUnit } from "../units/CombatResolver";
import type { PlayerSave } from "./types";
import { bus } from "./EventBus";

const HEX_SLOTS: BuildingSlot[] = ["hall", "resource", "camp", "tower", "market", "forge"];

export class Game {
  readonly state = new GameStateMachine();
  readonly saveMgr = new SaveManager();
  readonly ads = new AdsManager();
  readonly audio = new Soundtrack();

  data: PlayerSave;
  economy!: EconomyManager;
  levels!: LevelManager;
  narrative!: NarrativeManager;
  quests!: QuestManager;
  caravan!: CaravanSystem;

  toast = "";
  openPanel: DockPanel | null = null;
  lastBattle: BattleResult | null = null;
  lastEnemy: ReturnType<typeof enemyArmy> | null = null;
  lastPlayerLine: BattleParticipant[] = [];
  wantsBattle = false;
  mapDirty = true;
  lastStoryBeat = "";
  stance: BattleStance = "assault";
  commit: number | null = null;
  private prodAcc = 0;

  constructor(initial?: PlayerSave) {
    this.data = initial ?? emptySave();
    this.bootManagers();
  }

  private bootManagers(): void {
    this.economy = new EconomyManager(this.data.resources.gold, this.data.diamond, this.data.resources);
    this.levels = new LevelManager(this.data.playerLevel, this.data.xp);
    this.narrative = new NarrativeManager(
      this.data.collectedScrolls,
      this.data.shadowTempleRevealed,
      this.data.finaleRevealed,
    );
    this.quests = new QuestManager(this.data.completedQuests);
    this.caravan = new CaravanSystem(this.data.caravan);
    if (!this.narrative.collected.includes(1)) this.narrative.collect(1);
    migrateSave(this.data);
    this.data.diplomacy ??= defaultDiplomacy();
    if (this.data.chosenTribe) {
      this.data.roster = alignRoster(this.data.roster, this.data.army, this.data.chosenTribe);
      this.data.army = rosterSum(this.data.roster);
      stampLandmarks(this.data.tiles);
    }
    this.flush();
  }

  get kit() {
    return kitFor(this.data.chosenTribe ?? "gokhanli");
  }

  get selectedTile() {
    return this.data.selectedHex ? hexById(this.data.tiles, this.data.selectedHex) : undefined;
  }

  private flush(): void {
    this.data.resources = { ...this.economy.bag };
    this.data.diamond = this.economy.diamond;
    this.data.playerLevel = this.levels.currentLevel;
    this.data.xp = this.levels.currentXp;
    this.data.collectedScrolls = [...this.narrative.collected];
    this.data.shadowTempleRevealed = this.narrative.shadowTempleRevealed;
    this.data.finaleRevealed = this.narrative.finaleRevealed;
    this.data.caravan = this.caravan.current;
    this.data.completedQuests = [...this.quests.completed];
    this.data.lastTickAt = Date.now();
  }

  newGame(name = "Kabile Lideri"): void {
    this.data = emptySave(name);
    this.bootManagers();
    this.openPanel = null;
    this.mapDirty = true;
    this.toast = `${name}, vârisin kalemini taşıyorsun. Bir kabilenin sancağını al.`;
  }

  chooseTribe(tribe: PlayableTribe): void {
    this.data.chosenTribe = tribe;
    this.data.tiles = generateWorld(tribe);
    this.data.army = 8;
    this.data.roster = rosterFromArmy(tribe, 8);
    this.data.unitLevel = 1;
    this.data.diplomacy = defaultDiplomacy();
    this.data.visitedLandmarks = [];
    this.data.selectedHex = this.data.tiles.find((tile) => tile.owner === tribe && tile.slot === "hall")?.id ?? null;
    this.mapDirty = true;
    this.toast = `Vâris olarak ${TRIBES[tribe].name} sancağını aldın. Murat Ağa'nın hançerini bu toprakta ara.`;
    this.flush();
    bus.emit("save", this.data);
  }

  continueGame(): boolean {
    return Boolean(this.data.chosenTribe);
  }

  async persist(): Promise<void> {
    this.flush();
    await this.saveMgr.persist(this.data);
  }

  async bootFromDisk(): Promise<boolean> {
    const loaded = await this.saveMgr.load();
    if (!loaded) return false;
    this.data = loaded;
    this.bootManagers();
    this.mapDirty = true;
    return true;
  }

  hydrate(): void {
    this.bootManagers();
    const hall = this.data.tiles.find((tile) => tile.slot === "hall" && this.isMine(tile.owner));
    if (hall) this.ensureAround(hall.q, hall.r);
    else this.ensureAround(0, 0);
  }

  selectHex(id: string | null): void {
    this.data.selectedHex = id;
    if (id) {
      const { q, r } = parseKey(id);
      this.ensureAround(q, r);
    }
    bus.emit("hex", id);
  }

  setStance(stance: BattleStance): void {
    this.stance = stance;
  }

  setCommit(count: number | null): void {
    this.commit = count;
  }

  ensureAround(q: number, r: number, radius = EXPLORE_RADIUS): boolean {
    const added = ensureTiles(this.data.tiles, q, r, radius);
    if (added > 0) this.mapDirty = true;
    return added > 0;
  }

  sentTroops(): number {
    const all = this.data.army;
    if (this.commit == null) return all;
    return Math.max(1, Math.min(all, this.commit));
  }

  togglePanel(panel: DockPanel): void {
    this.openPanel = this.openPanel === panel ? null : panel;
  }

  closePanel(): void {
    this.openPanel = null;
  }

  mapBanner(): string {
    const level = this.levels.currentLevel;
    if (this.narrative.finaleRevealed || level >= 100) return "GÖLGE ELÇİSİ ORTAYA ÇIKTI";
    if (this.narrative.shadowTempleRevealed || level >= 40) return "GÖLGE TAPINAĞI SİSİN ARDINDAN GÖRÜNDÜ";
    if (level > 1 && level % 10 === 0) {
      const side = sideTribeForLevel(level);
      if (side) return `${side.name.toUpperCase()} HARİTAYA DÜŞTÜ`;
    }
    if (level <= 6) return "KANLI TAHT — ÜÇ KABİLE BİRBİRİNİ SUÇLUYOR";
    if (this.data.chosenTribe) return startingBanner(this.data.chosenTribe, this.data.diplomacy);
    const scroll = scrollForLevel(level);
    return scroll ? scroll.title.toUpperCase() : "MÜHÜRLER HENÜZ KONUŞMADI";
  }

  isMine(owner: string): boolean {
    return Boolean(this.data.chosenTribe && owner === this.data.chosenTribe);
  }

  buildOnSelected(slot: BuildingSlot): string {
    const tile = this.selectedTile;
    if (!tile || !this.data.chosenTribe || !this.isMine(tile.owner)) {
      return "Kendi toprağında inşa et.";
    }
    if (tile.slot) return "Bu altıgende zaten yapı var.";
    if (slot === "hall") return "Merkez zaten kuruludur.";
    const def = slotKit(this.data.chosenTribe, slot);
    if (!canPay(this.economy.bag, def.cost)) return "Kaynak yetmiyor.";
    this.economy.bag = pay(this.economy.bag, def.cost);
    this.economy.gold = this.economy.bag.gold;
    tile.slot = slot;
    tile.level = 1;
    tile.label = def.name;
    this.mapDirty = true;
    this.flush();
    return `${def.name} kuruldu.`;
  }

  upgradeSelected(): string {
    const tile = this.selectedTile;
    if (!tile || !this.data.chosenTribe || !this.isMine(tile.owner) || !tile.slot) {
      return "Yükseltilecek kendi yapın yok.";
    }
    if (tile.level >= 5) return "En üst seviye.";
    if (!this.levels.canUpgradeTo(tile.level + 1)) return "Gelişim oyuncu seviyesini aşamaz.";
    if (!canPay(this.economy.bag, UPGRADE_COST)) return "Yükseltme için kaynak yetmiyor.";
    this.economy.bag = pay(this.economy.bag, UPGRADE_COST);
    this.economy.gold = this.economy.bag.gold;
    tile.level += 1;
    this.mapDirty = true;
    this.flush();
    return `${slotKit(this.data.chosenTribe, tile.slot).name} seviye ${tile.level}.`;
  }

  buildOrUpgrade(id: string): string {
    if (id === "shadowTemple" && !this.narrative.shadowTempleRevealed) {
      return "Gölge Tapınağı hâlâ sisin ardında.";
    }
    if (HEX_SLOTS.includes(id as BuildingSlot)) {
      const tile = this.selectedTile;
      if (tile?.slot === id) return this.upgradeSelected();
      return this.buildOnSelected(id as BuildingSlot);
    }
    const current = this.data.buildingLevels[id] ?? 0;
    const cost = this.economy.buildCost(id, current, this.levels);
    if (!cost) return "Gelişim oyuncu seviyesini aşamaz.";
    if (!this.economy.spend("gold", cost.gold)) return "Altın yetmiyor.";
    this.data.buildingLevels[id] = current + 1;
    this.mapDirty = true;
    this.flush();
    return `${id} mühürlendi.`;
  }

  train(tribeOrCount: TribeId | number = 1): string {
    if (!this.data.chosenTribe) return "Önce kabile seç.";
    const camps = this.data.tiles.filter((tile) => this.isMine(tile.owner) && tile.slot === "camp");
    if (!camps.length) return "Önce birlik kampı inşa et.";
    const count = typeof tribeOrCount === "number" ? tribeOrCount : 1;
    const cost: Partial<ResourceBag> = {};
    (Object.keys(TRAIN_COST) as ResourceId[]).forEach((key) => {
      cost[key] = (TRAIN_COST[key] ?? 0) * count;
    });
    if (!canPay(this.economy.bag, cost)) return "Eğitim için kaynak yetmiyor.";
    this.economy.bag = pay(this.economy.bag, cost);
    this.economy.gold = this.economy.bag.gold;
    const tribe = this.data.chosenTribe;
    const unitId = starterUnitId(tribe);
    this.data.roster = alignRoster(this.data.roster, this.data.army, tribe);
    this.data.roster[unitId] = (this.data.roster[unitId] ?? 0) + count;
    this.data.army = rosterSum(this.data.roster);
    this.flush();
    return `${count} ${this.kit.unitName} eğitildi.`;
  }

  trainUnit(unitId: string, count = 1): string {
    if (!this.data.chosenTribe) return "Önce kabile seç.";
    const def = UNITS.find((unit) => unit.id === unitId);
    if (!def || def.tribe !== this.data.chosenTribe) return "Bu birlik senin sancağına ait değil.";
    const camps = this.data.tiles.filter((tile) => this.isMine(tile.owner) && tile.slot === "camp");
    if (!camps.length) return "Önce birlik kampı inşa et.";
    const elite = def.id !== starterUnitId(this.data.chosenTribe);
    const mul = elite ? 1.6 : 1;
    const cost: Partial<ResourceBag> = {};
    (Object.keys(TRAIN_COST) as ResourceId[]).forEach((key) => {
      cost[key] = Math.round((TRAIN_COST[key] ?? 0) * count * mul);
    });
    if (!canPay(this.economy.bag, cost)) return "Eğitim için kaynak yetmiyor.";
    this.economy.bag = pay(this.economy.bag, cost);
    this.economy.gold = this.economy.bag.gold;
    this.data.roster = alignRoster(this.data.roster, this.data.army, this.data.chosenTribe);
    this.data.roster[unitId] = (this.data.roster[unitId] ?? 0) + count;
    this.data.army = rosterSum(this.data.roster);
    this.flush();
    return `${count} ${def.name} eğitildi.`;
  }

  upgradeUnit(_tribe?: TribeId): string {
    if (this.economy.diamond < 2) return "Elmas yetmiyor.";
    this.economy.spend("diamond", 2);
    this.data.unitLevel += 1;
    this.flush();
    return "Birlikler güçlendi.";
  }

  adjacentToPlayer(tileId: string): boolean {
    const tile = hexById(this.data.tiles, tileId);
    if (!tile || !this.data.chosenTribe) return false;
    return neighbors(tile.q, tile.r).some((n) => {
      const next = this.data.tiles.find((item) => item.q === n.q && item.r === n.r);
      return next ? this.isMine(next.owner) : false;
    });
  }

  claimOrAttack(id?: string): string {
    const tile = id ? hexById(this.data.tiles, id) : this.selectedTile;
    if (!tile || !this.data.chosenTribe) return "Hedef altıgen yok.";
    if (this.isMine(tile.owner)) return "Bu toprak zaten senin.";
    if (!this.adjacentToPlayer(tile.id)) return "Sadece komşu altıgene yürüyebilirsin.";
    if (this.data.army < 4) return "Yeterli birliğin yok.";

    const sent = this.sentTroops();
    const flanking = neighbors(tile.q, tile.r).filter((n) => {
      const next = this.data.tiles.find((item) => item.q === n.q && item.r === n.r);
      return next ? this.isMine(next.owner) : false;
    }).length;

    if (tile.owner === "neutral" && tile.garrison <= 3 && tile.slot !== "tower" && !tile.landmark) {
      const loss = 1;
      this.shrinkArmy(loss);
      tile.owner = this.data.chosenTribe;
      tile.garrison = 3;
      tile.stars = 3;
      this.gainProgress(8);
      this.mapDirty = true;
      this.flush();
      return this.withStory(`${tile.label} bağlandı. ${climateHint(tile.biome)} Kayıp: ${loss}`);
    }

    const result = this.fightTile(tile, sent, flanking);
    this.wantsBattle = true;
    this.mapDirty = true;
    if (result.winner === "player") {
      tile.owner = this.data.chosenTribe;
      tile.garrison = Math.max(2, result.playerRemaining);
      this.honorCapture(tile, sent, result.playerRemaining);
      this.flush();
      return this.withStory(`${tile.label} ele geçirildi. ${result.log[0] ?? ""}`);
    }
    this.flush();
    return result.winner === "enemy" ? `Pusuya düştük. ${result.log.at(-2) ?? ""}` : "Saha berabere kaldı.";
  }

  fight(enemyTribe: TribeId): BattleResult {
    const fake = {
      biome: "forest" as const,
      owner: enemyTribe === "player" ? "gokhanli" : enemyTribe,
      slot: undefined,
      garrison: 6,
      hall: false,
    };
    return this.fightTile(fake, this.sentTroops(), 0);
  }

  fightTile(
    tile: { biome: import("./types").Biome; owner: string; slot?: string; garrison: number; landmark?: string },
    sent: number,
    flanking: number,
  ): BattleResult {
    const tribe = this.data.chosenTribe ?? "gokhanli";
    const defender: TribeId =
      tile.owner === "neutral"
        ? tile.biome === "desert"
          ? "sariklilar"
          : tile.biome === "ice"
            ? "demirhisar"
            : "gokhanli"
        : (tile.owner as TribeId);
    this.data.roster = alignRoster(this.data.roster, this.data.army, tribe);
    const taken = takeFromRoster(this.data.roster, Math.max(1, sent), tribe);
    const player = Object.entries(taken)
      .filter(([, n]) => n > 0)
      .map(([id, n]) => scaleById(id, n, this.data.unitLevel, this.levels));
    if (!player.length) player.push(scaleUnit(tribe, Math.max(1, sent), this.data.unitLevel, this.levels));
    const enemy = enemyFromGarrison(defender, Math.max(1, tile.garrison), this.levels.currentLevel, this.levels);
    if (tile.owner === "neutral") enemy.name = tile.landmark ? "Hikâye nöbeti" : "Vahşi sürü";
    this.lastEnemy = enemy;
    this.lastPlayerLine = player;
    const result = resolveBattle(player, enemy, Math.random, {
      biome: tile.biome,
      tower: tile.slot === "tower",
      hall: tile.slot === "hall",
      flanking,
      stance: this.stance,
      garrison: tile.garrison,
    });
    this.lastBattle = result;
    returnToRoster(this.data.roster, taken, result.playerRemaining);
    this.data.army = rosterSum(this.data.roster);
    if (tile.owner !== "neutral" && tile.owner !== tribe) {
      this.data.diplomacy[tile.owner as PlayableTribe] = "war";
    }
    if (result.winner === "player") {
      this.economy.grant("gold", result.goldLoot);
      this.gainProgress(result.xpReward);
    } else {
      this.gainProgress(6);
    }
    this.flush();
    return result;
  }

  private gainProgress(xp: number): void {
    const ups = this.levels.addXp(xp);
    for (const up of ups) {
      this.narrative.collect(up.newLevel);
      if (up.unlockedSideTribe && !this.data.discoveredSideTribes.includes(up.unlockedSideTribe.id)) {
        this.data.discoveredSideTribes.push(up.unlockedSideTribe.id);
      }
      if (up.shadowTempleUnlocked) this.narrative.shadowTempleRevealed = true;
      if (up.finaleUnlocked) this.narrative.finaleRevealed = true;
    }
    if (ups.length) {
      const last = ups[ups.length - 1];
      if (last.finaleUnlocked) this.lastStoryBeat = "Gölge Elçisi ortaya çıktı.";
      else if (last.shadowTempleUnlocked) this.lastStoryBeat = "Gölge Tapınağı sisin ardından göründü.";
      else if (last.unlockedSideTribe) this.lastStoryBeat = `${last.unlockedSideTribe.name} haritaya düştü.`;
      else if (last.scroll) this.lastStoryBeat = `Parşömen ${last.newLevel}: ${last.scroll.title}`;
      bus.emit("levelup", this.levels.currentLevel);
    }
  }

  private withStory(base: string): string {
    if (!this.lastStoryBeat) return base;
    const beat = this.lastStoryBeat;
    this.lastStoryBeat = "";
    return `${base} ${beat}`;
  }

  private honorCapture(tile: HexTile, sent: number, remaining: number): void {
    const ratio = remaining / Math.max(1, sent);
    tile.stars = ratio >= 0.8 ? 3 : ratio >= 0.5 ? 2 : 1;
    if (!tile.landmark) return;
    if (!this.data.visitedLandmarks.includes(tile.id)) this.data.visitedLandmarks.push(tile.id);
    const def = landmarkAt(tile.q, tile.r);
    if (!def) return;
    if (def.sideId && !this.data.discoveredSideTribes.includes(def.sideId)) {
      this.data.discoveredSideTribes.push(def.sideId);
    }
    const scroll = this.narrative.collect(def.unlockLevel);
    if (scroll) this.lastStoryBeat = `Parşömen ${def.unlockLevel}: ${scroll.title}`;
    if (def.kind === "temple") {
      this.narrative.shadowTempleRevealed = true;
      this.lastStoryBeat = "Gölge Tapınağı sisin ardından göründü.";
    }
    if (def.kind === "finale") {
      this.narrative.finaleRevealed = true;
      this.lastStoryBeat = "Gölge Elçisi ortaya çıktı.";
    }
    if (def.questId) {
      const quest = this.quests.complete(def.questId);
      if (quest) {
        this.economy.grant("gold", quest.goldReward);
        this.economy.grant("diamond", quest.diamondReward);
        this.lastStoryBeat = `${this.lastStoryBeat} ${quest.title} tamamlandı.`.trim();
      }
    }
    const side = SIDE_TRIBES.find((entry) => entry.id === def.sideId);
    if (side) this.lastStoryBeat = `${this.lastStoryBeat} ${side.clue}`.trim();
  }

  private shrinkArmy(loss: number): void {
    if (!this.data.chosenTribe) {
      this.data.army = Math.max(0, this.data.army - loss);
      return;
    }
    this.data.roster = alignRoster(this.data.roster, this.data.army, this.data.chosenTribe);
    this.data.roster = alignRoster(this.data.roster, Math.max(0, this.data.army - loss), this.data.chosenTribe);
    this.data.army = rosterSum(this.data.roster);
  }

  tickProduction(): void {
    if (!this.data.chosenTribe) return;
    this.economy.produceTiles(this.data.tiles, this.data.chosenTribe, 1);
    this.flush();
  }

  sendCaravan(): string {
    if (this.caravan.busy) return "Kervan yolda.";
    if (!this.data.tiles.some((tile) => this.isMine(tile.owner) && tile.slot === "market")) {
      return "Ticaret pazarı kur.";
    }
    const stake = Math.min(50, this.economy.gold);
    if (stake < 10) return "Kervan için altın yetmiyor.";
    this.economy.spend("gold", stake);
    this.caravan.depart("Tuz Yolu", stake);
    this.flush();
    return "Kervan yola çıktı.";
  }

  completeQuest(id: string): string {
    const quest = this.quests.complete(id);
    if (!quest) return "Görev yok.";
    this.economy.grant("gold", quest.goldReward);
    this.economy.grant("diamond", quest.diamondReward);
    this.gainProgress(quest.xpReward);
    this.flush();
    return `${quest.title} tamamlandı.`;
  }

  async watchAd(kind: RewardKind = "fast_production"): Promise<string> {
    const grant = await this.ads.watch(kind);
    if (!grant) return "Reklam hazır değil.";
    if (grant.diamond) this.economy.grant("diamond", grant.diamond);
    if (grant.ticks) this.economy.produceTiles(this.data.tiles, this.data.chosenTribe, 2);
    if (grant.caravanMsSaved) this.caravan.speedUp(grant.caravanMsSaved);
    this.flush();
    return "İzlenen ödül kasaya işlendi.";
  }

  talk(id: TribeId) {
    if (id === "player") return [];
    return TRIBE_DIALOGUES[id] ?? [];
  }

  unlockedTribes() {
    return SIDE_TRIBES.filter((tribe) => tribe.unlockLevel <= this.levels.currentLevel);
  }

  tick(dt: number): void {
    this.prodAcc += dt;
    if (this.prodAcc >= 8000) {
      this.prodAcc = 0;
      this.tickProduction();
      this.tickAi();
    }
    this.grantDaily();
    const arrived = this.caravan.tick(dt);
    if (arrived?.arrived) {
      this.economy.grant("gold", arrived.goldReturn);
      this.toast = arrived.raid ? "Kervan baskına uğradı." : "Kervan döndü.";
      this.flush();
    }
  }

  grantDaily(): void {
    if (!this.data.chosenTribe) return;
    const day = Math.floor(Date.now() / 86_400_000);
    if (this.data.lastDailyAt === day) return;
    this.data.lastDailyAt = day;
    this.economy.grant("gold", 18);
    if (!this.toast) this.toast = "Günlük kervan payı kasaya düştü.";
    this.flush();
  }

  otherTribes(): PlayableTribe[] {
    return (["sariklilar", "gokhanli", "demirhisar"] as PlayableTribe[]).filter((id) => id !== this.data.chosenTribe);
  }

  tickAi(rng: () => number = Math.random): void {
    if (!this.data.chosenTribe) return;
    for (const tribe of this.otherTribes()) {
      this.stepTribeAi(tribe, rng);
    }
    this.flush();
  }

  private stepTribeAi(tribe: PlayableTribe, rng: () => number): void {
    const owned = this.data.tiles.filter((tile) => tile.owner === tribe);
    if (!owned.length) return;
    const mood = this.data.diplomacy[tribe] ?? "talks";
    const edges = this.borderOf(owned);
    const empty = edges.filter((tile) => tile.owner === "neutral" && !tile.landmark);
    const playerTiles = edges.filter((tile) => this.isMine(tile.owner) && tile.slot !== "hall");
    const rival = edges.filter((tile) => tile.owner !== "neutral" && !this.isMine(tile.owner) && tile.owner !== tribe && !tile.landmark && tile.slot !== "hall");

    if (empty.length && rng() < 0.55) {
      const tile = empty[Math.floor(rng() * empty.length)];
      tile.owner = tribe;
      tile.garrison = 3;
      tile.label = `${TRIBES[tribe].name} ${tile.biome === "desert" ? "çölü" : tile.biome === "ice" ? "buzı" : "ormanı"}`;
      this.mapDirty = true;
      this.softenMood(tribe);
      return;
    }

    const raidChance = mood === "war" ? 0.38 : mood === "trade" ? 0.06 : 0.12;
    if (playerTiles.length && rng() < raidChance) {
      const tile = playerTiles[Math.floor(rng() * playerTiles.length)];
      this.data.diplomacy[tribe] = "war";
      if (tile.garrison <= 3 || rng() < 0.35) {
        tile.owner = tribe;
        tile.garrison = 3;
        this.shrinkArmy(1);
        this.toast = `${TRIBES[tribe].name} toprağına yürüdü.`;
      } else {
        tile.garrison = Math.max(1, tile.garrison - 2);
        this.toast = `${TRIBES[tribe].name} sınırını yokladı.`;
      }
      this.mapDirty = true;
      return;
    }

    if (rival.length && rng() < 0.18) {
      const tile = rival[Math.floor(rng() * rival.length)];
      const from = tile.owner as PlayableTribe;
      tile.owner = tribe;
      tile.garrison = 3;
      this.data.diplomacy[tribe] = this.data.diplomacy[tribe] === "talks" ? "trade" : this.data.diplomacy[tribe];
      this.data.diplomacy[from] = "war";
      this.mapDirty = true;
      this.toast = `${TRIBES[tribe].name} ile ${TRIBES[from].name} sınırda çarpıştı.`;
      return;
    }

    this.softenMood(tribe);
  }

  private borderOf(owned: HexTile[]): HexTile[] {
    const seen = new Set<string>();
    const out: HexTile[] = [];
    for (const tile of owned) {
      for (const n of neighbors(tile.q, tile.r)) {
        const next = this.data.tiles.find((item) => item.q === n.q && item.r === n.r);
        if (!next || seen.has(next.id) || next.owner === tile.owner) continue;
        seen.add(next.id);
        out.push(next);
      }
    }
    return out;
  }

  private softenMood(tribe: PlayableTribe): void {
    const mood = this.data.diplomacy[tribe];
    if (mood === "war") this.data.diplomacy[tribe] = "talks";
    else if (mood === "talks" && Math.random() < 0.35) this.data.diplomacy[tribe] = "trade";
  }

  debugSetLevel(level: number): void {
    this.levels = new LevelManager(level, 0);
    this.data.playerLevel = level;
    for (let i = 1; i <= level; i += 1) this.narrative.collect(i);
    this.data.collectedScrolls = [...this.narrative.collected];
    this.data.shadowTempleRevealed = this.narrative.shadowTempleRevealed;
    this.data.finaleRevealed = this.narrative.finaleRevealed;
    if (this.data.chosenTribe) stampLandmarks(this.data.tiles);
  }

  unitsOfTribe() {
    return this.data.chosenTribe ? unitsFor(this.data.chosenTribe) : [];
  }

  clearBattleFlag(): void {
    this.wantsBattle = false;
  }
}
