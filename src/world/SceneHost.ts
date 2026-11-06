import * as THREE from "three";
import type { GamePhase, PlayerSave } from "../core/types";
import type { Palette } from "../managers/NarrativeManager";
import { BattleScene } from "./BattleScene";
import { HexMapScene } from "./HexMapScene";
import { applyPalette } from "./materials";
import { ThroneScene } from "./ThroneScene";
import { pixelCap } from "./perf";

export class SceneHost {
  readonly renderer: THREE.WebGLRenderer;
  readonly scene = new THREE.Scene();
  readonly camera: THREE.PerspectiveCamera;
  readonly throne = new ThroneScene();
  readonly battle = new BattleScene();
  readonly hexMap: HexMapScene;
  private readonly ambient = new THREE.HemisphereLight(0xc9d4e0, 0x3d3228, 0.62);
  private readonly sun = new THREE.DirectionalLight(0xffe2c4, 2.1);
  private readonly fill = new THREE.AmbientLight(0x6a6258, 0.22);
  private elapsed = 0;
  private hidden = false;

  constructor(canvas: HTMLCanvasElement) {
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: false,
      stencil: false,
      powerPreference: "low-power",
    });
    this.renderer.setClearColor(0x2a2018, 1);
    this.renderer.setPixelRatio(pixelCap());
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = false;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;
    this.camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.2, 280);

    this.scene.environment = null;
    this.scene.environmentIntensity = 0;
    this.scene.background = new THREE.Color(0x3a3428);
    this.scene.fog = new THREE.FogExp2(0x4a4034, 0.012);

    this.sun.position.set(14, 18, 9);
    this.sun.castShadow = false;
    this.hexMap = new HexMapScene(canvas, this.camera);
    this.scene.add(this.ambient, this.sun, this.fill, this.throne.root, this.battle.root, this.hexMap.root);

    this.show("intro");
    window.addEventListener("resize", () => this.resize());
    document.addEventListener("visibilitychange", () => {
      this.hidden = document.hidden;
    });
  }

  apply(palette: Palette, paintedSky = true) {
    applyPalette(this.scene, { ambient: this.fill, fill: this.sun }, palette, paintedSky);
    this.ambient.color.setHex(palette.ambient);
    this.renderer.toneMappingExposure = paintedSky ? 1.0 + palette.bloom * 0.02 : 1.02;
    if (!paintedSky) {
      this.scene.background = new THREE.Color(0x3a3428);
      this.scene.fog = new THREE.FogExp2(0x4a4034, 0.01);
    } else {
      this.scene.fog = new THREE.FogExp2(palette.fog, Math.min(0.018, palette.fogDensity * 0.35));
    }
  }

  show(phase: GamePhase) {
    this.throne.root.visible = phase === "intro" || phase === "menu" || phase === "boot";
    this.hexMap.root.visible = phase === "map" || phase === "build" || phase === "pick";
    this.hexMap.active = phase === "map" || phase === "build" || phase === "pick";
    this.battle.root.visible = phase === "battle";
    this.scene.environmentIntensity = 0;
  }

  syncMap(save: PlayerSave) {
    this.hexMap.sync(save);
  }

  resize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setPixelRatio(pixelCap());
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  frame(dt: number) {
    if (this.hidden) return;
    this.elapsed += dt;
    if (this.throne.root.visible) this.throne.update(this.elapsed);
    if (this.battle.root.visible) this.battle.update(this.elapsed, dt);
    if (this.hexMap.root.visible) this.hexMap.update(this.elapsed);
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
      const t = this.elapsed;
      this.camera.position.set(Math.sin(t * 0.35) * 2.4 + 0.4, 3.6, 7.8 + Math.cos(t * 0.28) * 0.8);
      this.camera.lookAt(0, 1.05, 0);
      return;
    }
    if (this.hexMap.root.visible) {
      this.hexMap.placeCamera();
    }
  }
}
