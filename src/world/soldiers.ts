import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { stylizedPerson } from "./materials";

let proto: THREE.Group | null = null;
let loading: Promise<THREE.Group> | null = null;

export function loadSoldierRig(): Promise<THREE.Group> {
  if (proto) return Promise.resolve(proto);
  if (loading) return loading;
  loading = new Promise((resolve, reject) => {
    new GLTFLoader().load(
      "/models/soldier.glb",
      (gltf) => {
        proto = gltf.scene;
        proto.traverse((obj) => {
          if (obj instanceof THREE.Mesh) {
            obj.castShadow = true;
            obj.receiveShadow = true;
          }
        });
        resolve(proto);
      },
      undefined,
      reject,
    );
  });
  return loading;
}

export function spawnUnit(primary: number, accent: number, hat: "turban" | "hood" | "helm" | "none"): THREE.Group {
  if (!proto) return stylizedPerson(primary, accent, hat);
  const clone = proto.clone(true);
  clone.traverse((obj) => {
    if (obj instanceof THREE.Mesh && obj.material instanceof THREE.MeshStandardMaterial) {
      const mat = obj.material.clone();
      mat.color.lerp(new THREE.Color(primary), 0.4);
      if (hat === "hood") mat.emissive = new THREE.Color(0x2a1040);
      if (hat === "helm") mat.metalness = Math.min(1, mat.metalness + 0.25);
      obj.material = mat;
      obj.castShadow = true;
      obj.receiveShadow = true;
    }
  });
  clone.scale.setScalar(1.2);
  return clone;
}

export function ready(): boolean {
  return proto !== null;
}
