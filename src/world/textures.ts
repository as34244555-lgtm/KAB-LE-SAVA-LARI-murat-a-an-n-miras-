import * as THREE from "three";

const loader = new THREE.TextureLoader();

function loadMap(url: string, srgb: boolean, repeat: number): THREE.Texture {
  const texture = loader.load(url);
  texture.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(repeat, repeat);
  texture.anisotropy = 8;
  return texture;
}

function pack(folder: string, repeat: number) {
  return {
    map: loadMap(`/pbr/${folder}/diff.jpg`, true, repeat),
    normal: loadMap(`/pbr/${folder}/nor.jpg`, false, repeat),
    rough: loadMap(`/pbr/${folder}/rough.jpg`, false, repeat),
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

function cloneMap(source: THREE.Texture, repeat: number): THREE.Texture {
  const texture = source.clone();
  texture.repeat.set(repeat, repeat);
  texture.needsUpdate = true;
  return texture;
}

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
  return new THREE.MeshStandardMaterial({
    color,
    map,
    normalMap: opts.normal,
    normalScale: opts.normal ? new THREE.Vector2(1.15, 1.15) : undefined,
    roughnessMap: opts.rough,
    roughness: opts.rough ? 1 : (opts.roughness ?? 0.72),
    metalness: opts.metal ?? 0.04,
    emissive: opts.emissive ?? 0x000000,
    emissiveIntensity: opts.emit ?? 0,
    envMapIntensity: opts.env ?? 1.05,
  });
}

export function pbr(
  kind: PbrKind,
  color = 0xffffff,
  opts: { repeat?: number; metal?: number; roughness?: number; env?: number } = {},
) {
  const src = packs[kind];
  const repeat = opts.repeat ?? src.repeat;
  return mapped(color, cloneMap(src.map, repeat), {
    normal: cloneMap(src.normal, repeat),
    rough: cloneMap(src.rough, repeat),
    metal: opts.metal,
    roughness: opts.roughness,
    env: opts.env,
  });
}
