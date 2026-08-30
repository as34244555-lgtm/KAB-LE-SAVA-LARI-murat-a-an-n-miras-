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

export function applyPalette(scene: THREE.Scene, lights: { ambient: THREE.AmbientLight; fill: THREE.DirectionalLight }, palette: Palette) {
  scene.background = new THREE.Color(palette.sky);
  scene.fog = new THREE.FogExp2(palette.fog, palette.fogDensity);
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
  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.22, 0.42, 6, 10), toyMaterial(primary));
  body.position.y = 0.55;
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.2, 16, 16), toyMaterial(0xffe0c0));
  head.position.y = 1.05;
  g.add(body, head);
  if (hat === "turban") {
    const t = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.1, 10, 18), toyMaterial(accent, { metal: 0.35 }));
    t.rotation.x = Math.PI / 2;
    t.position.y = 1.2;
    g.add(t);
  } else if (hat === "hood") {
    const h = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.32, 10), toyMaterial(accent, { emissive: 0x4a148c, emit: 0.35 }));
    h.position.y = 1.28;
    g.add(h);
  } else if (hat === "helm") {
    const h = new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 12, 0, Math.PI * 2, 0, Math.PI / 2), toyMaterial(0xc0c4c8, { metal: 0.7 }));
    h.position.y = 1.14;
    g.add(h);
  }
  g.traverse((obj) => {
    if (obj instanceof THREE.Mesh) {
      obj.castShadow = true;
      obj.receiveShadow = true;
    }
  });
  return g;
}
