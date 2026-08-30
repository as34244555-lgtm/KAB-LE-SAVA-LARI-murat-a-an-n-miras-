import * as THREE from "three";

function canvas(size = 256): { ctx: CanvasRenderingContext2D; tex: () => THREE.CanvasTexture } {
  const el = document.createElement("canvas");
  el.width = size;
  el.height = size;
  const ctx = el.getContext("2d");
  if (!ctx) throw new Error("tuval yok");
  return {
    ctx,
    tex: () => {
      const texture = new THREE.CanvasTexture(el);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.anisotropy = 8;
      return texture;
    },
  };
}

export function woodTexture(): THREE.CanvasTexture {
  const { ctx, tex } = canvas();
  ctx.fillStyle = "#6b4226";
  ctx.fillRect(0, 0, 256, 256);
  for (let x = 0; x < 256; x += 14) {
    ctx.fillStyle = x % 28 === 0 ? "#5a361d" : "#7a4d2c";
    ctx.fillRect(x, 0, 12, 256);
    ctx.strokeStyle = "rgba(30,16,8,0.35)";
    ctx.beginPath();
    ctx.moveTo(x + 2, 0);
    ctx.bezierCurveTo(x + 8, 80, x - 4, 160, x + 6, 256);
    ctx.stroke();
  }
  return tex();
}

export function plasterTexture(): THREE.CanvasTexture {
  const { ctx, tex } = canvas();
  ctx.fillStyle = "#ead7b8";
  ctx.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 80; i += 1) {
    ctx.fillStyle = `rgba(180,150,110,${0.08 + Math.random() * 0.08})`;
    ctx.beginPath();
    ctx.arc(Math.random() * 256, Math.random() * 256, 6 + Math.random() * 18, 0, Math.PI * 2);
    ctx.fill();
  }
  return tex();
}

export function stoneTexture(): THREE.CanvasTexture {
  const { ctx, tex } = canvas();
  ctx.fillStyle = "#8d8a82";
  ctx.fillRect(0, 0, 256, 256);
  const palette = ["#9a968c", "#7f7b73", "#b0aaa0", "#6e6a63"];
  for (let y = 0; y < 8; y += 1) {
    for (let x = 0; x < 6; x += 1) {
      const ox = (y % 2) * 20;
      ctx.fillStyle = palette[(x + y) % palette.length];
      ctx.fillRect(x * 44 + ox + 2, y * 32 + 2, 40, 28);
      ctx.strokeStyle = "rgba(40,38,34,0.35)";
      ctx.strokeRect(x * 44 + ox + 2, y * 32 + 2, 40, 28);
    }
  }
  return tex();
}

export function tileTexture(): THREE.CanvasTexture {
  const { ctx, tex } = canvas();
  ctx.fillStyle = "#c45c32";
  ctx.fillRect(0, 0, 256, 256);
  for (let y = 0; y < 12; y += 1) {
    for (let x = 0; x < 10; x += 1) {
      const ox = (y % 2) * 13;
      ctx.fillStyle = x % 2 === 0 ? "#d46a3a" : "#b04e28";
      ctx.beginPath();
      ctx.ellipse(x * 28 + ox, y * 22 + 12, 14, 10, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(80,24,10,0.35)";
      ctx.stroke();
    }
  }
  return tex();
}

export function sandTexture(): THREE.CanvasTexture {
  const { ctx, tex } = canvas(512);
  ctx.fillStyle = "#c4b396";
  ctx.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 400; i += 1) {
    ctx.fillStyle = `rgba(140,120,90,${Math.random() * 0.12})`;
    ctx.fillRect(Math.random() * 512, Math.random() * 512, 3, 3);
  }
  return tex();
}

export function skyTexture(): THREE.CanvasTexture {
  const { ctx, tex } = canvas(512);
  const g = ctx.createLinearGradient(0, 0, 0, 512);
  g.addColorStop(0, "#6a8ec8");
  g.addColorStop(0.45, "#f0a35a");
  g.addColorStop(0.75, "#f6c38a");
  g.addColorStop(1, "#ffe6c4");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 512, 512);
  const t = tex();
  t.mapping = THREE.EquirectangularReflectionMapping;
  return t;
}

export const maps = {
  wood: woodTexture(),
  plaster: plasterTexture(),
  stone: stoneTexture(),
  tile: tileTexture(),
  sand: sandTexture(),
  sky: skyTexture(),
};

export function mapped(color: number, map: THREE.Texture, opts: { roughness?: number; metal?: number; emissive?: number; emit?: number } = {}) {
  return new THREE.MeshStandardMaterial({
    color,
    map,
    roughness: opts.roughness ?? 0.55,
    metalness: opts.metal ?? 0.08,
    emissive: opts.emissive ?? 0x000000,
    emissiveIntensity: opts.emit ?? 0,
  });
}
