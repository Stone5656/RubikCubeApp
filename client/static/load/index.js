import { loadSTL } from "./stlLoader.js";
import { loadOBJ } from "./objLoader.js";
import { loadPLY } from "./plyLoader.js";

/**
 * モデルをロードする関数（STL, OBJ, PLY に対応）
 * @param {THREE.Scene} scene - 追加するシーン
 * @param {string} modelPath - モデルのパス
 * @param {THREE.Material} material - 使用するマテリアル
 * @returns {Promise<THREE.Mesh | THREE.Object3D>} ロードされたメッシュまたはオブジェクト
 */
export async function loadModel(scene, modelPath, material, computeNormals = false, asPointCloud = false) {
    return new Promise(async (resolve, reject) => {
        const extension = modelPath.split(".").pop().toLowerCase();

        const onLoad = (mesh) => {
            scene.add(mesh);
            resolve(mesh);
        };

        switch (extension) {
            case "stl":
                await loadSTL(modelPath, material, onLoad);
                break;
            case "obj":
                await loadOBJ(modelPath, material, onLoad);
                break;
            case "ply":
                await loadPLY(modelPath, material, onLoad, computeNormals, asPointCloud);
                break;
            default:
                reject(new Error(`Unsupported file format: ${extension}`));
        }
    });
}
