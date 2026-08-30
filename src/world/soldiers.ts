import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { clone as cloneSkinned } from "three/examples/jsm/utils/SkeletonUtils.js";
import { stylizedPerson } from "./materials";

let proto: THREE.Group | null = null;
let clips: THREE.AnimationClip[] = [];
let loading: Promise<THREE.Group> | null = null;

export function loadSoldierRig(): Promise<THREE.Group> {
  if (proto) return Promise.resolve(proto);
  if (loading) return loading;
  loading = new Promise((resolve, reject) => {
    new GLTFLoader().load(
      "/models/soldier.glb",
      (gltf) => {
        proto = gltf.scene;
        clips = gltf.animations;
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
  const clone = cloneSkinned(proto) as THREE.Group;
  clone.traverse((obj) => {
    if (obj instanceof THREE.Mesh && obj.material instanceof THREE.MeshStandardMaterial) {
      const mat = obj.material.clone();
      mat.color.lerp(new THREE.Color(primary), 0.35);
      if (hat === "hood") mat.emissive = new THREE.Color(0x1a0a28);
      if (hat === "helm") mat.metalness = Math.min(1, mat.metalness + 0.2);
      obj.material = mat;
      obj.castShadow = true;
      obj.receiveShadow = true;
    }
  });
  clone.scale.setScalar(1.35);
  clone.rotation.y = Math.PI;
  const mixer = new THREE.AnimationMixer(clone);
  const idle = THREE.AnimationClip.findByName(clips, "Idle") ?? clips[0];
  if (idle) {
    const action = mixer.clipAction(idle);
    action.play();
  }
  clone.userData.mixer = mixer;
  return clone;
}

export function tickUnit(root: THREE.Object3D, dt: number) {
  const mixer = root.userData.mixer as THREE.AnimationMixer | undefined;
  mixer?.update(dt);
}
