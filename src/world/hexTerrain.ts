import * as THREE from "three";
import type { Biome } from "../core/types";

const COLORS: Record<Biome, { top: number; side: number }> = {
  desert: { top: 0xd4b06a, side: 0xa07a3a },
  forest: { top: 0x3d6a38, side: 0x2a4a24 },
  ice: { top: 0xc5d6e6, side: 0x8aa4b8 },
};

const cache = new Map<string, THREE.MeshStandardMaterial>();

/** Doku şeridi yok: düz renk + hafif gürültü. Silindir UV’si ahşabı çizgi yapıyordu. */
export function hexTopMat(biome: Biome): THREE.MeshStandardMaterial {
  const key = `top:${biome}`;
  const hit = cache.get(key);
  if (hit) return hit;
  const mat = new THREE.MeshStandardMaterial({
    color: COLORS[biome].top,
    map: speckMap(COLORS[biome].top),
    roughness: biome === "ice" ? 0.35 : 0.88,
    metalness: biome === "ice" ? 0.12 : 0.02,
    flatShading: false,
  });
  cache.set(key, mat);
  return mat;
}

export function hexSideMat(biome: Biome): THREE.MeshStandardMaterial {
  const key = `side:${biome}`;
  const hit = cache.get(key);
  if (hit) return hit;
  const mat = new THREE.MeshStandardMaterial({
    color: COLORS[biome].side,
    roughness: 0.92,
    metalness: 0,
  });
  cache.set(key, mat);
  return mat;
}

function speckMap(color: number): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  const r = (color >> 16) & 255;
  const g = (color >> 8) & 255;
  const b = color & 255;
  const data = ctx.createImageData(64, 64);
  for (let i = 0; i < 64 * 64; i += 1) {
    const n = hash(i) * 22 - 11;
    const o = i * 4;
    data.data[o] = clamp(r + n);
    data.data[o + 1] = clamp(g + n);
    data.data[o + 2] = clamp(b + n * 0.6);
    data.data[o + 3] = 255;
  }
  ctx.putImageData(data, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.repeat.set(1.4, 1.4);
  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  return texture;
}

function hash(i: number): number {
  const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

function clamp(n: number): number {
  return Math.max(0, Math.min(255, Math.round(n)));
}
