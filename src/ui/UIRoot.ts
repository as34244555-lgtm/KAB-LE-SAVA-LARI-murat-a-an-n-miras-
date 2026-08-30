import { GAME_TITLE, type BuildingSlot, type DockPanel, type GamePhase, type PlayableTribe } from "../core/types";
import type { Game } from "../core/Game";
import { TRIBES } from "../data/tribes";
import { kitFor, slotKit } from "../data/tribeKits";
import { hexById } from "../data/hexMap";

const DOCK: Array<{ id: DockPanel; label: string; icon: string }> = [
  { id: "yonetim", label: "Yönetim", icon: "🤝" },
  { id: "ticaret", label: "Ticaret", icon: "🐪" },
  { id: "insa", label: "İnşa", icon: "🔨" },
  { id: "birlikler", label: "Birlikler", icon: "🛡️" },
  { id: "arastirma", label: "Araştırma", icon: "📜" },
];

const SLOTS: BuildingSlot[] = ["resource", "camp", "tower", "market", "forge"];

export class UIRoot {
  private layer: HTMLElement;
  private onAction: ((name: string, payload?: string) => void) | null = null;

  constructor(host: HTMLElement) {
    this.layer = document.createElement("div");
    this.layer.id = "ui-root";
    host.appendChild(this.layer);
    this.layer.addEventListener("click", (event) => {
      const target = (event.target as HTMLElement).closest<HTMLElement>("[data-act]");
      if (!target) return;
      target.classList.add("pop");
      window.setTimeout(() => target.classList.remove("pop"), 180);
      this.onAction?.(target.dataset.act ?? "", target.dataset.arg);
    });
  }

  bind(handler: (name: string, payload?: string) => void) {
    this.onAction = handler;
  }

  render(game: Game, screen: GamePhase, notice = "") {
    const toast = notice || game.toast;
    game.toast = "";
    if (screen === "intro" || screen === "boot") {
      this.layer.innerHTML = this.intro();
      return;
    }
    if (screen === "menu") {
      this.layer.innerHTML = this.menu();
      return;
    }
    if (screen === "pick") {
      this.layer.innerHTML = this.pick();
      return;
    }
    this.layer.innerHTML = this.hud(game, toast, screen === "battle");
  }

  private intro() {
    return `
      <section class="cinematic">
        <div class="vignette"></div>
        <div class="crawl neu-card">
          <p class="eyebrow">Harita tabanlı gerçek zamanlı strateji</p>
          <h1>${GAME_TITLE}</h1>
          <p>Üç kabile aynı adayı paylaşıyor. Sen birini seçer, çölü, ormanı veya buz hisarını yönetirsin.</p>
          <p>Asker ve bina türleri kabilene göre değişir. Murat Ağa'nın hançeri hâlâ bu toprakların hikâyesidir — ama savaş haritada kazanılır.</p>
          <button class="neu-btn gold" data-act="finish-intro">Kabileleri Gör</button>
        </div>
      </section>`;
  }

  private menu() {
    return `
      <section class="cinematic menu">
        <div class="vignette"></div>
        <div class="crawl neu-card">
          <p class="eyebrow">Tek oyunculu · Mobil RTS</p>
          <h1>${GAME_TITLE}</h1>
          <div class="row">
            <button class="neu-btn gold" data-act="new-game">Yeni Sefer</button>
            <button class="neu-btn" data-act="continue">Kayıttan Devam</button>
          </div>
          <p class="fine">Sarıklılar (çöl) · Gök-Hanlı (orman) · Demir-Hisar (buz)</p>
        </div>
      </section>`;
  }

  private pick() {
    const cards = (["sariklilar", "gokhanli", "demirhisar"] as PlayableTribe[])
      .map((id) => {
        const tribe = TRIBES[id];
        const kit = kitFor(id);
        return `
          <button class="tribe-card ${id}" data-act="choose-tribe" data-arg="${id}">
            <span class="eyebrow">${kit.biomeLabel}</span>
            <strong>${tribe.name}</strong>
            <span>${kit.unitName}</span>
            <em>${kit.unitTitle}</em>
          </button>`;
      })
      .join("");
    return `
      <section class="pick-screen">
        <div class="vignette"></div>
        <div class="pick-copy">
          <p class="eyebrow">Kabile seç</p>
          <h1>Hangi toprağı yöneteceksin?</h1>
          <p>Seçimin binaları, birlikleri ve haritadaki başlangıç biyomunu kilitler.</p>
        </div>
        <div class="tribe-grid">${cards}</div>
      </section>`;
  }

  private hud(game: Game, toast: string, battle: boolean) {
    const bag = game.economy.bag;
    const tile = game.selectedTile;
    const tribe = game.data.chosenTribe;
    const kit = game.kit;
    const name = game.data.playerName;
    return `
      <header class="res-bar">
        <div class="res-chips">
          ${this.res("🪵", bag.wood)}
          ${this.res("🪨", bag.stone)}
          ${this.res("🦬", bag.leather)}
          ${this.res("💎", bag.crystal)}
          ${this.res("🍖", bag.food)}
        </div>
        <div class="leader">
          <span class="portrait"></span>
          <div>
            <small>Kabile Lideri</small>
            <strong>${name}</strong>
          </div>
          <span class="chip gold-chip">${fmt(game.economy.gold)}</span>
        </div>
      </header>
      <div class="banner">${game.mapBanner()}</div>
      <div class="hex-inspect ${tile ? "on" : ""}">
        ${tile ? this.inspect(game, tile.id) : "<span>Haritadan bir altıgen seç</span>"}
      </div>
      ${game.openPanel ? `<section class="sheet">${this.sheet(game, game.openPanel)}</section>` : ""}
      ${toast ? `<aside class="toast neu-card">${toast}</aside>` : ""}
      ${battle && game.lastBattle ? `<aside class="battle-log neu-card"><strong>${game.lastBattle.winner === "player" ? "Zafer" : "Saha karışık"}</strong><p>${game.lastBattle.log.at(-1) ?? ""}</p></aside>` : ""}
      <nav class="circle-dock">
        ${DOCK.map((item) => `
          <button class="circle ${game.openPanel === item.id ? "on" : ""}" data-act="dock" data-arg="${item.id}">
            <span>${item.icon}</span>
            <small>${item.label}</small>
          </button>`).join("")}
      </nav>
      <button class="chat-fab" data-act="dock" data-arg="yonetim">💬<i>3</i></button>
      <p class="fine hud-kit">${tribe ? `${kit.hallTitle} · ${kit.unitName} ${game.data.army}` : "Kabile seçilmedi"}</p>
    `;
  }

  private res(icon: string, value: number) {
    return `<span class="res"><i>${icon}</i>${fmt(value)}</span>`;
  }

  private inspect(game: Game, id: string) {
    const tile = hexById(game.data.tiles, id);
    if (!tile) return "";
    const mine = game.isMine(tile.owner);
    const enemy = tile.owner !== "neutral" && !mine;
    const ownerTribe = tile.owner === "neutral" ? game.data.chosenTribe : tile.owner;
    const kitName = tile.slot && ownerTribe ? slotKit(ownerTribe, tile.slot).name : "Boş arazi";
    return `
      <div>
        <strong>${tile.label}</strong>
        <span>${kitName} · Sv ${tile.level} · Garnizon ${tile.garrison}</span>
      </div>
      <div class="row">
        ${mine && tile.slot ? `<button class="neu-btn slim gold" data-act="upgrade">Yükselt</button>` : ""}
        ${!mine ? `<button class="neu-btn slim gold" data-act="attack" data-arg="${tile.id}">${enemy ? "Saldır" : "Bağla"}</button>` : ""}
        <button class="neu-btn slim ghost" data-act="deselect">Kapat</button>
      </div>`;
  }

  private sheet(game: Game, panel: DockPanel) {
    if (panel === "yonetim") return this.manage(game);
    if (panel === "ticaret") return this.trade(game);
    if (panel === "insa") return this.build(game);
    if (panel === "birlikler") return this.army(game);
    return this.research(game);
  }

  private manage(game: Game) {
    const scroll = game.narrative.knownScrolls().at(-1);
    const side = game.unlockedTribes().at(-1);
    return `
      <div class="sheet-head"><h2>Yönetim</h2><button class="neu-btn slim ghost" data-act="close-sheet">Kapat</button></div>
      <p>Seviye ${game.levels.currentLevel} · ${game.kit.biomeLabel}</p>
      ${scroll ? `<article class="neu-card"><h3>${scroll.title}</h3><p>${scroll.body}</p></article>` : ""}
      ${side ? `<article class="neu-card"><h3>${side.name}</h3><p>${side.clue}</p></article>` : "<p>Yan kabileler her 10 seviyede haritaya düşer.</p>"}
      <div class="row">
        <button class="neu-btn slim" data-act="save">Mühürle</button>
        <button class="neu-btn slim ghost" data-act="menu">Menü</button>
      </div>`;
  }

  private trade(game: Game) {
    return `
      <div class="sheet-head"><h2>Ticaret</h2><button class="neu-btn slim ghost" data-act="close-sheet">Kapat</button></div>
      <p>Pazar kur, kervanı yola çıkar. Dönüşte altın ve deri gelir — bazen baskın.</p>
      <p class="fine">${game.caravan.busy ? `Yolda ${Math.ceil((game.caravan.current?.remainingMs ?? 0) / 1000)}s` : "Kervan bekliyor"}</p>
      <div class="row">
        <button class="neu-btn gold" data-act="caravan">Kervan Gönder</button>
        <button class="neu-btn slim" data-act="ad" data-arg="caravan_speed">Reklam: Hızlandır</button>
      </div>`;
  }

  private build(game: Game) {
    if (!game.data.chosenTribe) return `<p>Önce kabile seç.</p>`;
    const buttons = SLOTS.map((slot) => {
      const def = slotKit(game.data.chosenTribe!, slot);
      const cost = Object.entries(def.cost).map(([k, v]) => `${k} ${v}`).join(" · ");
      return `
        <button class="neu-btn chip-btn" data-act="build" data-arg="${slot}">
          <strong>${def.name}</strong>
          <span>${def.lore}</span>
          <span>${cost}</span>
        </button>`;
    }).join("");
    return `
      <div class="sheet-head"><h2>İnşa · ${game.kit.hallTitle}</h2><button class="neu-btn slim ghost" data-act="close-sheet">Kapat</button></div>
      <p>Kendi altıgenini seç, sonra yapıyı kur. Türler kabilene özeldir.</p>
      <div class="chips">${buttons}</div>`;
  }

  private army(game: Game) {
    return `
      <div class="sheet-head"><h2>Birlikler</h2><button class="neu-btn slim ghost" data-act="close-sheet">Kapat</button></div>
      <p>${game.kit.unitName}: <strong>${game.data.army}</strong> · Sv ${game.data.unitLevel}</p>
      <p class="fine">${game.kit.unitTitle}. Kamp olmadan eğitim olmaz. Saldırı yalnızca komşu altıgene.</p>
      <div class="row">
        <button class="neu-btn gold" data-act="train">1 Birlik Eğit</button>
        <button class="neu-btn" data-act="train-five">5 Birlik</button>
        <button class="neu-btn slim" data-act="upgrade-unit">Güçlendir</button>
      </div>`;
  }

  private research(game: Game) {
    const locked = game.narrative.lockedCount();
    return `
      <div class="sheet-head"><h2>Araştırma</h2><button class="neu-btn slim ghost" data-act="close-sheet">Kapat</button></div>
      <p>Parşömenler fetihle açılır. Kalan mühür: ${locked}.</p>
      <div class="row">
        <button class="neu-btn slim" data-act="ad" data-arg="fast_production">Reklam: Üretim</button>
        <button class="neu-btn slim" data-act="ad" data-arg="diamond">Reklam: Elmas</button>
      </div>
      <p class="fine">Murat Ağa'nın hançeri hâlâ bu adanın sırrıdır. 40. seviyede Gölge Tapınağı, 100. seviyede Elçi.</p>`;
  }
}

function fmt(n: number): string {
  if (n >= 10_000) return `${(n / 1000).toFixed(1)}K`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(Math.floor(n));
}
