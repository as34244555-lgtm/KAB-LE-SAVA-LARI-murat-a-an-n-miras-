import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { SSAOPass } from "three/examples/jsm/postprocessing/SSAOPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import type { GamePhase } from "../core/types";
import type { Palette } from "../managers/NarrativeManager";
import { BattleScene } from "./BattleScene";
import { applyPalette } from "./materials";
import { loadProps } from "./props";
import { ThroneScene } from "./ThroneScene";
import { VillageScene } from "./VillageScene";
import { loadSoldierRig } from "./soldiers";

export class SceneHost {
  readonly renderer: THREE.WebGLRenderer;
  readonly scene = new THREE.Scene();
  readonly camera: THREE.PerspectiveCamera;
  readonly throne = new ThroneScene();
  readonly village = new VillageScene();
  readonly battle = new BattleScene();
  private readonly ambient = new THREE.HemisphereLight(0xc9d4e0, 0x3d3228, 0.55);
  private readonly sun = new THREE.DirectionalLight(0xffe2c4, 2.6);
  private readonly rim = new THREE.DirectionalLight(0x7f93b0, 0.45);
  private readonly fill = new THREE.AmbientLight(0x6a6258, 0.16);
  private readonly composer: EffectComposer;
  private readonly bloom: UnrealBloomPass;
  private readonly ssao: SSAOPass;
  private elapsed = 0;
  private hdriReady = false;

  constructor(canvas: HTMLCanvasElement) {
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    this.renderer.setClearColor(0x2a2018, 1);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.12;
    this.camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 220);

    const pmrem = new THREE.PMREMGenerator(this.renderer);
    this.scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    this.scene.environmentIntensity = 0.7;
    this.scene.background = new THREE.Color(0x6a8498);
    this.scene.backgroundBlurriness = 0.04;

    this.sun.position.set(14, 18, 9);
    this.sun.castShadow = true;
    this.sun.shadow.mapSize.set(2048, 2048);
    this.sun.shadow.bias = -0.00025;
    this.sun.shadow.normalBias = 0.03;
    this.sun.shadow.camera.near = 1;
    this.sun.shadow.camera.far = 70;
    this.sun.shadow.camera.left = -28;
    this.sun.shadow.camera.right = 28;
    this.sun.shadow.camera.top = 24;
    this.sun.shadow.camera.bottom = -24;
    this.rim.position.set(-14, 8, -10);
    this.scene.add(this.ambient, this.sun, this.rim, this.fill, this.throne.root, this.village.root, this.battle.root);

    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    this.ssao = new SSAOPass(this.scene, this.camera, window.innerWidth, window.innerHeight);
    this.ssao.kernelRadius = 8;
    this.ssao.minDistance = 0.003;
    this.ssao.maxDistance = 0.08;
    this.composer.addPass(this.ssao);
    this.bloom = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.16, 0.42, 0.78);
    this.composer.addPass(this.bloom);
    this.composer.addPass(new OutputPass());

    this.show("intro");
    void this.bootAssets(pmrem);
    window.addEventListener("resize", () => this.resize());
  }

  private async bootAssets(pmrem: THREE.PMREMGenerator) {
    await Promise.all([
      loadSoldierRig().catch(() => undefined),
      loadProps().catch(() => undefined),
      this.loadHdri(pmrem).catch(() => undefined),
    ]);
    this.village.refreshUnits();
    this.village.dressProps();
    this.battle.refreshFighters();
  }

  private loadHdri(pmrem: THREE.PMREMGenerator): Promise<void> {
    return new Promise((resolve, reject) => {
      new RGBELoader().load(
        "/hdri/sunrise.hdr",
        (hdr) => {
          hdr.mapping = THREE.EquirectangularReflectionMapping;
          const env = pmrem.fromEquirectangular(hdr).texture;
          this.scene.environment = env;
          this.scene.background = hdr;
          this.scene.environmentIntensity = 1.2;
          this.scene.backgroundBlurriness = 0.02;
          this.scene.backgroundIntensity = 1;
          this.hdriReady = true;
          resolve();
        },
        undefined,
        reject,
      );
    });
  }

  apply(palette: Palette, paintedSky = true) {
    applyPalette(this.scene, { ambient: this.fill, fill: this.sun }, palette, paintedSky && !this.hdriReady);
    this.ambient.color.setHex(palette.ambient);
    this.bloom.strength = 0.1 + palette.bloom * 0.07;
    this.renderer.toneMappingExposure = 1.02 + palette.bloom * 0.05;
    if (this.hdriReady) {
      this.scene.fog = new THREE.FogExp2(palette.fog, Math.min(0.012, palette.fogDensity * 0.18));
      this.scene.backgroundBlurriness = paintedSky ? 0.02 : 0.28;
    }
  }

  show(phase: GamePhase) {
    this.throne.root.visible = phase === "intro" || phase === "menu" || phase === "boot";
    this.village.root.visible = phase === "build" || phase === "journal" || phase === "dialogue" || phase === "explore";
    this.battle.root.visible = phase === "battle";
    if (this.hdriReady) {
      this.scene.environmentIntensity = this.throne.root.visible ? 0.42 : 1.05;
    }
  }

  resize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.composer.setSize(window.innerWidth, window.innerHeight);
    this.ssao.setSize(window.innerWidth, window.innerHeight);
  }

  frame(dt: number) {
    this.elapsed += dt;
    this.throne.update(this.elapsed);
    this.village.update(this.elapsed);
    this.battle.update(this.elapsed);
    this.placeCamera();
    this.composer.render();
  }

  private placeCamera() {
    if (this.throne.root.visible) {
      const t = this.elapsed;
      this.camera.position.set(Math.sin(t * 0.12) * 1.4, 2.5 + Math.sin(t * 0.2) * 0.15, 6.4);
      this.camera.lookAt(0, 1.6, -2.1);
      return;
    }
    if (this.battle.root.visible) {
      this.camera.position.set(1.2, 3.4, 8.6);
      this.camera.lookAt(0, 1.1, 0);
      return;
    }
    this.camera.position.set(9.4, 6.2, 12.4);
    this.camera.lookAt(-0.4, 1.6, -3.8);
  }
}
