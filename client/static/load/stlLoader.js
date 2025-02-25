import { importThree } from "../asyncImporters.js";
import { importSTLLoader } from "../asyncImporters.js";

/**
 * STL モデルをロードする
 * @param {string} modelPath - モデルのパス
 * @param {THREE.Material} material - 使用するマテリアル
 * @param {Function} callback - ロード完了後に実行する関数
 */
export async function loadSTL(modelPath, material, callback) {
    const THREE= await importThree();
    const { STLLoader } = await importSTLLoader();
    const loader = new STLLoader();
    loader.load(
        modelPath,
        (geometry) => {
            const mesh = new THREE.Mesh(geometry, material);
            mesh.rotation.x = -Math.PI / 2; // STL の向きを調整
            callback(mesh);
        },
        undefined,
        (error) => console.error(`STL Load Error:`, error)
    );
}
