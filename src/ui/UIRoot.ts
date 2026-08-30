import { GAME_TITLE, type BuildingId, type GamePhase, type TribeId } from "../core/types";
import type { Game } from "../core/Game";
import { BUILDINGS } from "../data/buildings";
import { TRIBES } from "../data/tribes";
import { xpToNextLevel } from "../managers/LevelManager";

type Screen = GamePhase | "map";

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

  render(game: Game, screen: Screen, notice = "") {
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
    if (screen === "journal") {
      this.layer.innerHTML = this.shell(game, this.journal(game), toast, "journal");
      return;
    }
    if (screen === "dialogue") {
      this.layer.innerHTML = this.shell(game, this.dialogue(game), toast, "dialogue");
      return;
    }
    if (screen === "explore" || screen === "map") {
      this.layer.innerHTML = this.shell(game, this.map(game), toast, "explore");
      return;
    }
    if (screen === "battle") {
      this.layer.innerHTML = this.shell(game, this.battle(game), toast, "battle");
      return;
    }
    this.layer.innerHTML = this.shell(game, this.village(game), toast, "build");
  }

  private intro() {
    return `
      <section class="cinematic">
        <img class="plate" src="/art/throne.png" alt="Kanlı taht ve mor hançer" />
        <div class="vignette"></div>
        <div class="crawl neu-card">
          <p class="eyebrow">Hüzünlü ama kararlı</p>
          <h1>${GAME_TITLE}</h1>
          <p>Yüzyıllardır süren Büyük Barış, Murat Ağa'nın kalbine saplanan mor kabzalı hançerle bozuldu. Katil onu tahtına çiviledi.</p>
          <p>Üç kabile birbirini suçluyor. Sen vârisin kalemini taşıyorsun — bir köy inşa etmiyorsun; bir cinayeti çözüyor, bir mirası kurtarıyorsun.</p>
          <button class="neu-btn gold" data-act="finish-intro">Tahta Yaklaş</button>
        </div>
      </section>`;
  }

  private menu() {
    return `
      <section class="cinematic menu">
        <img class="plate" src="/art/throne.png" alt="Kanlı taht" />
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

  private shell(game: Game, body: string, toast: string, active: Screen) {
    const need = xpToNextLevel(game.levels.currentLevel);
    const xpLabel = Number.isFinite(need) ? `${game.levels.currentXp}/${need}` : "Maksimum";
    return `
      <header class="hud neu-bar">
        <div class="brand">
          <span class="gem"></span>
          <div>
            <strong>${GAME_TITLE.split(":")[0]}</strong>
            <small>Murat Ağa'nın Mirası</small>
          </div>
        </div>
        <div class="meters">
          <span class="chip gold-chip">Altın ${game.economy.gold}</span>
          <span class="chip dia-chip">Elmas ${game.economy.diamond}</span>
          <span class="chip">Sv ${game.levels.currentLevel} · ${xpLabel}</span>
        </div>
      </header>
      <nav class="dock">
        ${this.tab("build", "Köy", active)}
        ${this.tab("explore", "Keşif", active)}
        ${this.tab("battle", "Savaş", active)}
        ${this.tab("dialogue", "Kabileler", active)}
        ${this.tab("journal", "Parşömen", active)}
      </nav>
      <main class="stage">${body}</main>
      ${toast ? `<aside class="toast neu-card">${toast}</aside>` : ""}
      <footer class="ad-row">
        <button class="neu-btn slim" data-act="ad" data-arg="fast_production">Reklam: Hızlı Üretim</button>
        <button class="neu-btn slim" data-act="ad" data-arg="diamond">Reklam: Elmas</button>
        <button class="neu-btn slim" data-act="ad" data-arg="caravan_speed">Reklam: Kervan</button>
        <button class="neu-btn slim ghost" data-act="save">Mühürle</button>
        <button class="neu-btn slim ghost" data-act="menu">Menü</button>
      </footer>`;
  }

  private tab(id: Screen, label: string, active: Screen) {
    return `<button class="neu-btn tab ${active === id ? "on" : ""}" data-act="nav" data-arg="${id}">${label}</button>`;
  }

  private village(game: Game) {
    const chips = BUILDINGS.map((building) => {
      const level = game.data.buildingLevels[building.id] ?? 0;
      const locked = building.id === "shadowTemple" && !game.narrative.shadowTempleRevealed;
      const cost = locked ? null : game.economy.buildCost(building.id, level, game.levels);
      return `
        <button class="neu-btn chip-btn ${locked ? "locked" : ""}" data-act="build" data-arg="${building.id as BuildingId}" ${locked || !cost ? "disabled" : ""}>
          <strong>${building.name}</strong>
          <span>${locked ? "Sis" : cost ? (level === 0 ? `Kur ${cost.gold}A` : `Sv${level} · ${cost.gold}A`) : `Sv${level} tavan`}</span>
        </button>`;
    }).join("");

    const army = (["sariklilar", "gokhanli", "demirhisar"] as TribeId[])
      .map((id) => {
        const t = TRIBES[id];
        return `
          <button class="neu-btn chip-btn" data-act="train" data-arg="${id}">
            <strong>${t.name}</strong>
            <span>${game.data.army[id]} birim · eğit</span>
          </button>`;
      })
      .join("");

    const quest = game.quests.open(game.levels.currentLevel)[0];

    return `
      <section class="playfield">
        <div class="world-gap"></div>
        <div class="dock-strip neu-card">
          <div class="row">
            <strong>Köy — Boş tahtın gölgesi</strong>
            <button class="neu-btn gold slim" data-act="caravan">Kervan</button>
            ${quest ? `<button class="neu-btn slim" data-act="quest" data-arg="${quest.id}">${quest.title}</button>` : ""}
            <span class="fine">${game.caravan.busy ? `Yolda ${Math.ceil((game.caravan.current?.remainingMs ?? 0) / 1000)}s` : "Kervansaray hazır"}</span>
          </div>
          <div class="chips">${chips}${army}</div>
        </div>
      </section>`;
  }

  private journal(game: Game) {
    const items = game.narrative
      .knownScrolls()
      .map(
        (s) => `
        <article class="neu-card scroll">
          <div class="eyebrow">Parşömen ${s.level} · ${s.tone}</div>
          <h3>${s.title}</h3>
          <p>${s.body}</p>
        </article>`,
      )
      .join("");
    return `
      <section class="playfield">
        <div class="world-gap"></div>
        <div class="drawer journal">
          <article class="neu-card span">
            <h2>Gizli Günlük</h2>
            <p>Her seviye bir parça. 1–39 yanlış iz, 40. kırılma, 100. gerçek. Kalan mühür: ${game.narrative.lockedCount()}.</p>
          </article>
          ${items}
        </div>
      </section>`;
  }

  private dialogue(game: Game) {
    const tribes = (["sariklilar", "gokhanli", "demirhisar"] as TribeId[])
      .map((id) => {
        const lines = game.talk(id);
        const t = TRIBES[id];
        return `
          <article class="neu-card talk">
            <h3>${t.name}</h3>
            <p class="eyebrow">${t.epithet} · ${t.voice}</p>
            ${lines.map((line) => `<p class="line">“${line.text}”</p>`).join("")}
            <p class="barb">${t.accusation}</p>
          </article>`;
      })
      .join("");
    return `
      <section class="grid">
        <article class="neu-card span art-card">
          <img src="/art/heroes.png" alt="Dört figür: Sarıklılar, Gök-Hanlı, Demir-Hisar ve Vâris" />
        </article>
        ${tribes}
      </section>`;
  }

  private map(game: Game) {
    const nodes = game
      .unlockedTribes()
      .map(
        (tribe) => `
        <article class="neu-card tribe ${tribe.isShadowCult ? "shadow" : ""}">
          <h3>${tribe.name}</h3>
          <p class="eyebrow">${tribe.relation} · Seviye ${tribe.unlockLevel}</p>
          <p class="memory">${tribe.memory}</p>
          <p>${tribe.clue}</p>
        </article>`,
      )
      .join("");
    return `
      <section class="grid">
        <article class="neu-card span art-card">
          <img src="/art/fortress.png" alt="Toy-box kale ve dört bölmeli arma" />
          <h2>Sisli Harita</h2>
          <p>Her 10 seviyede bir yan kabile. Hepsi Murat Ağa'nın eski dostu veya düşmanı; her anı bir yapboz parçası.</p>
        </article>
        ${nodes || "<article class='neu-card'>Sis henüz kalın. Onuncu mühre kadar bekle.</article>"}
      </section>`;
  }

  private battle(game: Game) {
    const log = game.lastBattle?.log.slice(-8).map((line) => `<li>${line}</li>`).join("") ?? "<li>Henüz kılıç çekilmedi. Bir kabile seç.</li>";
    const picks = (["sariklilar", "gokhanli", "demirhisar"] as TribeId[])
      .map((id) => `<button class="neu-btn" data-act="fight" data-arg="${id}">${TRIBES[id].name} ile yüzleş</button>`)
      .join("");
    return `
      <section class="playfield">
        <div class="world-gap"></div>
        <div class="drawer">
          <article class="neu-card span">
            <h2>Savaş Dengesi</h2>
            <p>Sarıklılar (bomba) &gt; Demir-Hisar (zırh) &gt; Gök-Hanlı (kritik) &gt; Sarıklılar. Rakip gücü seviyeyle artar.</p>
            <div class="row">${picks}</div>
          </article>
          <article class="neu-card span log">
            <h3>${game.lastBattle ? (game.lastBattle.winner === "player" ? "Zafer" : game.lastBattle.winner === "enemy" ? "Yenilgi" : "Berabere") : "Saha sessiz"}</h3>
            <ul>${log}</ul>
          </article>
        </div>
      </section>`;
  }
}
