import * as THREE from "three";
import { publicUrl } from "./publicUrl";

const loader = new THREE.TextureLoader();

function loadMap(url: string, srgb: boolean, repeat: number): THREE.Texture {
  const texture = loader.load(url);
  texture.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(repeat, repeat);
  texture.anisotropy = 1;
  texture.generateMipmaps = true;
  return texture;
}

function pack(folder: string, repeat: number) {
  return {
    map: loadMap(publicUrl(`/pbr/${folder}/diff.jpg`), true, repeat),
    normal: loadMap(publicUrl(`/pbr/${folder}/nor.jpg`), false, repeat),
    rough: loadMap(publicUrl(`/pbr/${folder}/rough.jpg`), false, repeat),
    repeat,
  };
}

const stone = pack("stone", 2.2);
const wall = pack("wall", 2);
const wood = pack("wood", 2.4);
const plaster = pack("plaster", 2);
const tile = pack("roof", 3.2);
const sand = pack("ground", 6);
const cobble = pack("cobble", 4);
const barrel = pack("barrel", 1);
const beam = pack("beam", 2.2);

export const maps = {
  wood: wood.map,
  woodN: wood.normal,
  woodR: wood.rough,
  plaster: plaster.map,
  plasterN: plaster.normal,
  plasterR: plaster.rough,
  stone: stone.map,
  stoneN: stone.normal,
  stoneR: stone.rough,
  wall: wall.map,
  wallN: wall.normal,
  wallR: wall.rough,
  tile: tile.map,
  tileN: tile.normal,
  tileR: tile.rough,
  sand: sand.map,
  sandN: sand.normal,
  sandR: sand.rough,
  cobble: cobble.map,
  cobbleN: cobble.normal,
  cobbleR: cobble.rough,
  barrel: barrel.map,
  barrelN: barrel.normal,
  barrelR: barrel.rough,
  beam: beam.map,
  beamN: beam.normal,
  beamR: beam.rough,
};

export type PbrKind = "stone" | "wall" | "wood" | "plaster" | "tile" | "sand" | "cobble" | "barrel" | "beam";

const packs: Record<PbrKind, ReturnType<typeof pack>> = {
  stone,
  wall,
  wood,
  plaster,
  tile,
  sand,
  cobble,
  barrel,
  beam,
};

const mappedCache = new Map<string, THREE.MeshLambertMaterial>();

export function mapped(
  color: number,
  map: THREE.Texture,
  opts: {
    roughness?: number;
    metal?: number;
    emissive?: number;
    emit?: number;
    normal?: THREE.Texture;
    rough?: THREE.Texture;
    env?: number;
  } = {},
) {
  const key = `${map.uuid}:${color}:${opts.emissive ?? 0}:${opts.emit ?? 0}`;
  const hit = mappedCache.get(key);
  if (hit) return hit;
  const mat = new THREE.MeshLambertMaterial({
    color,
    map,
    emissive: opts.emissive ?? 0x000000,
    emissiveIntensity: opts.emit ?? 0,
  });
  mappedCache.set(key, mat);
  return mat;
}

export function pbr(
  kind: PbrKind,
  color = 0xffffff,
  opts: { repeat?: number; metal?: number; roughness?: number; env?: number } = {},
) {
  void opts;
  const src = packs[kind];
  return mapped(color, src.map);
}

/** Aynı malzeme anahtarını paylaş — her hex için yeni texture klonu üretmez. */
export function cachedPbr(
  kind: PbrKind,
  color = 0xffffff,
  opts: { repeat?: number; metal?: number; roughness?: number; env?: number } = {},
): THREE.MeshLambertMaterial {
  return pbr(kind, color, opts);
}
