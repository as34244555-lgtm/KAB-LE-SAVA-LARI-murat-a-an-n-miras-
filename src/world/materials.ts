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
  const legs = new THREE.Mesh(new THREE.CapsuleGeometry(0.14, 0.22, 6, 10), toyMaterial(0x4a3424));
  legs.position.y = 0.28;
  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.24, 0.28, 6, 10), toyMaterial(primary));
  body.position.y = 0.62;
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.26, 16, 16), toyMaterial(0xffe0c0));
  head.position.y = 1.05;
  g.add(legs, body, head);
  if (hat === "turban") {
    const t = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.12, 10, 18), toyMaterial(accent, { metal: 0.35 }));
    t.rotation.x = Math.PI / 2;
    t.position.y = 1.22;
    const jewel = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 8), toyMaterial(0xc0392b, { metal: 0.4 }));
    jewel.position.set(0, 1.34, 0.12);
    g.add(t, jewel);
  } else if (hat === "hood") {
    const h = new THREE.Mesh(new THREE.ConeGeometry(0.28, 0.38, 10), toyMaterial(accent, { emissive: 0x4a148c, emit: 0.45 }));
    h.position.y = 1.32;
    const cape = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.45, 0.08), toyMaterial(0x4a148c, { roughness: 0.6 }));
    cape.position.set(0, 0.62, -0.2);
    g.add(h, cape);
  } else if (hat === "helm") {
    const h = new THREE.Mesh(new THREE.SphereGeometry(0.28, 12, 12, 0, Math.PI * 2, 0, Math.PI / 2), toyMaterial(0xc0c4c8, { metal: 0.75 }));
    h.position.y = 1.16;
    const visor = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.08, 0.12), toyMaterial(0x8d8a82, { metal: 0.7 }));
    visor.position.set(0, 1.08, 0.18);
    g.add(h, visor);
  }
  g.traverse((obj) => {
    if (obj instanceof THREE.Mesh) {
      obj.castShadow = true;
      obj.receiveShadow = true;
    }
  });
  return g;
}
