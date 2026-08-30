import { bus } from "./core/EventBus";
import { Game } from "./core/Game";
import type { GamePhase } from "./core/types";
import { UIRoot } from "./ui/UIRoot";
import { SceneHost } from "./world/SceneHost";
import "./style.css";

const app = document.querySelector<HTMLDivElement>("#app");
const canvas = document.querySelector<HTMLCanvasElement>("#stage");
if (!app || !canvas) throw new Error("Sahne kökü bulunamadı.");

const game = new Game();
const ui = new UIRoot(app);
const world = new SceneHost(canvas);

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
    return go("build");
  }
  if (name === "continue") {
    const ok = await game.bootFromDisk();
    if (!ok) game.newGame();
    return go("build");
  }
  if (name === "nav" && payload) return go(payload as GamePhase);
  if (name === "menu") return go("menu");
  if (name === "build" && payload) game.toast = game.buildOrUpgrade(payload as never);
  if (name === "train" && payload) game.toast = game.train(payload as never);
  if (name === "upgrade-unit" && payload) game.toast = game.upgradeUnit(payload as never);
  if (name === "caravan") game.toast = game.sendCaravan();
  if (name === "fight" && payload) {
    game.fight(payload as never);
    if (game.lastEnemy) world.battle.stage(playerArmy(), game.lastEnemy);
    return go("battle");
  }
  if (name === "quest" && payload) game.toast = game.completeQuest(payload);
  if (name === "ad" && payload) game.toast = await game.watchAd(payload as never);
  if (name === "save") {
    await game.persist();
    game.toast = "Kayıt mühürlendi. Hançerin gölgesi yerel kasada uyuyor.";
  }
  paint();
});

bus.on("levelup", () => {
  world.apply(game.narrative.palette(game.levels.currentLevel));
  game.audio.setTheme(game.narrative.palette(game.levels.currentLevel).music).catch(() => undefined);
});

function playerArmy() {
  return (["sariklilar", "gokhanli", "demirhisar"] as const).map((id) => ({
    tribe: id,
    name: id,
    count: game.data.army[id],
    level: game.data.unitLevels[id],
    hp: 1,
    maxHp: 1,
    attack: 1,
    defense: 1,
    critChance: 0,
    aoe: 0,
  }));
}

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
  world.apply(game.narrative.palette(game.levels.currentLevel));
  world.village.sync(game.data);
  paint();
}

function paint() {
  world.village.sync(game.data);
  ui.render(game, screen);
}

let last = performance.now();
let saveAcc = 0;
function loop(now: number) {
  const dt = Math.min(100, now - last);
  last = now;
  game.tick(dt);
  saveAcc += dt;
  if (saveAcc > 8000) {
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
