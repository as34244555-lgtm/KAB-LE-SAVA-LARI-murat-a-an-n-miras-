import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { SSAOPass } from "three/examples/jsm/postprocessing/SSAOPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import type { GamePhase } from "../core/types";
import type { Palette } from "../managers/NarrativeManager";
import { BattleScene } from "./BattleScene";
import { applyPalette } from "./materials";
import { maps } from "./textures";
import { ThroneScene } from "./ThroneScene";
import { VillageScene } from "./VillageScene";

export class SceneHost {
  readonly renderer: THREE.WebGLRenderer;
  readonly scene = new THREE.Scene();
  readonly camera: THREE.PerspectiveCamera;
  readonly throne = new ThroneScene();
  readonly village = new VillageScene();
  readonly battle = new BattleScene();
  private readonly ambient = new THREE.HemisphereLight(0xb7c4d4, 0x3d3228, 0.62);
  private readonly sun = new THREE.DirectionalLight(0xffe2c4, 2.15);
  private readonly rim = new THREE.DirectionalLight(0x6f84a0, 0.35);
  private readonly fill = new THREE.AmbientLight(0x6a6258, 0.18);
  private readonly composer: EffectComposer;
  private readonly bloom: UnrealBloomPass;
  private readonly ssao: SSAOPass;
  private readonly sky: THREE.Mesh;
  private elapsed = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;
    this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 140);

    const pmrem = new THREE.PMREMGenerator(this.renderer);
    this.scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.06).texture;
    this.scene.environmentIntensity = 0.45;

    this.sun.position.set(12, 16, 8);
    this.sun.castShadow = true;
    this.sun.shadow.mapSize.set(2048, 2048);
    this.sun.shadow.bias = -0.00025;
    this.sun.shadow.normalBias = 0.03;
    this.sun.shadow.camera.near = 1;
    this.sun.shadow.camera.far = 50;
    this.sun.shadow.camera.left = -20;
    this.sun.shadow.camera.right = 20;
    this.sun.shadow.camera.top = 20;
    this.sun.shadow.camera.bottom = -20;
    this.rim.position.set(-12, 7, -9);
    this.sky = new THREE.Mesh(
      new THREE.SphereGeometry(70, 32, 18),
      new THREE.MeshBasicMaterial({ map: maps.sky, side: THREE.BackSide }),
    );
    this.scene.add(this.ambient, this.sun, this.rim, this.fill, this.sky, this.throne.root, this.village.root, this.battle.root);

    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    this.ssao = new SSAOPass(this.scene, this.camera, window.innerWidth, window.innerHeight);
    this.ssao.kernelRadius = 12;
    this.ssao.minDistance = 0.002;
    this.ssao.maxDistance = 0.12;
    this.composer.addPass(this.ssao);
    this.bloom = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.12, 0.4, 0.82);
    this.composer.addPass(this.bloom);
    this.composer.addPass(new OutputPass());

    this.show("intro");
    window.addEventListener("resize", () => this.resize());
  }

  apply(palette: Palette, paintedSky = true) {
    applyPalette(this.scene, { ambient: this.fill, fill: this.sun }, palette, paintedSky);
    this.ambient.color.setHex(palette.ambient);
    this.sky.visible = paintedSky;
    this.bloom.strength = 0.08 + palette.bloom * 0.06;
    this.renderer.toneMappingExposure = 0.98 + palette.bloom * 0.04;
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
    this.camera.position.set(7.2, 5.1, 10.4);
    this.camera.lookAt(0.2, 1.15, -1.4);
  }
}
