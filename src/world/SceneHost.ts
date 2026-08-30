import * as THREE from "three";
import type { GamePhase } from "../core/types";
import type { Palette } from "../managers/NarrativeManager";
import { BattleScene } from "./BattleScene";
import { applyPalette } from "./materials";
import { ThroneScene } from "./ThroneScene";
import { VillageScene } from "./VillageScene";

export class SceneHost {
  readonly renderer: THREE.WebGLRenderer;
  readonly scene = new THREE.Scene();
  readonly camera: THREE.PerspectiveCamera;
  readonly throne = new ThroneScene();
  readonly village = new VillageScene();
  readonly battle = new BattleScene();
  private readonly ambient = new THREE.AmbientLight(0x7a5040, 0.7);
  private readonly sun = new THREE.DirectionalLight(0xffcc66, 1.15);
  private readonly rim = new THREE.DirectionalLight(0x8ec8ff, 0.35);
  private elapsed = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.12;
    this.camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 80);
    this.sun.position.set(6, 10, 4);
    this.sun.castShadow = true;
    this.sun.intensity = 1.55;
    this.sun.shadow.mapSize.set(1024, 1024);
    this.rim.position.set(-8, 4, -6);
    this.ambient.intensity = 0.95;
    this.scene.add(this.ambient, this.sun, this.rim, this.throne.root, this.village.root, this.battle.root);
    this.show("intro");
    window.addEventListener("resize", () => this.resize());
  }

  apply(palette: Palette) {
    applyPalette(this.scene, { ambient: this.ambient, fill: this.sun }, palette);
    this.renderer.toneMappingExposure = 0.95 + palette.bloom * 0.18;
  }

  show(phase: GamePhase) {
    this.throne.root.visible = phase === "intro" || phase === "menu" || phase === "boot";
    this.village.root.visible = phase === "build" || phase === "journal" || phase === "dialogue" || phase === "explore";
    this.battle.root.visible = phase === "battle";
  }

  resize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  frame(dt: number) {
    this.elapsed += dt;
    this.throne.update(this.elapsed);
    this.village.update(this.elapsed);
    this.battle.update(this.elapsed);
    this.placeCamera();
    this.renderer.render(this.scene, this.camera);
  }

  private placeCamera() {
    if (this.throne.root.visible) {
      const t = this.elapsed;
      this.camera.position.set(Math.sin(t * 0.12) * 1.4, 2.5 + Math.sin(t * 0.2) * 0.15, 6.4);
      this.camera.lookAt(0, 1.6, -2.1);
      return;
    }
    if (this.battle.root.visible) {
      this.camera.position.set(0.4, 5.4, 8.2);
      this.camera.lookAt(0, 0.6, 0);
      return;
    }
    this.camera.position.set(-1.2, 7.4, 10.2);
    this.camera.lookAt(0, 0.8, 0.2);
  }
}
