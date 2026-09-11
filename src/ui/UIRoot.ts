import { GAME_TITLE, type BuildingSlot, type DockPanel, type GamePhase, type PlayableTribe } from "../core/types";
import type { Game } from "../core/Game";
import { TRIBES } from "../data/tribes";
import { kitFor, slotKit } from "../data/tribeKits";
import { climateShort, hexById } from "../data/hexMap";
import { moodLabel, starterUnitId } from "../data/roster";
import { SIDE_TRIBES } from "../data/sideTribes";
import { OPENING_CRAWL } from "../data/dialogues";

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
  private heldToast = "";
  private heldUntil = 0;

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

  render(game: Game, screen: GamePhase, notice = "", watching = false) {
    if (game.toast) {
      this.heldToast = game.toast;
      this.heldUntil = Date.now() + 4500;
      game.toast = "";
    }
    const toast = notice || (Date.now() < this.heldUntil ? this.heldToast : "");
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
    this.layer.innerHTML = this.hud(game, toast, screen === "battle", watching);
  }

  private intro() {
    return `
      <section class="cinematic">
        <div class="vignette"></div>
        <div class="crawl neu-card">
          <p class="eyebrow">Hüzünlü ama kararlı</p>
          <h1>${GAME_TITLE}</h1>
          ${OPENING_CRAWL.map((line) => `<p>${line.text}</p>`).join("")}
          <p>Bir kabilenin sancağını al. Asker ve bina o toprağa göre değişir. Ama kalem aynı kalır: cinayeti çöz, mirası kurtar.</p>
          <button class="neu-btn gold" data-act="finish-intro">Tahta Yaklaş</button>
        </div>
      </section>`;
  }

  private menu() {
    return `
      <section class="cinematic menu">
        <div class="vignette"></div>
        <div class="crawl neu-card">
          <p class="eyebrow">Kanlı Taht</p>
          <h1>${GAME_TITLE}</h1>
          <div class="row">
            <button class="neu-btn gold" data-act="new-game">Yeni Yemin</button>
            <button class="neu-btn" data-act="continue">Kayıttan Devam</button>
          </div>
          <p class="fine">Sarıklılar • Gök-Hanlı • Demir-Hisar — ve sisin ardındaki dördüncü gölge.</p>
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
            <span>${tribe.epithet}</span>
            <em>${tribe.accusation}</em>
          </button>`;
      })
      .join("");
    return `
      <section class="pick-screen">
        <div class="vignette"></div>
        <div class="pick-copy">
          <p class="eyebrow">Vârisin seçimi</p>
          <h1>Hangi sancağı alacaksın?</h1>
          <p>Murat Ağa'nın tahtı boş. Bir kabilenin toprağını tut, birbirini suçlayan üç sesten gerçeği ayır.</p>
        </div>
        <div class="tribe-grid">${cards}</div>
      </section>`;
  }

  private hud(game: Game, toast: string, battle: boolean, watching = false) {
    const bag = game.economy.bag;
    const tile = game.selectedTile;
    const name = game.data.playerName;
    if (battle && game.lastBattle) {
      if (watching) {
        return `
          <header class="res-bar slim">
            <div class="res-chips">${this.res("🪙", game.economy.gold)}${this.res("🛡️", game.data.army)}</div>
            <div class="leader"><strong>${name}</strong></div>
          </header>
          <div class="banner live">SAVAŞ SÜRÜYOR — SAFLAR ÇARPIŞIYOR</div>`;
      }
      const title = game.lastBattle.winner === "player" ? "Zafer" : game.lastBattle.winner === "enemy" ? "Yenilgi" : "Berabere";
      const lines = game.lastBattle.log.slice(-6).map((line) => `<li>${line}</li>`).join("");
      return `
        <header class="res-bar slim">
          <div class="res-chips">${this.res("🪙", game.economy.gold)}${this.res("🛡️", game.data.army)}</div>
          <div class="leader"><strong>${name}</strong></div>
        </header>
        <aside class="battle-sheet neu-card">
          <p class="eyebrow">Saha</p>
          <h2>${title}</h2>
          <ul>${lines}</ul>
          <button class="neu-btn gold" data-act="continue-battle">Devam</button>
        </aside>`;
    }
    return `
      <header class="res-bar">
        <div class="res-chips">
          ${this.res("🪙", game.economy.gold)}
          ${this.res("🪵", bag.wood)}
          ${this.res("🪨", bag.stone)}
          ${this.res("🦬", bag.leather)}
          ${this.res("💎", bag.crystal)}
          ${this.res("🍖", bag.food)}
          ${this.res("🛡️", game.data.army)}
        </div>
        <div class="leader">
          <span class="portrait"></span>
          <div>
            <small>Vâris · Sv ${game.levels.currentLevel}</small>
            <strong>${name}</strong>
          </div>
        </div>
      </header>
      <div class="banner">${game.mapBanner()}</div>
      ${!game.openPanel ? `<div class="hex-inspect ${tile ? "on" : ""}">
        ${tile ? this.inspect(game, tile.id) : "<span>Haritadan bir altıgen seç</span>"}
      </div>` : ""}
      ${game.openPanel ? `<section class="sheet">${this.sheet(game, game.openPanel)}</section>` : ""}
      ${toast ? `<aside class="toast neu-card">${toast}</aside>` : ""}
      <nav class="circle-dock">
        ${DOCK.map((item) => `
          <button class="circle ${game.openPanel === item.id ? "on" : ""}" data-act="dock" data-arg="${item.id}">
            <span>${item.icon}</span>
            <small>${item.label}</small>
          </button>`).join("")}
      </nav>
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
    const stars = tile.stars ? "★".repeat(tile.stars) : "";
    const side = tile.sideId ? SIDE_TRIBES.find((item) => item.id === tile.sideId) : undefined;
    return `
      <div>
        <strong>${tile.label} ${stars}</strong>
        <span>${climateShort(tile.biome)} · Garnizon ${tile.garrison}${tile.landmark ? " · hikâye" : ""}</span>
        ${side && mine ? `<span class="fine">${side.clue}</span>` : ""}
      </div>
      <div class="row">
        ${mine && tile.slot ? `<button class="neu-btn slim gold" data-act="upgrade">Yükselt</button>` : ""}
        ${!mine ? `<button class="neu-btn slim gold" data-act="attack" data-arg="${tile.id}">${enemy ? "Yüzleş" : "Bağla"} · ${game.sentTroops()}</button>` : ""}
        <button class="neu-btn slim ghost" data-act="deselect">Seçimi bırak</button>
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
    const others = (["sariklilar", "gokhanli", "demirhisar"] as const).filter((id) => id !== game.data.chosenTribe);
    const voices = others
      .map((id) => {
        const line = game.talk(id)[0];
        const mood = moodLabel(game.data.diplomacy[id]);
        return `<article class="neu-card talk"><h3>${TRIBES[id].name}</h3><p class="eyebrow">${mood} · ${TRIBES[id].voice}</p><p>“${line?.text ?? TRIBES[id].accusation}”</p></article>`;
      })
      .join("");
    return `
      <div class="sheet-head"><h2>Vârisin Divanı</h2><button class="neu-btn slim ghost" data-act="close-sheet">Paneli kapat</button></div>
      <p>Seviye ${game.levels.currentLevel} · XP ${game.levels.currentXp} (${Math.round(game.levels.progress * 100)}%). ${game.kit.biomeLabel}. Üç kabile birbirini suçluyor; sen mühürleri okuyorsun.</p>
      ${scroll ? `<article class="neu-card"><div class="eyebrow">Parşömen ${scroll.level}</div><h3>${scroll.title}</h3><p>${scroll.body}</p></article>` : ""}
      ${voices}
      ${side ? `<article class="neu-card"><h3>${side.name}</h3><p class="memory">${side.memory}</p><p>${side.clue}</p></article>` : "<p>Her 10 seviyede bir yan kabile Murat Ağa'nın eski bir anısını bırakır.</p>"}
      <div class="row">
        <button class="neu-btn slim" data-act="save">Mühürle</button>
        <button class="neu-btn slim ghost" data-act="menu">Menü</button>
      </div>`;
  }

  private trade(game: Game) {
    return `
      <div class="sheet-head"><h2>Ticaret</h2><button class="neu-btn slim ghost" data-act="close-sheet">Paneli kapat</button></div>
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
      <div class="sheet-head"><h2>İnşa · ${game.kit.hallTitle}</h2><button class="neu-btn slim ghost" data-act="close-sheet">Paneli kapat</button></div>
      <p>Kendi altıgenini seç, sonra yapıyı kur. Türler kabilene özeldir.</p>
      <div class="chips">${buttons}</div>`;
  }

  private army(game: Game) {
    const starter = game.data.chosenTribe ? starterUnitId(game.data.chosenTribe) : "";
    const rows = game.unitsOfTribe()
      .map((unit) => {
        const n = game.data.roster[unit.id] ?? 0;
        const elite = unit.id !== starter;
        return `<article class="neu-card talk">
          <h3>${unit.name} · ${n}</h3>
          <p class="fine">${unit.lore}</p>
          <button class="neu-btn slim gold" data-act="train-unit" data-arg="${unit.id}">${elite ? "Elit eğit" : "Eğit"}</button>
        </article>`;
      })
      .join("");
    return `
      <div class="sheet-head"><h2>Birlikler</h2><button class="neu-btn slim ghost" data-act="close-sheet">Paneli kapat</button></div>
      <p>Toplam <strong>${game.data.army}</strong> · Sv ${game.data.unitLevel} · sefere ${game.sentTroops()}</p>
      <p class="fine">${game.kit.unitTitle}. Duruş burada seçilir; harita kartı kısa kalır.</p>
      <div class="row">
        <button class="neu-btn slim ${game.stance === "assault" ? "gold" : ""}" data-act="stance" data-arg="assault">Hücum</button>
        <button class="neu-btn slim ${game.stance === "ambush" ? "gold" : ""}" data-act="stance" data-arg="ambush">Pusu</button>
        <button class="neu-btn slim ${game.stance === "hold" ? "gold" : ""}" data-act="stance" data-arg="hold">Kalkan</button>
      </div>
      <div class="row">
        <button class="neu-btn slim" data-act="commit" data-arg="4">4 gönder</button>
        <button class="neu-btn slim" data-act="commit" data-arg="half">Yarısı</button>
        <button class="neu-btn slim" data-act="commit" data-arg="all">Hepsi</button>
      </div>
      ${rows}
      <div class="row">
        <button class="neu-btn gold" data-act="train">1 Birlik Eğit</button>
        <button class="neu-btn" data-act="train-five">5 Birlik</button>
        <button class="neu-btn slim" data-act="upgrade-unit">Güçlendir</button>
      </div>`;
  }

  private research(game: Game) {
    const locked = game.narrative.lockedCount();
    const pages = game.narrative
      .knownScrolls()
      .slice(-5)
      .reverse()
      .map((scroll) => `<article class="neu-card scroll"><div class="eyebrow">Parşömen ${scroll.level} · ${scroll.tone}</div><h3>${scroll.title}</h3><p>${scroll.body}</p></article>`)
      .join("");
    return `
      <div class="sheet-head"><h2>Gizli Günlük</h2><button class="neu-btn slim ghost" data-act="close-sheet">Paneli kapat</button></div>
      <p>1–39 yanlış iz, 40. kırılma, 100. gerçek. Kalan mühür: ${locked}.</p>
      ${pages}
      <p class="fine">${game.narrative.shadowTempleRevealed ? "Gölge Tapınağı açıldı." : "Gölge Tapınağı 40. mühürde."} ${game.narrative.finaleRevealed ? "Gölge Elçisi ortaya çıktı." : "Elçi 100. mühürde bekliyor."}</p>
      <div class="row">
        <button class="neu-btn slim" data-act="ad" data-arg="fast_production">Reklam: Üretim</button>
        <button class="neu-btn slim" data-act="ad" data-arg="diamond">Reklam: Elmas</button>
      </div>`;
  }
}

function fmt(n: number): string {
  if (n >= 10_000) return `${(n / 1000).toFixed(1)}K`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(Math.floor(n));
}
