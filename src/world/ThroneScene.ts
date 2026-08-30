import * as THREE from "three";
import { makeBanner, stylizedPerson, toyMaterial } from "./materials";

export class ThroneScene {
  readonly root = new THREE.Group();
  readonly daggerLight: THREE.PointLight;
  private dagger: THREE.Group;
  private torches: THREE.PointLight[] = [];

  constructor() {
    this.root.name = "throne-room";
    this.buildHall();
    this.buildThrone();
    this.dagger = this.buildDagger();
    this.root.add(this.dagger);
    this.daggerLight = new THREE.PointLight(0xb388ff, 4.2, 14, 1.6);
    this.daggerLight.position.set(0, 1.55, 0.35);
    this.root.add(this.daggerLight);
    this.hangBanners();
    this.placeTorches();
    this.placeHonorGuard();
  }

  update(elapsed: number) {
    const pulse = 0.55 + Math.sin(elapsed * 2.2) * 0.25;
    this.daggerLight.intensity = 3.4 + pulse * 2.2;
    this.dagger.position.y = 1.15 + Math.sin(elapsed * 1.6) * 0.03;
    this.dagger.rotation.y = Math.sin(elapsed * 0.35) * 0.08;
    for (const torch of this.torches) {
      torch.intensity = 1.6 + Math.sin(elapsed * 7 + torch.position.x) * 0.35;
    }
  }

  private buildHall() {
    const floor = new THREE.Mesh(new THREE.BoxGeometry(16, 0.35, 18), toyMaterial(0x6b3f24, { roughness: 0.7 }));
    floor.position.y = -0.17;
    floor.receiveShadow = true;
    const rug = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.06, 7), toyMaterial(0x8b1e1e, { roughness: 0.55 }));
    rug.position.set(0, 0.04, 1.2);
    const back = new THREE.Mesh(new THREE.BoxGeometry(16, 9, 0.4), toyMaterial(0x4a3328, { roughness: 0.65 }));
    back.position.set(0, 4.2, -6.4);
    const window = new THREE.Mesh(new THREE.CircleGeometry(1.7, 32), toyMaterial(0x9fd4ff, { emissive: 0x7ec8ff, emit: 0.65, roughness: 0.2 }));
    window.position.set(0, 5.1, -6.15);
    const left = new THREE.Mesh(new THREE.BoxGeometry(0.4, 9, 18), toyMaterial(0x3d2a22));
    left.position.set(-8, 4.2, 0);
    const right = left.clone();
    right.position.x = 8;
    const beam = new THREE.Mesh(new THREE.BoxGeometry(16, 0.35, 0.35), toyMaterial(0x2d1b14, { roughness: 0.8 }));
    beam.position.set(0, 7.6, -2);
    this.root.add(floor, rug, back, window, left, right, beam);
  }

  private buildThrone() {
    const seat = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.35, 1.4), toyMaterial(0x5a2e16, { roughness: 0.45, metal: 0.1 }));
    seat.position.set(0, 0.85, -2.1);
    const cushion = new THREE.Mesh(new THREE.BoxGeometry(1.45, 0.18, 1.15), toyMaterial(0xa11d2a, { roughness: 0.5 }));
    cushion.position.set(0, 1.1, -2.05);
    const back = new THREE.Mesh(new THREE.BoxGeometry(1.7, 2.2, 0.32), toyMaterial(0x4a2412, { metal: 0.12 }));
    back.position.set(0, 2.1, -2.7);
    const crest = new THREE.Mesh(new THREE.SphereGeometry(0.28, 12, 12), toyMaterial(0xd4af37, { metal: 0.7, roughness: 0.25 }));
    crest.position.set(0, 3.35, -2.7);
    const jewel = new THREE.Mesh(new THREE.OctahedronGeometry(0.1), toyMaterial(0x7b1fa2, { emissive: 0x9c27b0, emit: 0.8 }));
    jewel.position.set(0, 3.55, -2.55);
    const armL = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.7, 1.2), toyMaterial(0x5a2e16));
    armL.position.set(-0.85, 1.15, -2.15);
    const armR = armL.clone();
    armR.position.x = 0.85;
    const lionL = new THREE.Mesh(new THREE.SphereGeometry(0.16, 10, 10), toyMaterial(0xd4af37, { metal: 0.6 }));
    lionL.position.set(-0.85, 1.55, -1.55);
    const lionR = lionL.clone();
    lionR.position.x = 0.85;
    for (const mesh of [seat, cushion, back, crest, jewel, armL, armR, lionL, lionR]) {
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      this.root.add(mesh);
    }
  }

  private buildDagger(): THREE.Group {
    const g = new THREE.Group();
    g.position.set(0, 1.18, -2.0);
    const blade = new THREE.Mesh(
      new THREE.ConeGeometry(0.07, 0.85, 6),
      toyMaterial(0xe1bee7, { metal: 0.55, roughness: 0.15, emissive: 0x9c27b0, emit: 1.2 }),
    );
    blade.rotation.x = Math.PI;
    blade.position.y = 0.15;
    const hilt = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.07, 0.32, 10), toyMaterial(0x6a1b9a, { metal: 0.35, emissive: 0x4a148c, emit: 0.6 }));
    hilt.position.y = 0.68;
    const gem = new THREE.Mesh(new THREE.OctahedronGeometry(0.12), toyMaterial(0xce93d8, { emissive: 0xea80fc, emit: 1.4, metal: 0.2 }));
    gem.position.y = 0.9;
    g.add(blade, hilt, gem);
    return g;
  }

  private hangBanners() {
    const specs: Array<[number, number, number]> = [
      [0xb71c1c, 0xf4d03f, -3.4],
      [0x1565c0, 0xeceff1, 0],
      [0x37474f, 0xcfd8dc, 3.4],
    ];
    for (const [cloth, emblem, x] of specs) {
      const banner = makeBanner(cloth, emblem);
      banner.position.set(x, 3.4, -6.05);
      this.root.add(banner);
    }
  }

  private placeTorches() {
    for (const x of [-5.2, 5.2]) {
      const light = new THREE.PointLight(0xff9933, 1.8, 10, 2);
      light.position.set(x, 3.2, -1.4);
      light.castShadow = true;
      this.torches.push(light);
      const bowl = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8), toyMaterial(0xffcc66, { emissive: 0xff8f00, emit: 0.9 }));
      bowl.position.copy(light.position);
      this.root.add(light, bowl);
    }
  }

  private placeHonorGuard() {
    const left = stylizedPerson(0x7b241c, 0xd4ac0d, "helm");
    left.position.set(-2.4, 0, 1.6);
    const right = stylizedPerson(0xc0392b, 0xf4d03f, "turban");
    right.position.set(2.4, 0, 1.6);
    this.root.add(left, right);
  }
}
