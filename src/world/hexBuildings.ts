import * as THREE from "three";
import type { BuildingSlot, HexTile, PlayableTribe } from "../core/types";

const mats = new Map<string, THREE.MeshStandardMaterial>();

function mat(hex: number, rough = 0.7, metal = 0.04): THREE.MeshStandardMaterial {
  const key = `${hex}:${rough}:${metal}`;
  const hit = mats.get(key);
  if (hit) return hit;
  const made = new THREE.MeshStandardMaterial({ color: hex, roughness: rough, metalness: metal });
  mats.set(key, made);
  return made;
}

function mesh(geom: THREE.BufferGeometry, material: THREE.Material, x: number, y: number, z: number): THREE.Mesh {
  const m = new THREE.Mesh(geom, material);
  m.position.set(x, y, z);
  m.castShadow = false;
  m.receiveShadow = true;
  return m;
}

export function hexBuildingMesh(tile: HexTile, tribe: PlayableTribe): THREE.Group | null {
  if (!tile.slot) return null;
  const g = new THREE.Group();
  g.name = `bld-${tile.id}`;
  const slot = tile.slot;
  if (tribe === "sariklilar") desertBuilding(g, slot, tile.level);
  else if (tribe === "demirhisar") iceBuilding(g, slot, tile.level);
  else forestBuilding(g, slot, tile.level);
  return g;
}

function desertBuilding(g: THREE.Group, slot: BuildingSlot, lv: number): void {
  const cloth = mat(0xc45a2a, 0.78);
  const pole = mat(0x6a4a28, 0.85);
  const sand = mat(0xc9a66b, 0.9);
  if (slot === "hall") {
    g.add(mesh(new THREE.ConeGeometry(0.55, 0.55, 8), cloth, 0, 0.5, 0));
    g.add(mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.7, 6), pole, 0, 0.35, 0));
    g.add(mesh(new THREE.SphereGeometry(0.12, 10, 8), mat(0xd4b06a), 0, 0.82, 0));
  } else if (slot === "resource") {
    g.add(mesh(new THREE.BoxGeometry(0.55, 0.12, 0.55), sand, 0, 0.08, 0));
    for (let i = 0; i < 4; i++) g.add(mesh(new THREE.BoxGeometry(0.08, 0.22, 0.08), mat(0x8a6a30), -0.18 + (i % 2) * 0.3, 0.2, -0.12 + Math.floor(i / 2) * 0.28));
  } else if (slot === "camp") {
    g.add(mesh(new THREE.ConeGeometry(0.32, 0.38, 7), cloth, -0.18, 0.28, 0.05));
    g.add(mesh(new THREE.ConeGeometry(0.26, 0.3, 7), mat(0x8a4020), 0.2, 0.24, -0.08));
  } else if (slot === "tower") {
    g.add(mesh(new THREE.CylinderGeometry(0.16, 0.2, 0.7, 8), mat(0xb8894a), 0, 0.4, 0));
    g.add(mesh(new THREE.ConeGeometry(0.22, 0.18, 8), cloth, 0, 0.84, 0));
  } else if (slot === "market") {
    g.add(mesh(new THREE.BoxGeometry(0.7, 0.08, 0.4), mat(0x8a2a1a), 0, 0.28, 0));
    g.add(mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.28, 6), pole, -0.3, 0.14, 0.16));
    g.add(mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.28, 6), pole, 0.3, 0.14, -0.16));
  } else {
    g.add(mesh(new THREE.CylinderGeometry(0.22, 0.26, 0.28, 10), mat(0x5a4030), 0, 0.2, 0));
    g.add(mesh(new THREE.CylinderGeometry(0.06, 0.08, 0.22, 8), mat(0x333333, 0.4, 0.3), 0.18, 0.28, 0.1));
  }
  g.scale.setScalar(1 + lv * 0.06);
}

function forestBuilding(g: THREE.Group, slot: BuildingSlot, lv: number): void {
  const wood = mat(0x5a3a22, 0.82);
  const leaf = mat(0x2f5a38, 0.7);
  const crystal = mat(0x6ec8ff, 0.15, 0.35);
  if (slot === "hall") {
    g.add(mesh(new THREE.CylinderGeometry(0.28, 0.34, 0.45, 8), wood, 0, 0.28, 0));
    g.add(mesh(new THREE.ConeGeometry(0.4, 0.38, 8), leaf, 0, 0.62, 0));
    g.add(mesh(new THREE.OctahedronGeometry(0.16), crystal, 0, 0.88, 0));
  } else if (slot === "resource") {
    g.add(mesh(new THREE.OctahedronGeometry(0.22), crystal, -0.15, 0.28, 0.05));
    g.add(mesh(new THREE.OctahedronGeometry(0.16), crystal, 0.18, 0.22, -0.08));
  } else if (slot === "camp") {
    g.add(mesh(new THREE.BoxGeometry(0.5, 0.22, 0.38), wood, 0, 0.16, 0));
    g.add(mesh(new THREE.ConeGeometry(0.18, 0.2, 6), leaf, 0.18, 0.36, 0.1));
  } else if (slot === "tower") {
    g.add(mesh(new THREE.CylinderGeometry(0.12, 0.16, 0.85, 7), wood, 0, 0.46, 0));
    g.add(mesh(new THREE.OctahedronGeometry(0.14), crystal, 0, 0.96, 0));
  } else if (slot === "market") {
    g.add(mesh(new THREE.BoxGeometry(0.55, 0.08, 0.55), wood, 0, 0.12, 0));
    g.add(mesh(new THREE.BoxGeometry(0.18, 0.2, 0.18), mat(0x8a6a30), -0.16, 0.24, 0.12));
  } else {
    g.add(mesh(new THREE.BoxGeometry(0.4, 0.28, 0.36), wood, 0, 0.2, 0));
    g.add(mesh(new THREE.OctahedronGeometry(0.1), crystal, 0.18, 0.38, 0));
  }
  g.scale.setScalar(1 + lv * 0.06);
}

function iceBuilding(g: THREE.Group, slot: BuildingSlot, lv: number): void {
  const stone = mat(0x8a93a0, 0.45, 0.18);
  const ice = mat(0xcfe8ff, 0.12, 0.25);
  const dark = mat(0x3a4450, 0.4, 0.35);
  if (slot === "hall") {
    g.add(mesh(new THREE.BoxGeometry(0.7, 0.45, 0.55), stone, 0, 0.28, 0));
    g.add(mesh(new THREE.CylinderGeometry(0.1, 0.12, 0.7, 6), stone, -0.28, 0.5, -0.18));
    g.add(mesh(new THREE.CylinderGeometry(0.1, 0.12, 0.7, 6), stone, 0.28, 0.5, -0.18));
    g.add(mesh(new THREE.ConeGeometry(0.14, 0.2, 6), ice, -0.28, 0.92, -0.18));
    g.add(mesh(new THREE.ConeGeometry(0.14, 0.2, 6), ice, 0.28, 0.92, -0.18));
  } else if (slot === "resource") {
    g.add(mesh(new THREE.BoxGeometry(0.5, 0.18, 0.5), dark, 0, 0.12, 0));
    g.add(mesh(new THREE.BoxGeometry(0.12, 0.28, 0.12), stone, 0.16, 0.28, 0.1));
  } else if (slot === "camp") {
    g.add(mesh(new THREE.BoxGeometry(0.55, 0.28, 0.4), stone, 0, 0.18, 0));
    g.add(mesh(new THREE.BoxGeometry(0.2, 0.12, 0.12), dark, 0.22, 0.28, 0.08));
  } else if (slot === "tower") {
    g.add(mesh(new THREE.CylinderGeometry(0.16, 0.2, 0.95, 8), stone, 0, 0.5, 0));
    g.add(mesh(new THREE.ConeGeometry(0.2, 0.22, 8), ice, 0, 1.08, 0));
  } else if (slot === "market") {
    g.add(mesh(new THREE.BoxGeometry(0.62, 0.22, 0.45), stone, 0, 0.16, 0));
    g.add(mesh(new THREE.BoxGeometry(0.7, 0.04, 0.5), dark, 0, 0.3, 0));
  } else {
    g.add(mesh(new THREE.BoxGeometry(0.42, 0.32, 0.38), dark, 0, 0.2, 0));
    g.add(mesh(new THREE.CylinderGeometry(0.08, 0.1, 0.2, 8), mat(0x444444, 0.35, 0.5), 0.2, 0.28, 0.1));
  }
  g.scale.setScalar(1 + lv * 0.06);
}
