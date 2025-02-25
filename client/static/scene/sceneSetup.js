import { importThree } from "../asyncImporters.js";

/**
 * シーンを作成し、3Dオブジェクトの描画空間を準備する。
 * @returns {Promise<THREE.Scene>} シーンオブジェクト
 */
export async function setupScene() {
    const THREE = await importThree();
    console.log("THREE:", THREE);
    return new THREE.Scene();
}
