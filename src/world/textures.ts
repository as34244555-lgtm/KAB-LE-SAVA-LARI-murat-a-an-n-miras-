import * as THREE from "three";

function canvas(size = 512): { el: HTMLCanvasElement; ctx: CanvasRenderingContext2D; tex: (repeat?: number) => THREE.CanvasTexture } {
  const el = document.createElement("canvas");
  el.width = size;
  el.height = size;
  const ctx = el.getContext("2d");
  if (!ctx) throw new Error("tuval yok");
  return {
    el,
    ctx,
    tex: (repeat = 2) => {
      const texture = new THREE.CanvasTexture(el);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(repeat, repeat);
      texture.anisotropy = 8;
      return texture;
    },
  };
}

function noise(ctx: CanvasRenderingContext2D, size: number, alpha: number, color: string) {
  ctx.fillStyle = color;
  for (let i = 0; i < size * 4; i += 1) {
    ctx.globalAlpha = Math.random() * alpha;
    ctx.fillRect(Math.random() * size, Math.random() * size, 1 + Math.random() * 2, 1 + Math.random() * 2);
  }
  ctx.globalAlpha = 1;
}

function normalFrom(source: HTMLCanvasElement): THREE.CanvasTexture {
  const size = source.width;
  const src = source.getContext("2d");
  const out = document.createElement("canvas");
  out.width = size;
  out.height = size;
  const ctx = out.getContext("2d");
  if (!src || !ctx) throw new Error("normal yok");
  const img = src.getImageData(0, 0, size, size);
  const dest = ctx.createImageData(size, size);
  const at = (x: number, y: number) => {
    const i = ((y + size) % size) * size + ((x + size) % size);
    return img.data[i * 4] / 255;
  };
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const dx = at(x + 1, y) - at(x - 1, y);
      const dy = at(x, y + 1) - at(x, y - 1);
      const nx = -dx * 3.2;
      const ny = -dy * 3.2;
      const nz = 1;
      const len = Math.hypot(nx, ny, nz);
      const i = (y * size + x) * 4;
      dest.data[i] = Math.floor(((nx / len) * 0.5 + 0.5) * 255);
      dest.data[i + 1] = Math.floor(((ny / len) * 0.5 + 0.5) * 255);
      dest.data[i + 2] = Math.floor(((nz / len) * 0.5 + 0.5) * 255);
      dest.data[i + 3] = 255;
    }
  }
  ctx.putImageData(dest, 0, 0);
  const texture = new THREE.CanvasTexture(out);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  texture.colorSpace = THREE.NoColorSpace;
  return texture;
}

export function woodTexture(): { map: THREE.CanvasTexture; normal: THREE.CanvasTexture } {
  const { el, ctx, tex } = canvas();
  ctx.fillStyle = "#5c3b22";
  ctx.fillRect(0, 0, 512, 512);
  for (let x = 0; x < 512; x += 18) {
    const tone = 70 + ((x * 13) % 40);
    ctx.fillStyle = `rgb(${tone + 20},${tone - 10},${tone - 30})`;
    ctx.fillRect(x, 0, 16, 512);
    ctx.strokeStyle = "rgba(20,10,4,0.45)";
    ctx.beginPath();
    ctx.moveTo(x + 3, 0);
    ctx.bezierCurveTo(x + 14, 140, x - 6, 300, x + 10, 512);
    ctx.stroke();
  }
  noise(ctx, 512, 0.18, "#2a160c");
  return { map: tex(3), normal: normalFrom(el) };
}

export function plasterTexture(): { map: THREE.CanvasTexture; normal: THREE.CanvasTexture } {
  const { el, ctx, tex } = canvas();
  ctx.fillStyle = "#c4b49a";
  ctx.fillRect(0, 0, 512, 512);
  noise(ctx, 512, 0.22, "#9a8a70");
  ctx.strokeStyle = "rgba(70,60,45,0.25)";
  for (let i = 0; i < 18; i += 1) {
    ctx.beginPath();
    ctx.moveTo(Math.random() * 512, Math.random() * 512);
    ctx.lineTo(Math.random() * 512, Math.random() * 512);
    ctx.stroke();
  }
  return { map: tex(2), normal: normalFrom(el) };
}

export function stoneTexture(): { map: THREE.CanvasTexture; normal: THREE.CanvasTexture } {
  const { el, ctx, tex } = canvas();
  ctx.fillStyle = "#5d5a54";
  ctx.fillRect(0, 0, 512, 512);
  const tones = ["#6e6a62", "#4f4c46", "#7a756c", "#3f3c38", "#8a847a"];
  for (let y = 0; y < 10; y += 1) {
    for (let x = 0; x < 8; x += 1) {
      const ox = (y % 2) * 32;
      ctx.fillStyle = tones[(x + y * 3) % tones.length];
      ctx.fillRect(x * 64 + ox + 2, y * 52 + 2, 60, 48);
      ctx.strokeStyle = "rgba(15,14,12,0.55)";
      ctx.strokeRect(x * 64 + ox + 2, y * 52 + 2, 60, 48);
    }
  }
  noise(ctx, 512, 0.15, "#2a2824");
  return { map: tex(2), normal: normalFrom(el) };
}

export function tileTexture(): { map: THREE.CanvasTexture; normal: THREE.CanvasTexture } {
  const { el, ctx, tex } = canvas();
  ctx.fillStyle = "#7a3a22";
  ctx.fillRect(0, 0, 512, 512);
  for (let y = 0; y < 16; y += 1) {
    for (let x = 0; x < 12; x += 1) {
      const ox = (y % 2) * 22;
      ctx.fillStyle = x % 2 === 0 ? "#8b4528" : "#6a3018";
      ctx.beginPath();
      ctx.ellipse(x * 44 + ox, y * 34 + 16, 22, 14, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(30,10,6,0.5)";
      ctx.stroke();
    }
  }
  return { map: tex(3), normal: normalFrom(el) };
}

export function sandTexture(): { map: THREE.CanvasTexture; normal: THREE.CanvasTexture } {
  const { el, ctx, tex } = canvas(512);
  ctx.fillStyle = "#6b5a42";
  ctx.fillRect(0, 0, 512, 512);
  noise(ctx, 512, 0.35, "#4a3c28");
  noise(ctx, 512, 0.2, "#8a7458");
  return { map: tex(4), normal: normalFrom(el) };
}

export function skyTexture(): THREE.CanvasTexture {
  const { ctx, tex } = canvas(512);
  const g = ctx.createLinearGradient(0, 0, 0, 512);
  g.addColorStop(0, "#6a8498");
  g.addColorStop(0.4, "#b88862");
  g.addColorStop(0.75, "#c9a078");
  g.addColorStop(1, "#d8c4a4");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 512, 512);
  const t = tex(1);
  t.mapping = THREE.EquirectangularReflectionMapping;
  t.repeat.set(1, 1);
  return t;
}

const wood = woodTexture();
const plaster = plasterTexture();
const stone = stoneTexture();
const tile = tileTexture();
const sand = sandTexture();

export const maps = {
  wood: wood.map,
  woodN: wood.normal,
  plaster: plaster.map,
  plasterN: plaster.normal,
  stone: stone.map,
  stoneN: stone.normal,
  tile: tile.map,
  tileN: tile.normal,
  sand: sand.map,
  sandN: sand.normal,
  sky: skyTexture(),
};

export function mapped(
  color: number,
  map: THREE.Texture,
  opts: { roughness?: number; metal?: number; emissive?: number; emit?: number; normal?: THREE.Texture } = {},
) {
  return new THREE.MeshStandardMaterial({
    color,
    map,
    normalMap: opts.normal,
    normalScale: opts.normal ? new THREE.Vector2(0.85, 0.85) : undefined,
    roughness: opts.roughness ?? 0.72,
    metalness: opts.metal ?? 0.04,
    emissive: opts.emissive ?? 0x000000,
    emissiveIntensity: opts.emit ?? 0,
    envMapIntensity: 0.55,
  });
}
