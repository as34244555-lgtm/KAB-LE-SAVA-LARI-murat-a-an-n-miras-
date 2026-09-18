import * as THREE from "three";

const skins = new Map<string, THREE.MeshStandardMaterial>();

function skin(hex: number, rough = 0.55, metal = 0.05): THREE.MeshStandardMaterial {
  const key = `${hex}:${rough}:${metal}`;
  const hit = skins.get(key);
  if (hit) return hit;
  const mat = new THREE.MeshStandardMaterial({ color: hex, roughness: rough, metalness: metal });
  skins.set(key, mat);
  return mat;
}

function add(parent: THREE.Group, geom: THREE.BufferGeometry, mat: THREE.Material, x: number, y: number, z: number): THREE.Mesh {
  const m = new THREE.Mesh(geom, mat);
  m.position.set(x, y, z);
  m.castShadow = false;
  m.receiveShadow = false;
  parent.add(m);
  return m;
}

/** Detailed tribal fighter — not a meeple, not a sci-fi soldier. */
export function buildWarrior(kind: "sariklilar" | "gokhanli" | "demirhisar" | "rider" | "panther"): THREE.Group {
  const g = new THREE.Group();
  g.name = `warrior-${kind}`;

  const flesh = skin(0xc4a07a, 0.72, 0.02);
  const hair = skin(0x1a120c, 0.9, 0);
  const cloth =
    kind === "sariklilar"
      ? skin(0x8a3a22, 0.78, 0.02)
      : kind === "gokhanli"
        ? skin(0x2a4a38, 0.7, 0.04)
        : kind === "demirhisar"
          ? skin(0x3a4450, 0.35, 0.55)
          : skin(0x4a3428, 0.7, 0.04);
  const steel = skin(0x8a93a0, 0.28, 0.78);
  const leather = skin(0x5a3a22, 0.82, 0.04);
  const gold = skin(0xc9a227, 0.32, 0.7);

  if (kind === "panther") {
    const body = add(g, new THREE.CapsuleGeometry(0.16, 0.42, 6, 10), skin(0x1a1420, 0.55, 0.08), 0, 0.22, 0);
    body.rotation.z = Math.PI / 2;
    add(g, new THREE.SphereGeometry(0.14, 12, 10), skin(0x1a1420, 0.55, 0.08), 0.28, 0.26, 0);
    add(g, new THREE.CylinderGeometry(0.045, 0.05, 0.28, 8), skin(0x1a1420), 0.22, 0.12, 0.1);
    add(g, new THREE.CylinderGeometry(0.045, 0.05, 0.28, 8), skin(0x1a1420), 0.22, 0.12, -0.1);
    add(g, new THREE.CylinderGeometry(0.045, 0.05, 0.28, 8), skin(0x1a1420), -0.18, 0.12, 0.1);
    add(g, new THREE.CylinderGeometry(0.045, 0.05, 0.28, 8), skin(0x1a1420), -0.18, 0.12, -0.1);
    add(g, new THREE.ConeGeometry(0.04, 0.22, 6), skin(0x1a1420), -0.32, 0.2, 0).rotation.z = 1.2;
    const rider = buildWarrior("gokhanli");
    rider.scale.setScalar(0.72);
    rider.position.set(0, 0.38, 0);
    g.add(rider);
    return g;
  }

  if (kind === "rider") {
    const horse = add(g, new THREE.CapsuleGeometry(0.18, 0.5, 6, 10), skin(0x4a3020, 0.7, 0.04), 0, 0.28, 0);
    horse.rotation.z = Math.PI / 2;
    add(g, new THREE.SphereGeometry(0.14, 12, 10), skin(0x4a3020), 0.32, 0.36, 0);
    add(g, new THREE.CylinderGeometry(0.05, 0.055, 0.34, 8), skin(0x3a2418), 0.2, 0.16, 0.1);
    add(g, new THREE.CylinderGeometry(0.05, 0.055, 0.34, 8), skin(0x3a2418), 0.2, 0.16, -0.1);
    add(g, new THREE.CylinderGeometry(0.05, 0.055, 0.34, 8), skin(0x3a2418), -0.2, 0.16, 0.1);
    add(g, new THREE.CylinderGeometry(0.05, 0.055, 0.34, 8), skin(0x3a2418), -0.2, 0.16, -0.1);
    const rider = buildWarrior("sariklilar");
    rider.scale.setScalar(0.7);
    rider.position.set(0, 0.48, 0);
    g.add(rider);
    return g;
  }

  add(g, new THREE.CylinderGeometry(0.09, 0.11, 0.38, 10), cloth, 0, 0.42, 0);
  add(g, new THREE.SphereGeometry(0.11, 14, 12), flesh, 0, 0.72, 0);
  add(g, new THREE.SphereGeometry(0.115, 12, 10), hair, 0, 0.76, -0.01);
  add(g, new THREE.BoxGeometry(0.22, 0.08, 0.16), leather, 0, 0.56, 0.02);

  const armL = add(g, new THREE.CapsuleGeometry(0.035, 0.22, 4, 8), flesh, -0.16, 0.5, 0);
  armL.rotation.z = 0.35;
  const armR = add(g, new THREE.CapsuleGeometry(0.035, 0.22, 4, 8), flesh, 0.16, 0.5, 0);
  armR.rotation.z = -0.35;

  add(g, new THREE.CapsuleGeometry(0.04, 0.26, 4, 8), cloth, -0.05, 0.16, 0);
  add(g, new THREE.CapsuleGeometry(0.04, 0.26, 4, 8), cloth, 0.05, 0.16, 0);
  add(g, new THREE.BoxGeometry(0.07, 0.04, 0.12), leather, -0.05, 0.02, 0.02);
  add(g, new THREE.BoxGeometry(0.07, 0.04, 0.12), leather, 0.05, 0.02, 0.02);

  if (kind === "sariklilar") {
    add(g, new THREE.TorusGeometry(0.1, 0.035, 8, 16), skin(0xd8c48a, 0.7, 0.05), 0, 0.82, 0).rotation.x = Math.PI / 2;
    add(g, new THREE.CylinderGeometry(0.012, 0.012, 0.55, 6), steel, 0.22, 0.55, 0.04);
    add(g, new THREE.SphereGeometry(0.045, 8, 8), skin(0x222222), 0.22, 0.84, 0.04);
    add(g, new THREE.BoxGeometry(0.1, 0.14, 0.04), leather, 0, 0.48, 0.1);
  } else if (kind === "gokhanli") {
    add(g, new THREE.ConeGeometry(0.1, 0.16, 7), cloth, 0, 0.88, 0);
    add(g, new THREE.BoxGeometry(0.04, 0.32, 0.08), steel, 0.2, 0.52, 0.02);
    add(g, new THREE.CylinderGeometry(0.02, 0.05, 0.18, 6), gold, 0, 0.58, 0.1);
    add(g, new THREE.SphereGeometry(0.03, 8, 8), skin(0x6ec8ff, 0.2, 0.4), 0, 0.7, 0.1);
  } else {
    add(g, new THREE.SphereGeometry(0.13, 12, 10), steel, 0, 0.78, 0);
    add(g, new THREE.BoxGeometry(0.26, 0.22, 0.18), steel, 0, 0.52, 0);
    add(g, new THREE.BoxGeometry(0.08, 0.36, 0.04), steel, 0.22, 0.55, 0.02);
    add(g, new THREE.BoxGeometry(0.18, 0.22, 0.04), steel, -0.16, 0.5, 0.02);
  }

  return g;
}

export function garrisonFor(tribe: "sariklilar" | "gokhanli" | "demirhisar", count: number): THREE.Group {
  const root = new THREE.Group();
  const n = Math.min(5, Math.max(1, count));
  for (let i = 0; i < n; i++) {
    const kind = tribe === "gokhanli" && i === 0 ? "panther" : tribe === "sariklilar" && i === 0 ? "rider" : tribe;
    const w = buildWarrior(kind);
    w.scale.setScalar(kind === "panther" || kind === "rider" ? 0.85 : 0.72);
    w.position.set((i - (n - 1) / 2) * 0.38, 0, (i % 2) * 0.18);
    w.rotation.y = Math.PI * 0.15 * (i - 1);
    root.add(w);
  }
  return root;
}
