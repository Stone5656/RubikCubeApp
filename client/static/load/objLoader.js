import { importThree } from "../asyncImporters.js";
import { importOBJLoader } from "../asyncImporters.js";

/**
 * OBJ モデルをロードする
 * @param {string} modelPath - モデルのパス
 * @param {THREE.Material} material - 使用するマテリアル
 * @param {Function} callback - ロード完了後に実行する関数
 */
export async function loadOBJ(modelPath, material, callback) {
    const THREE= await importThree();
    const { OBJLoader } = await importOBJLoader();
    const loader = new OBJLoader();
    loader.load(
        modelPath,
        (object) => {
            object.traverse((child) => {
                if (child.isMesh) {
                    child.material = material;
                }
            });
            callback(object);
        },
        undefined,
        (error) => console.error(`OBJ Load Error:`, error)
    );
}
