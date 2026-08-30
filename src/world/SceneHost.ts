import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
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
  private readonly ambient = new THREE.HemisphereLight(0xffd4a8, 0x6a5340, 1.05);
  private readonly sun = new THREE.DirectionalLight(0xffc27a, 1.85);
  private readonly rim = new THREE.DirectionalLight(0x8eb8ff, 0.4);
  private readonly fill = new THREE.AmbientLight(0xffe6c8, 0.28);
  private readonly composer: EffectComposer;
  private readonly bloom: UnrealBloomPass;
  private readonly sky: THREE.Mesh;
  private elapsed = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.18;
    this.camera = new THREE.PerspectiveCamera(38, window.innerWidth / window.innerHeight, 0.1, 120);
    this.sun.position.set(10, 12, 6);
    this.sun.castShadow = true;
    this.sun.shadow.mapSize.set(2048, 2048);
    this.sun.shadow.camera.near = 1;
    this.sun.shadow.camera.far = 40;
    this.sun.shadow.camera.left = -16;
    this.sun.shadow.camera.right = 16;
    this.sun.shadow.camera.top = 16;
    this.sun.shadow.camera.bottom = -16;
    this.rim.position.set(-10, 6, -8);
    this.sky = new THREE.Mesh(
      new THREE.SphereGeometry(60, 32, 18),
      new THREE.MeshBasicMaterial({ map: maps.sky, side: THREE.BackSide }),
    );
    this.scene.add(this.ambient, this.sun, this.rim, this.fill, this.sky, this.throne.root, this.village.root, this.battle.root);

    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    this.bloom = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.28, 0.6, 0.72);
    this.composer.addPass(this.bloom);
    this.composer.addPass(new OutputPass());

    this.show("intro");
    window.addEventListener("resize", () => this.resize());
  }

  apply(palette: Palette, paintedSky = true) {
    applyPalette(this.scene, { ambient: this.fill, fill: this.sun }, palette, paintedSky);
    this.ambient.color.setHex(palette.torch);
    this.sky.visible = paintedSky;
    this.bloom.strength = 0.18 + palette.bloom * 0.16;
    this.renderer.toneMappingExposure = 1.02 + palette.bloom * 0.12;
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
      this.camera.position.set(0.6, 6.2, 9.4);
      this.camera.lookAt(0, 0.7, 0);
      return;
    }
    this.camera.position.set(5.4, 4.6, 8.2);
    this.camera.lookAt(0.1, 0.85, -1.1);
  }
}
