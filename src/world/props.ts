import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const PATHS = {
  cannon: "/models/cannon/cannon.gltf",
  lantern: "/models/lantern/lantern.gltf",
  crate: "/models/crate/crate.gltf",
  boulder: "/models/boulder/boulder.gltf",
  stove: "/models/stove/stove.gltf",
  table: "/models/table/table.gltf",
} as const;

export type PropId = keyof typeof PATHS;

const prototypes = new Map<PropId, THREE.Group>();
const loader = new GLTFLoader();

function prepare(root: THREE.Object3D) {
  root.traverse((obj) => {
    if (obj instanceof THREE.Mesh) {
      obj.castShadow = true;
      obj.receiveShadow = true;
      const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
      for (const mat of mats) {
        if (mat instanceof THREE.MeshStandardMaterial) {
          mat.envMapIntensity = 1.15;
        }
      }
    }
  });
}

function sitOnGround(root: THREE.Object3D) {
  const box = new THREE.Box3().setFromObject(root);
  root.position.y -= box.min.y;
}

function loadOne(id: PropId, url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    loader.load(
      url,
      (gltf) => {
        prepare(gltf.scene);
        prototypes.set(id, gltf.scene);
        resolve();
      },
      undefined,
      reject,
    );
  });
}

export function loadProps(): Promise<void> {
  return Promise.all(Object.entries(PATHS).map(([id, url]) => loadOne(id as PropId, url))).then(() => undefined);
}

export function spawnProp(id: PropId, height: number, x: number, z: number, rotY = 0): THREE.Group | null {
  const proto = prototypes.get(id);
  if (!proto) return null;
  const clone = proto.clone(true);
  const box = new THREE.Box3().setFromObject(clone);
  const size = new THREE.Vector3();
  box.getSize(size);
  const scale = height / Math.max(size.y, 0.01);
  clone.scale.setScalar(scale);
  sitOnGround(clone);
  clone.position.x += x;
  clone.position.z += z;
  clone.rotation.y = rotY;
  return clone;
}

export function hasProps(): boolean {
  return prototypes.size === Object.keys(PATHS).length;
}
