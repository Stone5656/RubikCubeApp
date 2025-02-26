import { importThree } from "../asyncImporters.js";
import { importPLYLoader } from "../asyncImporters.js";

/**
 * PLY モデルをロードする
 * @param {string} modelPath - モデルのパス
 * @param {THREE.Material} material - 使用するマテリアル（点群モードでは無視）
 * @param {Function} callback - ロード完了後に実行する関数
 * @param {boolean} computeNormals - 法線を計算するか（デフォルト: false）
 * @param {boolean} asPointCloud - 点群のまま出力するか（デフォルト: false）
 */
export async function loadPLY(modelPath, material, callback, computeNormals = false, asPointCloud = true) {
    const THREE = await importThree();
    const { PLYLoader } = await importPLYLoader();
    const loader = new PLYLoader();
    
    loader.load(
        modelPath,
        (geometry) => {
            if (computeNormals) {
                geometry.computeVertexNormals();
            }

            let object;
            if (asPointCloud) {
                // 点群として出力
                const pointsMaterial = new THREE.PointsMaterial({ size: 0.05, color: 0xffffff });
                object = new THREE.Points(geometry, pointsMaterial);
            } else {
                // メッシュとして出力
                object = new THREE.Mesh(geometry, material);
            }

            callback(object);
        },
        undefined,
        (error) => console.error(`PLY Load Error:`, error)
    );
}
