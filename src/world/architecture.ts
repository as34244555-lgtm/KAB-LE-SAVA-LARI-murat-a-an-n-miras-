import * as THREE from "three";
import { chimney, lit, smokePuff, torch } from "./kit";
import { pbr } from "./textures";

function box(w: number, h: number, d: number, mat: THREE.Material, y = 0): THREE.Mesh {
  const mesh = lit(new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat));
  mesh.position.y = y || h / 2;
  return mesh;
}

function cyl(rt: number, rb: number, h: number, seg: number, mat: THREE.Material, y = 0): THREE.Mesh {
  const mesh = lit(new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), mat));
  mesh.position.y = y || h / 2;
  return mesh;
}

function casement(w: number, h: number): THREE.Group {
  const g = new THREE.Group();
  const frame = box(w, h, 0.08, pbr("beam", 0xffffff, { repeat: 1 }));
  const glass = new THREE.Mesh(
    new THREE.PlaneGeometry(w * 0.68, h * 0.68),
    new THREE.MeshPhysicalMaterial({
      color: 0xffd7a0,
      emissive: 0xffaa55,
      emissiveIntensity: 0.55,
      roughness: 0.12,
      metalness: 0.05,
      transparent: true,
      opacity: 0.78,
      transmission: 0.15,
    }),
  );
  glass.position.z = 0.045;
  const mullion = box(0.03, h * 0.7, 0.04, pbr("beam"));
  mullion.position.z = 0.03;
  const bar = box(w * 0.7, 0.03, 0.04, pbr("beam"));
  bar.position.z = 0.03;
  g.add(frame, glass, mullion, bar);
  return g;
}

function plankDoor(w: number, h: number): THREE.Group {
  const g = new THREE.Group();
  g.add(box(w, h, 0.08, pbr("wood", 0xffffff, { repeat: 1.4 })));
  const strap = box(w * 0.92, 0.045, 0.09, pbr("beam"));
  strap.position.y = h * 0.28;
  const strap2 = strap.clone();
  strap2.position.y = h * 0.62;
  const knob = lit(new THREE.Mesh(new THREE.SphereGeometry(0.035, 10, 8), pbr("beam", 0xffffff, { metal: 0.65 })));
  knob.position.set(w * 0.28, h * 0.48, 0.06);
  g.add(strap, strap2, knob);
  return g;
}

function timberFrame(w: number, h: number, d: number, plaster = 0xe8d4b4): THREE.Group {
  const g = new THREE.Group();
  g.add(box(w, h, d, pbr("plaster", plaster, { repeat: 2.2 })));
  const beamMat = pbr("beam", 0xffffff, { repeat: 1.6 });
  const t = 0.09;
  const faces: Array<[number, number, number, number, number, number]> = [
    [w + 0.02, t, t, 0, h - t / 2, d / 2 + 0.01],
    [w + 0.02, t, t, 0, t / 2, d / 2 + 0.01],
    [t, h, t, -w / 2 + t / 2, h / 2, d / 2 + 0.01],
    [t, h, t, w / 2 - t / 2, h / 2, d / 2 + 0.01],
    [w + 0.02, t, t, 0, h * 0.52, d / 2 + 0.01],
  ];
  for (const [bw, bh, bd, x, y, z] of faces) {
    const beam = box(bw, bh, bd, beamMat);
    beam.position.set(x, y, z);
    g.add(beam);
  }
  const postL = box(t, h, t, beamMat);
  postL.position.set(-w / 2 + t / 2, h / 2, -d / 2 - 0.01);
  const postR = postL.clone();
  postR.position.x = w / 2 - t / 2;
  g.add(postL, postR);
  return g;
}

function tiledRoof(w: number, d: number, rise: number): THREE.Group {
  const g = new THREE.Group();
  const mat = pbr("tile", 0xffffff, { repeat: 3.4 });
  const depth = Math.hypot(d * 0.58, rise);
  const left = lit(new THREE.Mesh(new THREE.BoxGeometry(w + 0.42, 0.09, depth), mat));
  left.rotation.x = Math.atan2(rise, d * 0.52);
  left.position.set(0, rise * 0.48, -d * 0.16);
  const right = lit(new THREE.Mesh(new THREE.BoxGeometry(w + 0.42, 0.09, depth), mat));
  right.rotation.x = -Math.atan2(rise, d * 0.52);
  right.position.set(0, rise * 0.48, d * 0.16);
  const ridge = cyl(0.05, 0.05, w + 0.3, 8, pbr("tile", 0x6a2a16, { repeat: 2 }), rise * 0.92);
  ridge.rotation.z = Math.PI / 2;
  const barge = box(0.08, rise * 0.95, d + 0.15, pbr("beam"));
  barge.position.set(-w / 2 - 0.08, rise * 0.35, 0);
  const barge2 = barge.clone();
  barge2.position.x = w / 2 + 0.08;
  g.add(left, right, ridge, barge, barge2);
  return g;
}

export function watchTower(): THREE.Group {
  const g = new THREE.Group();
  const shaft = cyl(0.7, 0.82, 4.6, 16, pbr("stone", 0xffffff, { repeat: 2 }));
  const walk = cyl(1.05, 1.05, 0.18, 16, pbr("wood"));
  walk.position.y = 4.55;
  const roof = lit(new THREE.Mesh(new THREE.ConeGeometry(1.2, 1.35, 12), pbr("tile", 0xffffff, { repeat: 2 })));
  roof.position.y = 5.4;
  const door = box(0.38, 0.9, 0.1, pbr("wood"));
  door.position.set(0, 0.55, 0.78);
  const slit = box(0.14, 0.38, 0.12, pbr("beam", 0x1a120c));
  slit.position.set(0, 2.6, 0.78);
  g.add(shaft, walk, roof, door, slit);
  return g;
}

export function oakBarrel(scale = 1): THREE.Group {
  const g = new THREE.Group();
  const body = cyl(0.22 * scale, 0.24 * scale, 0.46 * scale, 24, pbr("barrel", 0xffffff, { repeat: 1 }));
  const hoop = cyl(0.245 * scale, 0.245 * scale, 0.03 * scale, 20, pbr("beam", 0xffffff, { metal: 0.55 }), 0.12 * scale);
  const hoop2 = hoop.clone();
  hoop2.position.y = 0.34 * scale;
  g.add(body, hoop, hoop2);
  return g;
}

export function stoneWell(): THREE.Group {
  const g = new THREE.Group();
  g.add(cyl(0.48, 0.54, 0.62, 20, pbr("stone", 0xffffff, { repeat: 1.6 })));
  const rim = cyl(0.56, 0.56, 0.08, 20, pbr("stone", 0xffffff, { repeat: 1 }), 0.64);
  const postL = cyl(0.04, 0.04, 0.95, 8, pbr("wood"));
  postL.position.set(-0.38, 1.05, 0);
  const postR = postL.clone();
  postR.position.x = 0.38;
  const beam = box(0.9, 0.08, 0.08, pbr("wood"));
  beam.position.set(0, 1.52, 0);
  const roof = tiledRoof(1.15, 0.85, 0.32);
  roof.position.y = 1.56;
  const bucket = cyl(0.12, 0.1, 0.16, 10, pbr("wood", 0xffffff, { repeat: 1 }), 0.78);
  g.add(rim, postL, postR, beam, roof, bucket);
  return g;
}

export function timberCottage(level: number): THREE.Group {
  const g = new THREE.Group();
  const s = 1.12 + Math.min(level, 6) * 0.07;
  const w = 2.35 * s;
  const d = 1.85 * s;
  const h = 1.55 * s;
  g.add(box(w + 0.35, 0.32, d + 0.3, pbr("stone", 0xffffff, { repeat: 1.8 }), 0.16));
  const house = timberFrame(w, h, d, 0xe6d2ae);
  house.position.y = 0.32;
  const roof = tiledRoof(w + 0.25, d + 0.2, 0.95 * s);
  roof.position.y = 0.32 + h;
  const door = plankDoor(0.46, 0.98 * s);
  door.position.set(0, 0.32 + 0.49 * s, d / 2 + 0.02);
  const winL = casement(0.32, 0.38);
  winL.position.set(-0.62 * s, 0.32 + 0.95 * s, d / 2 + 0.02);
  const winR = casement(0.32, 0.38);
  winR.position.set(0.62 * s, 0.32 + 0.95 * s, d / 2 + 0.02);
  const stack = chimney();
  stack.position.set(-0.55 * s, 0.32 + h + 0.15, -0.15);
  const t1 = torch();
  t1.position.set(-0.95 * s, 0.32, d / 2 + 0.12);
  const t2 = torch();
  t2.position.set(0.95 * s, 0.32, d / 2 + 0.12);
  const b1 = oakBarrel(0.95);
  b1.position.set(-1.15 * s, 0, d / 2 + 0.35);
  g.add(house, roof, door, winL, winR, stack, t1, t2, b1);
  return g;
}

export function stoneForge(level: number): THREE.Group {
  const g = new THREE.Group();
  const s = 1.12 + Math.min(level, 6) * 0.07;
  const w = 2.4 * s;
  const d = 1.95 * s;
  const h = 1.45 * s;
  g.add(box(w + 0.4, 0.3, d + 0.28, pbr("stone", 0xffffff, { repeat: 1.8 }), 0.15));
  const body = box(w, h, d, pbr("stone", 0xd8d0c4, { repeat: 2.1 }), 0.3 + h / 2);
  const open = box(w * 0.55, h * 0.72, 0.08, pbr("beam", 0x2a1a10), 0.3 + h * 0.42);
  open.position.z = d / 2 + 0.02;
  const roof = tiledRoof(w + 0.2, d + 0.15, 0.78 * s);
  roof.position.y = 0.3 + h;
  const stack = chimney();
  stack.position.set(-0.5 * s, 0.3 + h + 0.1, -0.1);
  const puff = smokePuff();
  puff.position.set(-0.5 * s, 0.3 + h + 1.05, -0.1);
  puff.userData.smoke = true;
  const hearth = box(0.7, 0.18, 0.55, pbr("stone", 0x4a4038), 0.4);
  hearth.position.z = 0.15;
  const glow = new THREE.PointLight(0xff6a22, 2.2, 5, 2);
  glow.position.set(0, 0.7, 0.35);
  const t1 = torch();
  t1.position.set(-1.05 * s, 0.3, d / 2 + 0.1);
  const t2 = torch();
  t2.position.set(1.05 * s, 0.3, d / 2 + 0.1);
  g.add(body, open, roof, stack, puff, hearth, glow, t1, t2);
  return g;
}

export function goldStore(level: number): THREE.Group {
  const g = new THREE.Group();
  const s = 1.05 + Math.min(level, 6) * 0.06;
  g.add(box(2.3 * s, 0.28, 1.8 * s, pbr("stone", 0xffffff, { repeat: 1.6 }), 0.14));
  const shed = timberFrame(1.7 * s, 1.15 * s, 1.35 * s, 0xc8b48a);
  shed.position.y = 0.28;
  const roof = tiledRoof(1.95 * s, 1.55 * s, 0.55 * s);
  roof.position.y = 1.42 * s;
  const door = plankDoor(0.4, 0.85 * s);
  door.position.set(0, 0.28 + 0.42 * s, 0.7 * s);
  const b1 = oakBarrel(1);
  b1.position.set(-0.85 * s, 0, 0.85 * s);
  const b2 = oakBarrel(0.85);
  b2.position.set(0.75 * s, 0, 0.7 * s);
  const pile = box(0.7, 0.35, 0.55, pbr("beam", 0xd4a017, { metal: 0.35 }), 0.46);
  pile.position.set(-0.15, 0, 0.95 * s);
  g.add(shed, roof, door, b1, b2, pile);
  return g;
}

export function caravanInn(level: number): THREE.Group {
  const g = timberCottage(level);
  const porch = box(1.4, 0.12, 0.85, pbr("wood"), 0.38);
  porch.position.set(1.15, 0, 0.95);
  const pole = cyl(0.05, 0.05, 1.15, 8, pbr("wood"));
  pole.position.set(1.55, 0.95, 1.15);
  const cloth = box(1.35, 0.06, 0.9, pbr("plaster", 0x9a1c1c));
  cloth.position.set(1.2, 1.45, 0.95);
  cloth.rotation.x = -0.28;
  g.add(porch, pole, cloth);
  return g;
}

export function scrollMinaret3d(level: number): THREE.Group {
  const g = new THREE.Group();
  const s = 1.08 + Math.min(level, 6) * 0.07;
  g.add(box(1.7 * s, 0.28, 1.7 * s, pbr("stone", 0xffffff, { repeat: 1.4 }), 0.14));
  const base = cyl(0.72 * s, 0.8 * s, 0.7 * s, 16, pbr("stone", 0xffffff, { repeat: 1.6 }));
  base.position.y = 0.55 * s;
  const shaft = cyl(0.42 * s, 0.55 * s, 3.1 * s, 18, pbr("plaster", 0xd8c4a0, { repeat: 2.4 }));
  shaft.position.y = 2.15 * s;
  const ring = cyl(0.62 * s, 0.62 * s, 0.12, 16, pbr("wood"));
  ring.position.y = 3.35 * s;
  const rail = cyl(0.7 * s, 0.7 * s, 0.08, 16, pbr("beam"));
  rail.position.y = 3.55 * s;
  const dome = lit(
    new THREE.Mesh(new THREE.SphereGeometry(0.5 * s, 20, 14, 0, Math.PI * 2, 0, Math.PI / 2), pbr("tile", 0x4a6580, { metal: 0.35 })),
  );
  dome.position.y = 3.62 * s;
  const finial = cyl(0.03, 0.05, 0.35 * s, 8, pbr("beam", 0xd4af37, { metal: 0.7 }));
  finial.position.y = 4.2 * s;
  g.add(base, shaft, ring, rail, dome, finial);
  return g;
}

export function darkTemple(level: number): THREE.Group {
  const g = new THREE.Group();
  const s = 1.12 + Math.min(level, 6) * 0.07;
  g.add(box(2.5 * s, 0.3, 2.1 * s, pbr("stone", 0x5a4a62, { repeat: 1.8 }), 0.15));
  const hall = box(2.05 * s, 1.7 * s, 1.8 * s, pbr("wall", 0x6a4a78, { repeat: 2 }), 0.3 + 0.85 * s);
  const roof = tiledRoof(2.25 * s, 2 * s, 0.85 * s);
  roof.position.y = 0.3 + 1.7 * s;
  const door = plankDoor(0.5, 1.05 * s);
  door.position.set(0, 0.3 + 0.52 * s, 0.92 * s);
  for (const [x, z, h] of [
    [0, 0, 1.55],
    [-0.48, 0.18, 1.2],
    [0.42, -0.12, 1.28],
  ]) {
    const crystal = lit(
      new THREE.Mesh(
        new THREE.OctahedronGeometry(0.26 * s),
        new THREE.MeshPhysicalMaterial({
          color: 0xce93d8,
          emissive: 0x7b1fa2,
          emissiveIntensity: 1.1,
          roughness: 0.12,
          metalness: 0.15,
          transmission: 0.35,
          transparent: true,
          opacity: 0.92,
        }),
      ),
    );
    crystal.position.set(x * s, 1.55 * s + h * 0.12, z * s);
    crystal.userData.crystal = true;
    g.add(crystal);
  }
  g.add(hall, roof, door);
  return g;
}

function merlons(length: number, height: number): THREE.Group {
  const g = new THREE.Group();
  const n = Math.max(4, Math.round(length / 0.55));
  for (let i = 0; i < n; i += 1) {
    if (i % 2 === 0) continue;
    const tooth = box(0.28, 0.32, 0.42, pbr("stone", 0xffffff, { repeat: 1 }));
    tooth.position.set(-length / 2 + (i + 0.5) * (length / n), height + 0.16, 0);
    g.add(tooth);
  }
  return g;
}

function keepWindows(parent: THREE.Group, w: number, _h: number, d: number) {
  const dark = pbr("beam", 0x1a120c, { repeat: 1 });
  const frame = pbr("beam", 0xffffff, { repeat: 1 });
  const spots: Array<[number, number, number]> = [
    [-1.35, 2.4, d / 2 + 0.02],
    [0, 2.4, d / 2 + 0.02],
    [1.35, 2.4, d / 2 + 0.02],
    [-1.35, 4.6, d / 2 + 0.02],
    [1.35, 4.6, d / 2 + 0.02],
    [0, 5.8, d / 2 + 0.02],
    [w / 2 + 0.02, 3.2, 0.8],
    [w / 2 + 0.02, 5.1, -0.7],
  ];
  for (const [x, y, z] of spots) {
    const hole = box(0.42, 0.62, 0.18, dark, y);
    hole.position.set(x, y, z);
    if (Math.abs(x) > w / 2) hole.rotation.y = Math.PI / 2;
    const lip = box(0.5, 0.72, 0.08, frame, y);
    lip.position.set(x, y, z + (Math.abs(x) > w / 2 ? 0 : 0.06));
    if (Math.abs(x) > w / 2) lip.rotation.y = Math.PI / 2;
    parent.add(hole, lip);
  }
}

export function stoneCitadel(): THREE.Group {
  const g = new THREE.Group();
  const hill = lit(new THREE.Mesh(new THREE.CylinderGeometry(12, 17, 2.6, 40), pbr("sand", 0xc4b08a, { repeat: 8 })));
  hill.position.y = -0.75;
  const keep = box(5.6, 7.6, 4.8, pbr("stone", 0xffffff, { repeat: 3.4 }), 3.8);
  const keepRoof = tiledRoof(6.1, 5.2, 1.75);
  keepRoof.position.y = 7.6;
  const keepTop = box(5.8, 0.38, 5, pbr("stone"), 7.75);
  const buttressL = box(0.55, 6.4, 0.7, pbr("stone", 0xffffff, { repeat: 1.6 }), 3.2);
  buttressL.position.set(-2.9, 3.2, 2.3);
  const buttressR = buttressL.clone();
  buttressR.position.x = 2.9;
  const balcony = box(2.4, 0.18, 1.1, pbr("stone"), 4.55);
  balcony.position.z = 2.7;
  g.add(hill, keep, keepRoof, keepTop, merlons(5.8, 7.75), buttressL, buttressR, balcony);
  keepWindows(g, 5.6, 7.6, 4.8);
  const towers: Array<[number, number, number]> = [
    [-4.6, -3.6, 9.2],
    [4.6, -3.6, 8.6],
    [-4.6, 3.5, 10.2],
    [4.6, 3.5, 9.6],
    [0.2, -4.4, 6.4],
  ];
  for (const [x, z, h] of towers) {
    const shaft = cyl(1.2, 1.32, h, 18, pbr("stone", 0xffffff, { repeat: 2.6 }));
    shaft.position.set(x, h / 2, z);
    const cap = cyl(1.35, 1.35, 0.3, 16, pbr("stone"));
    cap.position.set(x, h + 0.05, z);
    const roof = lit(new THREE.Mesh(new THREE.ConeGeometry(1.55, 1.85, 14), pbr("tile", 0xffffff, { repeat: 2 })));
    roof.position.set(x, h + 1.1, z);
    const slit = box(0.18, 0.55, 0.2, pbr("beam", 0x1a120c));
    slit.position.set(x, h * 0.62, z + 1.2);
    g.add(shaft, cap, roof, slit);
  }
  const wallN = box(8.8, 3.8, 0.85, pbr("stone", 0xffffff, { repeat: 2.8 }), 1.9);
  wallN.position.z = -3.6;
  const wallS = wallN.clone();
  wallS.position.z = 3.5;
  const wallW = box(0.85, 3.8, 7.1, pbr("stone", 0xffffff, { repeat: 2.4 }), 1.9);
  wallW.position.x = -4.6;
  const wallE = wallW.clone();
  wallE.position.x = 4.6;
  const gatehouse = box(3.1, 4.4, 2.2, pbr("stone", 0xffffff, { repeat: 2 }), 2.2);
  gatehouse.position.set(0, 2.2, 4.6);
  const gate = box(1.5, 2.3, 0.7, pbr("beam", 0x3a2416), 1.15);
  gate.position.set(0, 1.15, 5.5);
  const arch = cyl(0.85, 0.85, 0.7, 16, pbr("stone"));
  arch.rotation.x = Math.PI / 2;
  arch.position.set(0, 2.4, 5.55);
  const gateRoof = tiledRoof(3.4, 2.5, 0.9);
  gateRoof.position.set(0, 4.4, 4.6);
  g.add(wallN, wallS, wallW, wallE, gatehouse, gate, arch, gateRoof);
  const banner = box(0.7, 1.7, 0.05, pbr("plaster", 0x8b1e24));
  banner.position.set(0, 5.6, 5.7);
  g.add(banner);
  return g;
}
