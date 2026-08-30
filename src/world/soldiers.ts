import * as THREE from "three";
import { stylizedPerson } from "./materials";

export function loadSoldierRig(): Promise<THREE.Group> {
  return Promise.resolve(new THREE.Group());
}

export function spawnUnit(primary: number, accent: number, hat: "turban" | "hood" | "helm" | "none"): THREE.Group {
  return stylizedPerson(primary, accent, hat);
}

export function tickUnit(root: THREE.Object3D, dt: number) {
  const mixer = root.userData.mixer as THREE.AnimationMixer | undefined;
  mixer?.update(dt);
}
