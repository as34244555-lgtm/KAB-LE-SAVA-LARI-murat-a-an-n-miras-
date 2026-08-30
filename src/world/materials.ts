import * as THREE from "three";
import type { Palette } from "../managers/NarrativeManager";

export function toyMaterial(color: string | number, opts: { roughness?: number; metal?: number; emissive?: number; emit?: number } = {}) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: opts.roughness ?? 0.42,
    metalness: opts.metal ?? 0.18,
    emissive: opts.emissive ?? 0x000000,
    emissiveIntensity: opts.emit ?? 0,
  });
}

export function applyPalette(
  scene: THREE.Scene,
  lights: { ambient: THREE.AmbientLight; fill: THREE.DirectionalLight },
  palette: Palette,
  paintedSky = true,
) {
  if (paintedSky) scene.background = new THREE.Color(palette.sky);
  scene.fog = new THREE.FogExp2(palette.fog, paintedSky ? palette.fogDensity : palette.fogDensity * 0.4);
  lights.ambient.color.setHex(palette.ambient);
  lights.fill.color.setHex(palette.torch);
}

export function roundedBox(w: number, h: number, d: number, radius = 0.12): THREE.ExtrudeGeometry {
  const shape = new THREE.Shape();
  const x = -w / 2;
  const y = -d / 2;
  const r = Math.min(radius, w / 2, d / 2);
  shape.moveTo(x + r, y);
  shape.lineTo(x + w - r, y);
  shape.quadraticCurveTo(x + w, y, x + w, y + r);
  shape.lineTo(x + w, y + d - r);
  shape.quadraticCurveTo(x + w, y + d, x + w - r, y + d);
  shape.lineTo(x + r, y + d);
  shape.quadraticCurveTo(x, y + d, x, y + d - r);
  shape.lineTo(x, y + r);
  shape.quadraticCurveTo(x, y, x + r, y);
  return new THREE.ExtrudeGeometry(shape, { depth: h, bevelEnabled: true, bevelThickness: 0.04, bevelSize: 0.04, bevelSegments: 2 });
}

export function makeBanner(color: number, emblem: number): THREE.Group {
  const group = new THREE.Group();
  const cloth = new THREE.Mesh(new THREE.PlaneGeometry(1.15, 1.7), toyMaterial(color, { roughness: 0.55 }));
  cloth.position.y = 0.2;
  const disc = new THREE.Mesh(new THREE.CircleGeometry(0.28, 24), toyMaterial(emblem, { metal: 0.45, roughness: 0.3 }));
  disc.position.set(0, 0.45, 0.03);
  group.add(cloth, disc);
  return group;
}

export function stylizedPerson(primary: number, accent: number, hat: "turban" | "hood" | "helm" | "none" = "none"): THREE.Group {
  const g = new THREE.Group();
  const skin = toyMaterial(0xc68642, { roughness: 0.62, metal: 0 });
  const cloth = toyMaterial(primary, { roughness: 0.78, metal: 0.02 });
  const leather = toyMaterial(0x3d2a1c, { roughness: 0.8 });
  const metal = toyMaterial(0x8a8e92, { metal: 0.82, roughness: 0.32 });

  const hip = new THREE.Mesh(new THREE.SphereGeometry(0.11, 12, 10), cloth);
  hip.position.y = 0.92;
  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.16, 0.34, 6, 10), cloth);
  torso.position.y = 1.22;
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.115, 16, 14), skin);
  head.position.y = 1.58;
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.05, 0.08, 8), skin);
  neck.position.y = 1.46;

  const addLimb = (x: number, y: number, z: number, r: number, h: number, mat: THREE.Material, rx = 0) => {
    const mesh = new THREE.Mesh(new THREE.CapsuleGeometry(r, h, 5, 8), mat);
    mesh.position.set(x, y, z);
    mesh.rotation.x = rx;
    g.add(mesh);
    return mesh;
  };
  addLimb(-0.08, 0.48, 0, 0.055, 0.38, leather);
  addLimb(0.08, 0.48, 0, 0.055, 0.38, leather);
  addLimb(-0.08, 0.16, 0.02, 0.05, 0.32, leather);
  addLimb(0.08, 0.16, 0.02, 0.05, 0.32, leather);
  const bootL = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.08, 0.16), leather);
  bootL.position.set(-0.08, 0.04, 0.04);
  const bootR = bootL.clone();
  bootR.position.x = 0.08;
  addLimb(-0.22, 1.18, 0, 0.045, 0.28, cloth, 0.15);
  addLimb(0.22, 1.18, 0, 0.045, 0.28, cloth, 0.15);
  addLimb(-0.24, 0.92, 0.02, 0.04, 0.26, skin, 0.1);
  addLimb(0.24, 0.92, 0.02, 0.04, 0.26, skin, 0.1);

  const brow = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.012, 0.02), toyMaterial(0x3a2414, { roughness: 0.7 }));
  brow.position.set(0, 1.61, 0.1);
  const eyeL = new THREE.Mesh(new THREE.SphereGeometry(0.014, 8, 6), toyMaterial(0x1a120c));
  eyeL.position.set(-0.035, 1.58, 0.1);
  const eyeR = eyeL.clone();
  eyeR.position.x = 0.035;

  g.add(hip, torso, head, neck, bootL, bootR, brow, eyeL, eyeR);

  if (hat === "turban") {
    const wrap = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.055, 10, 16), toyMaterial(accent, { roughness: 0.55, metal: 0.08 }));
    wrap.rotation.x = Math.PI / 2;
    wrap.position.y = 1.68;
    const cap = new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 10, 0, Math.PI * 2, 0, Math.PI / 2), toyMaterial(accent, { roughness: 0.5 }));
    cap.position.y = 1.7;
    g.add(wrap, cap);
  } else if (hat === "hood") {
    const hood = new THREE.Mesh(new THREE.SphereGeometry(0.14, 12, 10, 0, Math.PI * 2, 0, Math.PI / 1.6), toyMaterial(accent, { roughness: 0.7 }));
    hood.position.set(0, 1.62, -0.02);
    const cape = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.7, 0.06), toyMaterial(0x2a1238, { roughness: 0.75 }));
    cape.position.set(0, 1.05, -0.16);
    g.add(hood, cape);
  } else if (hat === "helm") {
    const helm = new THREE.Mesh(new THREE.SphereGeometry(0.13, 14, 12, 0, Math.PI * 2, 0, Math.PI / 1.7), metal);
    helm.position.y = 1.62;
    const nasal = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.08, 0.04), metal);
    nasal.position.set(0, 1.56, 0.11);
    const pauldronL = new THREE.Mesh(new THREE.SphereGeometry(0.08, 10, 8, 0, Math.PI, 0, Math.PI / 2), metal);
    pauldronL.position.set(-0.2, 1.4, 0);
    const pauldronR = pauldronL.clone();
    pauldronR.position.x = 0.2;
    g.add(helm, nasal, pauldronL, pauldronR);
  }

  g.traverse((obj) => {
    if (obj instanceof THREE.Mesh) {
      obj.castShadow = true;
      obj.receiveShadow = true;
    }
  });
  return g;
}
