import * as THREE from "three";
import { mapped, maps } from "./textures";
import { stylizedPerson, toyMaterial } from "./materials";

export function lit(mesh: THREE.Mesh): THREE.Mesh {
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

export function deck(w = 2.2, d = 1.8): THREE.Group {
  const g = new THREE.Group();
  const plinth = lit(
    new THREE.Mesh(new THREE.BoxGeometry(w, 0.28, d), mapped(0x6a6660, maps.stone, { roughness: 0.88, normal: maps.stoneN })),
  );
  plinth.position.y = 0.12;
  g.add(plinth);
  return g;
}

export function timberHouse(w: number, h: number, d: number, plaster = 0xead7b8): THREE.Group {
  const g = new THREE.Group();
  const body = lit(new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mapped(plaster, maps.plaster, { roughness: 0.78, normal: maps.plasterN })));
  body.position.y = h / 2;
  g.add(body);
  const beamMat = mapped(0x4a2c18, maps.wood, { roughness: 0.7, normal: maps.woodN });
  const posts = [
    [-w / 2 + 0.06, d / 2 + 0.02],
    [w / 2 - 0.06, d / 2 + 0.02],
    [-w / 2 + 0.06, -d / 2 - 0.02],
    [w / 2 - 0.06, -d / 2 - 0.02],
  ];
  for (const [x, z] of posts) {
    const post = lit(new THREE.Mesh(new THREE.BoxGeometry(0.1, h, 0.1), beamMat));
    post.position.set(x, h / 2, z);
    g.add(post);
  }
  const plate = lit(new THREE.Mesh(new THREE.BoxGeometry(w * 0.92, 0.1, 0.08), beamMat));
  plate.position.set(0, h * 0.72, d / 2 + 0.03);
  const sill = plate.clone();
  sill.position.y = 0.18;
  g.add(plate, sill);
  return g;
}

export function gableRoof(w: number, d: number, rise = 0.72): THREE.Group {
  const g = new THREE.Group();
  const mat = mapped(0x8a3e24, maps.tile, { roughness: 0.62, normal: maps.tileN });
  const slope = new THREE.BoxGeometry(w + 0.28, 0.1, d * 0.62);
  const left = lit(new THREE.Mesh(slope, mat));
  left.rotation.x = 0.62;
  left.position.set(0, rise * 0.35, -d * 0.18);
  const right = lit(new THREE.Mesh(slope.clone(), mat));
  right.rotation.x = -0.62;
  right.position.set(0, rise * 0.35, d * 0.18);
  const ridge = lit(new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, w + 0.2, 8), mapped(0x8b3a1e, maps.tile, { roughness: 0.4 })));
  ridge.rotation.z = Math.PI / 2;
  ridge.position.y = rise * 0.72;
  g.add(left, right, ridge);
  return g;
}

export function torch(): THREE.Group {
  const g = new THREE.Group();
  const pole = lit(new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.04, 0.55, 8), mapped(0x5a3518, maps.wood)));
  pole.position.y = 0.28;
  const bowl = lit(new THREE.Mesh(new THREE.SphereGeometry(0.09, 10, 8), toyMaterial(0xff9933, { emissive: 0xff6a00, emit: 1.2 })));
  bowl.position.y = 0.58;
  const light = new THREE.PointLight(0xff9933, 1.1, 4.5, 2);
  light.position.y = 0.6;
  g.add(pole, bowl, light);
  g.userData.flame = bowl;
  return g;
}

export function crate(scale = 1): THREE.Mesh {
  const box = lit(new THREE.Mesh(new THREE.BoxGeometry(0.32 * scale, 0.26 * scale, 0.32 * scale), mapped(0x8b5a2b, maps.wood, { roughness: 0.7 })));
  box.position.y = 0.13 * scale;
  return box;
}

export function lionEmblem(size = 0.28): THREE.Group {
  const g = new THREE.Group();
  const disc = lit(new THREE.Mesh(new THREE.CircleGeometry(size, 20), toyMaterial(0x8b1e1e, { metal: 0.25, roughness: 0.4 })));
  const mane = lit(new THREE.Mesh(new THREE.TorusGeometry(size * 0.55, size * 0.16, 8, 16), toyMaterial(0xd4af37, { metal: 0.55 })));
  const face = lit(new THREE.Mesh(new THREE.SphereGeometry(size * 0.38, 10, 10), toyMaterial(0xf4d03f, { metal: 0.3 })));
  face.position.z = 0.04;
  mane.position.z = 0.02;
  g.add(disc, mane, face);
  return g;
}

export function windowGlow(w = 0.22, h = 0.28): THREE.Mesh {
  return lit(new THREE.Mesh(new THREE.PlaneGeometry(w, h), toyMaterial(0xffcc66, { emissive: 0xffaa33, emit: 0.95, roughness: 0.2 })));
}

export function chimney(): THREE.Group {
  const g = new THREE.Group();
  const stack = lit(new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.7, 0.28), mapped(0x8d8a82, maps.stone, { roughness: 0.8 })));
  stack.position.y = 0.35;
  const lip = lit(new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.08, 0.34), mapped(0x6e6a63, maps.stone)));
  lip.position.y = 0.72;
  g.add(stack, lip);
  return g;
}

export function smokePuff(): THREE.Mesh {
  const puff = new THREE.Mesh(new THREE.SphereGeometry(0.16, 10, 8), toyMaterial(0x4a4a4a, { roughness: 1, metal: 0 }));
  (puff.material as THREE.MeshStandardMaterial).transparent = true;
  (puff.material as THREE.MeshStandardMaterial).opacity = 0.45;
  puff.castShadow = false;
  return puff;
}

export function anvil(): THREE.Group {
  const g = new THREE.Group();
  const body = lit(new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.16, 0.22), toyMaterial(0xff8c1a, { metal: 0.35, emissive: 0xff6a00, emit: 0.95 })));
  const horn = lit(new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.1, 0.12), toyMaterial(0xff9933, { emissive: 0xff7700, emit: 0.8 })));
  horn.position.set(0.26, 0.02, 0);
  const glow = new THREE.PointLight(0xff7722, 1.4, 3.5, 2);
  g.add(body, horn, glow);
  return g;
}

export function wallSegment(length: number, height = 1.7): THREE.Group {
  const g = new THREE.Group();
  const stone = lit(new THREE.Mesh(new THREE.BoxGeometry(length, height, 0.55), mapped(0x9a968c, maps.stone, { roughness: 0.82 })));
  stone.position.y = height / 2;
  const beam = lit(new THREE.Mesh(new THREE.BoxGeometry(0.16, height + 0.1, 0.62), mapped(0x4a2c18, maps.wood)));
  beam.position.set(-length / 2 + 0.12, height / 2, 0);
  const beam2 = beam.clone();
  beam2.position.x = length / 2 - 0.12;
  const merlonCount = Math.max(3, Math.round(length / 0.7));
  g.add(stone, beam, beam2);
  for (let i = 0; i < merlonCount; i += 1) {
    const merlon = lit(new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.28, 0.5), mapped(0x8d8a82, maps.stone)));
    merlon.position.set(-length / 2 + 0.4 + i * (length / merlonCount), height + 0.12, 0);
    g.add(merlon);
  }
  return g;
}

export function cornerTower(): THREE.Group {
  const g = new THREE.Group();
  const shaft = lit(new THREE.Mesh(new THREE.BoxGeometry(1.35, 2.4, 1.35), mapped(0x9a968c, maps.stone, { roughness: 0.8 })));
  shaft.position.y = 1.2;
  const wood = lit(new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.7, 1.5), mapped(0x6b4226, maps.wood)));
  wood.position.y = 2.15;
  const roof = gableRoof(1.55, 1.55, 0.55);
  roof.position.y = 2.55;
  const brazier = torch();
  brazier.position.set(0, 2.55, 0.2);
  g.add(shaft, wood, roof, brazier);
  return g;
}

export function heraldicShield(): THREE.Group {
  const g = new THREE.Group();
  const plate = lit(new THREE.Mesh(new THREE.CircleGeometry(0.55, 22), toyMaterial(0xd0d4d8, { metal: 0.65, roughness: 0.28 })));
  const quads: Array<[number, number, number]> = [
    [0xf4d03f, -0.18, 0.18],
    [0x6c3483, 0.18, 0.18],
    [0xb03a2e, -0.18, -0.18],
    [0xd4a574, 0.18, -0.18],
  ];
  for (const [color, x, y] of quads) {
    const q = new THREE.Mesh(new THREE.PlaneGeometry(0.26, 0.26), toyMaterial(color, { roughness: 0.4 }));
    q.position.set(x, y, 0.02);
    g.add(q);
  }
  g.add(plate);
  plate.position.z = -0.01;
  return g;
}

export function stall(): THREE.Group {
  const g = new THREE.Group();
  const table = lit(new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.12, 0.7), mapped(0x8b5a2b, maps.wood)));
  table.position.y = 0.45;
  const cloth = lit(new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.08, 0.85), toyMaterial(0xc0392b, { roughness: 0.55 })));
  cloth.position.set(0, 0.95, 0);
  cloth.rotation.x = -0.35;
  const poleL = lit(new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.1, 8), mapped(0x5a3518, maps.wood)));
  poleL.position.set(-0.5, 0.55, -0.25);
  const poleR = poleL.clone();
  poleR.position.x = 0.5;
  g.add(table, cloth, poleL, poleR);
  return g;
}

export function cottage(level: number): THREE.Group {
  const g = new THREE.Group();
  const s = 1.15 + Math.min(level, 6) * 0.08;
  g.add(deck(2.3 * s, 1.9 * s));
  const house = timberHouse(2.05 * s, 1.55 * s, 1.55 * s);
  house.position.y = 0.26;
  const roof = gableRoof(2.35 * s, 1.8 * s, 0.95 * s);
  roof.position.y = 1.82 * s;
  const door = lit(new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.95, 0.07), mapped(0x5a3518, maps.wood, { normal: maps.woodN })));
  door.position.set(0, 0.78 * s, 0.8 * s);
  const emblem = lionEmblem(0.16 * s);
  emblem.position.set(0, 1.42 * s, 0.84 * s);
  const winL = windowGlow(0.28, 0.34);
  winL.position.set(-0.58 * s, 1.05 * s, 0.79 * s);
  const winR = windowGlow(0.28, 0.34);
  winR.position.set(0.58 * s, 1.05 * s, 0.79 * s);
  const t1 = torch();
  t1.position.set(-0.95 * s, 0.28, 0.88 * s);
  const t2 = torch();
  t2.position.set(0.95 * s, 0.28, 0.88 * s);
  const c1 = crate(1.2);
  c1.position.set(-1.05 * s, 0.26, 1.15 * s);
  const shield = lionEmblem(0.2);
  shield.position.set(-0.7 * s, 0.55, 1.2 * s);
  shield.rotation.x = -0.35;
  g.add(house, roof, door, emblem, winL, winR, t1, t2, c1, shield);
  return g;
}

export function blacksmith(level: number): THREE.Group {
  const g = new THREE.Group();
  const s = 1.15 + Math.min(level, 6) * 0.08;
  g.add(deck(2.4 * s, 2 * s));
  const house = timberHouse(2.1 * s, 1.65 * s, 1.7 * s, 0x6d6a66);
  house.position.y = 0.26;
  const plates = lit(new THREE.Mesh(new THREE.BoxGeometry(2.14 * s, 0.7 * s, 1.74 * s), toyMaterial(0x5d5d5d, { metal: 0.72, roughness: 0.28 })));
  plates.position.y = 0.7 * s;
  const roof = gableRoof(2.4 * s, 1.9 * s, 0.85 * s);
  roof.position.y = 1.95 * s;
  const stack = chimney();
  stack.position.set(-0.55 * s, 2.05 * s, -0.15);
  const door = lit(new THREE.Mesh(new THREE.BoxGeometry(0.55, 1.05, 0.07), mapped(0x5a3518, maps.wood, { normal: maps.woodN })));
  door.position.set(0, 0.82 * s, 0.88 * s);
  const crest = lionEmblem(0.18);
  crest.position.set(0, 0.88 * s, 0.93 * s);
  const sign = anvil();
  sign.position.set(0, 2.15 * s, 0.7 * s);
  const hammers = lit(new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.08, 0.08), toyMaterial(0x888888, { metal: 0.8, roughness: 0.25 })));
  hammers.position.set(0, 2.45 * s, 0.62 * s);
  const b1 = torch();
  b1.position.set(-1.0 * s, 0.26, 1.05 * s);
  const b2 = torch();
  b2.position.set(1.0 * s, 0.26, 1.05 * s);
  const ingot = crate(1.2);
  ingot.position.set(1.05 * s, 0.26, 1.2 * s);
  const puff = smokePuff();
  puff.position.set(-0.55 * s, 2.95 * s, -0.15);
  puff.userData.smoke = true;
  g.add(house, plates, roof, stack, door, crest, sign, hammers, b1, b2, ingot, puff);
  return g;
}

export function domeHouse(level: number, plaster = 0xb8a078): THREE.Group {
  const g = new THREE.Group();
  const s = 1.15 + Math.min(level, 6) * 0.08;
  g.add(deck(2.1 * s, 1.8 * s));
  const house = timberHouse(1.85 * s, 1.45 * s, 1.55 * s, plaster);
  house.position.y = 0.26;
  const dome = lit(new THREE.Mesh(new THREE.SphereGeometry(0.78 * s, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2), toyMaterial(0xc9a227, { metal: 0.78, roughness: 0.22 })));
  dome.position.y = 1.72 * s;
  const spire = lit(new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.4, 8), toyMaterial(0xb8860b, { metal: 0.8, roughness: 0.2 })));
  spire.position.y = 2.25 * s;
  const door = lit(new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.9, 0.07), mapped(0x5a3518, maps.wood, { normal: maps.woodN })));
  door.position.set(0, 0.75 * s, 0.8 * s);
  g.add(house, dome, spire, door, windowGlow());
  g.children[g.children.length - 1].position.set(0.4 * s, 0.6 * s, 0.62 * s);
  return g;
}

export function scrollMinaret(level: number): THREE.Group {
  const g = new THREE.Group();
  const s = 1.1 + Math.min(level, 6) * 0.08;
  g.add(deck(1.6 * s, 1.6 * s));
  const shaft = lit(new THREE.Mesh(new THREE.CylinderGeometry(0.48 * s, 0.58 * s, 3.2 * s, 16), mapped(0xb8a888, maps.plaster, { normal: maps.plasterN })));
  shaft.position.y = 1.75 * s;
  const balcony = lit(new THREE.Mesh(new THREE.CylinderGeometry(0.72 * s, 0.72 * s, 0.1, 14), mapped(0x5a3518, maps.wood, { normal: maps.woodN })));
  balcony.position.y = 3.15 * s;
  const dome = lit(new THREE.Mesh(new THREE.SphereGeometry(0.52 * s, 18, 14, 0, Math.PI * 2, 0, Math.PI / 2), toyMaterial(0x3d5a73, { metal: 0.35, roughness: 0.4 })));
  dome.position.y = 3.4 * s;
  const finial = lit(new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 8), toyMaterial(0xb8860b, { metal: 0.8 })));
  finial.position.y = 3.95 * s;
  g.add(shaft, balcony, dome, finial);
  return g;
}

export function crystalTemple(level: number): THREE.Group {
  const g = new THREE.Group();
  const s = 1.15 + Math.min(level, 6) * 0.08;
  g.add(deck(2.3 * s, 2 * s));
  const house = timberHouse(1.9 * s, 1.6 * s, 1.65 * s, 0x3d2463);
  house.position.y = 0.26;
  for (const [x, z, h] of [
    [0, 0, 1.4],
    [-0.45, 0.2, 1.05],
    [0.4, -0.15, 1.15],
  ]) {
    const crystal = lit(
      new THREE.Mesh(new THREE.OctahedronGeometry(0.28 * s), toyMaterial(0xce93d8, { emissive: 0x7b1fa2, emit: 1.15, metal: 0.2 })),
    );
    crystal.position.set(x * s, 1.35 * s + h * 0.15, z * s);
    crystal.userData.crystal = true;
    g.add(crystal);
  }
  g.add(house);
  return g;
}

export function inn(level: number): THREE.Group {
  const g = cottage(level);
  const awning = stall();
  awning.position.set(1.15, 0.05, 0.85);
  awning.scale.setScalar(0.75);
  g.add(awning);
  return g;
}

export function heroPlate(url: string, w: number, h: number): THREE.Mesh {
  const map = new THREE.TextureLoader().load(url, (texture) => {
    texture.colorSpace = THREE.SRGBColorSpace;
  });
  const mat = new THREE.MeshStandardMaterial({ map, roughness: 0.45, metalness: 0.05, transparent: true });
  const plane = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
  plane.castShadow = true;
  return plane;
}

export function wallGuard(kind: "turban" | "hood" | "helm"): THREE.Group {
  const colors: Record<"turban" | "hood" | "helm", { primary: number; accent: number }> = {
    turban: { primary: 0xc0392b, accent: 0xf4d03f },
    hood: { primary: 0x2c1a4d, accent: 0x7d3c98 },
    helm: { primary: 0x7b241c, accent: 0xd4ac0d },
  };
  const tone = colors[kind];
  const person = stylizedPerson(tone.primary, tone.accent, kind);
  person.scale.setScalar(1);
  const spear = lit(new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 1.1, 6), toyMaterial(0xbfc3c7, { metal: 0.6 })));
  spear.position.set(0.18, 0.7, 0.05);
  person.add(spear);
  return person;
}
