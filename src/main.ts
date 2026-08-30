import { bus } from "./core/EventBus";
import { Game } from "./core/Game";
import type { DockPanel, GamePhase, PlayableTribe } from "./core/types";
import { UIRoot } from "./ui/UIRoot";
import { SceneHost } from "./world/SceneHost";
import "./style.css";

const app = document.querySelector<HTMLDivElement>("#app");
const canvas = document.querySelector<HTMLCanvasElement>("#stage");
if (!app || !canvas) throw new Error("Sahne kökü bulunamadı.");

const game = new Game();
const ui = new UIRoot(app);
const world = new SceneHost(canvas);
if (import.meta.env.DEV) {
  (window as Window & { ks?: Game }).ks = game;
}

let screen: GamePhase = "intro";
game.state.force("intro");
world.show("intro");
world.apply(game.narrative.palette(1));
ui.render(game, "intro");

ui.bind(async (name, payload) => {
  game.audio.play().catch(() => undefined);
  if (name === "finish-intro") return go("menu");
  if (name === "new-game") {
    game.newGame();
    await game.persist();
    return go("pick");
  }
  if (name === "continue") {
    const ok = await game.bootFromDisk();
    if (!ok) {
      game.newGame();
      return go("pick");
    }
    return go(game.continueGame() ? "map" : "pick");
  }
  if (name === "choose-tribe" && payload) {
    game.chooseTribe(payload as PlayableTribe);
    return go("map");
  }
  if (name === "menu") return go("menu");
  if (name === "dock" && payload) game.togglePanel(payload as DockPanel);
  if (name === "close-sheet") game.closePanel();
  if (name === "deselect") game.selectHex(null);
  if (name === "build" && payload) game.toast = game.buildOrUpgrade(payload);
  if (name === "upgrade") game.toast = game.upgradeSelected();
  if (name === "train") game.toast = game.train(1);
  if (name === "train-five") game.toast = game.train(5);
  if (name === "train-unit" && payload) game.toast = game.trainUnit(payload);
  if (name === "upgrade-unit") game.toast = game.upgradeUnit();
  if (name === "caravan") game.toast = game.sendCaravan();
  if (name === "stance" && payload) game.setStance(payload as "assault" | "ambush" | "hold");
  if (name === "commit" && payload) {
    if (payload === "all") game.setCommit(null);
    else if (payload === "half") game.setCommit(Math.max(4, Math.floor(game.data.army / 2)));
    else game.setCommit(Number(payload));
  }
  if (name === "attack") {
    game.toast = game.claimOrAttack(payload);
    if (game.wantsBattle && game.lastBattle && game.lastEnemy) {
      world.battle.stage(game.lastPlayerLine, game.lastEnemy);
      return go("battle");
    }
  }
  if (name === "continue-battle") {
    game.clearBattleFlag();
    return go("map");
  }
  if (name === "ad" && payload) game.toast = await game.watchAd(payload as never);
  if (name === "save") {
    await game.persist();
    game.toast = "Kayıt mühürlendi.";
  }
  paint();
});

bus.on("hex-select", (id: string) => {
  game.selectHex(id);
  paint();
});

bus.on("explore", (at: { q: number; r: number }) => {
  if (game.ensureAround(at.q, at.r)) paint();
  else world.syncMap(game.data);
});

bus.on("levelup", () => {
  const painted = screen === "intro" || screen === "menu" || screen === "boot";
  world.apply(game.narrative.palette(game.levels.currentLevel), painted);
  game.audio.setTheme(game.narrative.palette(game.levels.currentLevel).music).catch(() => undefined);
});

function go(next: GamePhase) {
  try {
    if (game.state.current === "boot") game.state.force(next);
    else if (game.state.canEnter(next)) game.state.enter(next);
    else game.state.force(next);
  } catch {
    game.state.force(next);
  }
  screen = next;
  world.show(next);
  const painted = next === "intro" || next === "menu" || next === "boot";
  world.apply(game.narrative.palette(game.levels.currentLevel), painted);
  paint();
}

function paint() {
  world.syncMap(game.data);
  game.mapDirty = false;
  ui.render(game, screen);
}

let last = performance.now();
let saveAcc = 0;
function loop(now: number) {
  const dt = Math.min(100, now - last);
  last = now;
  game.tick(dt);
  saveAcc += dt;
  if (saveAcc > 20000) {
    saveAcc = 0;
    void game.persist();
  }
  world.frame(dt / 1000);
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

void game.bootFromDisk().then((ok) => {
  if (ok) game.hydrate();
});
