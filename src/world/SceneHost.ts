import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import type { GamePhase, PlayerSave } from "../core/types";
import type { Palette } from "../managers/NarrativeManager";
import { BattleScene } from "./BattleScene";
import { HexMapScene } from "./HexMapScene";
import { applyPalette } from "./materials";
import { ThroneScene } from "./ThroneScene";
import { isMobileClient, pixelCap } from "./perf";

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
  private readonly composer: EffectComposer | null;
  private readonly bloom: UnrealBloomPass | null;
  private readonly mobile = isMobileClient();
  private elapsed = 0;
  private hidden = false;

  constructor(canvas: HTMLCanvasElement) {
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: !this.mobile, alpha: false, powerPreference: "high-performance" });
    this.renderer.setClearColor(0x2a2018, 1);
    this.renderer.setPixelRatio(pixelCap());
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = !this.mobile;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.08;
    this.camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.2, 420);

    const pmrem = new THREE.PMREMGenerator(this.renderer);
    this.scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.08).texture;
    this.scene.environmentIntensity = 0.85;
    this.scene.background = new THREE.Color(0x3a3428);
    this.scene.fog = new THREE.FogExp2(0x4a4034, 0.01);

    this.sun.position.set(14, 18, 9);
    this.sun.castShadow = !this.mobile;
    if (this.sun.castShadow) {
      this.sun.shadow.mapSize.set(1024, 1024);
      this.sun.shadow.camera.near = 2;
      this.sun.shadow.camera.far = 50;
      this.sun.shadow.camera.left = -16;
      this.sun.shadow.camera.right = 16;
      this.sun.shadow.camera.top = 14;
      this.sun.shadow.camera.bottom = -14;
    }
    this.hexMap = new HexMapScene(canvas, this.camera);
    this.scene.add(this.ambient, this.sun, this.fill, this.throne.root, this.battle.root, this.hexMap.root);

    if (this.mobile) {
      this.composer = null;
      this.bloom = null;
    } else {
      this.composer = new EffectComposer(this.renderer);
      this.composer.addPass(new RenderPass(this.scene, this.camera));
      this.bloom = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.12, 0.4, 0.82);
      this.composer.addPass(this.bloom);
      this.composer.addPass(new OutputPass());
    }

    this.show("intro");
    window.addEventListener("resize", () => this.resize());
    document.addEventListener("visibilitychange", () => {
      this.hidden = document.hidden;
    });
  }

  apply(palette: Palette, paintedSky = true) {
    applyPalette(this.scene, { ambient: this.fill, fill: this.sun }, palette, paintedSky);
    this.ambient.color.setHex(palette.ambient);
    if (this.bloom) this.bloom.strength = paintedSky ? 0.08 + palette.bloom * 0.05 : 0.02;
    this.renderer.toneMappingExposure = paintedSky ? 1.0 + palette.bloom * 0.04 : 1.02;
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
    this.scene.environmentIntensity = this.throne.root.visible ? 0.45 : 0.9;
  }

  syncMap(save: PlayerSave) {
    this.hexMap.sync(save);
  }

  resize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.composer?.setSize(window.innerWidth, window.innerHeight);
  }

  frame(dt: number) {
    if (this.hidden) return;
    this.elapsed += dt;
    if (this.throne.root.visible) this.throne.update(this.elapsed);
    if (this.battle.root.visible) this.battle.update(this.elapsed, dt);
    if (this.hexMap.root.visible) this.hexMap.update(this.elapsed);
    this.placeCamera();
    if (this.composer) this.composer.render();
    else this.renderer.render(this.scene, this.camera);
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
