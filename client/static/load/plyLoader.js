import { importThree } from "../asyncImporters.js";
import { importPLYLoader } from "../asyncImporters.js";

/**
 * PLY モデルをロードする
 * @param {string} modelPath - モデルのパス
 * @param {THREE.Material} material - 使用するマテリアル
 * @param {Function} callback - ロード完了後に実行する関数
 */
export async function loadPLY(modelPath, material, callback) {
    const THREE= await importThree();
    const { PLYLoader } = await importPLYLoader();
    const loader = new PLYLoader();
    loader.load(
        modelPath,
        (geometry) => {
            geometry.computeVertexNormals();
            const mesh = new THREE.Mesh(geometry, material);
            callback(mesh);
        },
        undefined,
        (error) => console.error(`PLY Load Error:`, error)
    );
}
