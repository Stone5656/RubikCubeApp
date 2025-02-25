import { importThree } from "../asyncImporters.js";

/**
 * シーンに光源を追加する。
 * @param {THREE.Scene} scene - 光源を追加する対象のシーン
 * @param {number | string} color - 光源の色（デフォルト: 0xffffff）
 * @param {number} intensity - 光の強さ（デフォルト: 1）
 * @param {THREE.Vector3 | number[]} position - 光源の位置（デフォルト: [5, 5, 5]）
 */
export async function setupLights(scene, color = 0xffffff, intensity = 1, position = [5, 5, 5]) {
    const THREE= await importThree();
    const light = new THREE.DirectionalLight(color, intensity);

    // 位置の設定（配列と THREE.Vector3 の両方に対応）
    if (Array.isArray(position)) {
        light.position.set(...position);
    } else if (position instanceof THREE.Vector3) {
        light.position.copy(position);
    } else {
        console.warn("Invalid position format. Expected an array or THREE.Vector3.");
        light.position.set(5, 5, 5); // デフォルト位置
    }

    scene.add(light);
}
