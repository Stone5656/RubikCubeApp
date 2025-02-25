import { importThree } from "../asyncImporters.js";

/**
 * メッシュのセットアップを行う
 * @param {THREE.Mesh | THREE.Object3D} mesh - 読み込んだ3Dモデルのメッシュ
 * @param {Object} options - メッシュのセットアップ用オプション
 * @param {number[]} [options.scale=[1,1,1]] - スケール倍率 [x, y, z]
 * @param {number[]} [options.position=[0,0,0]] - 位置 [x, y, z]
 * @param {number[]} [options.rotation=[0,0,0]] - 回転 [x, y, z] (ラジアン)
 * @param {number} [options.opacity=1.0] - 透明度 (0.0〜1.0)
 * @param {boolean} [options.transparent=false] - 透明化の有無
 * @param {boolean} [options.wireframe=false] - ワイヤーフレーム表示
 * @param {number} [options.color=0xffffff] - メッシュの色
 * @param {boolean} [options.receiveShadow=false] - 影を受け取るか
 * @param {boolean} [options.castShadow=false] - 影を落とすか
 * @returns {Promise<THREE.Mesh | THREE.Object3D>} セットアップ済みのメッシュ
 */
export async function setupMesh(mesh, options = {}) {
    const THREE = await importThree();

    // デフォルトパラメータを設定
    const {
        scale = [1, 1, 1],
        position = [0, 0, 0],
        rotation = [0, 0, 0],
        opacity = 1.0,
        transparent = false,
        wireframe = false,
        color = 0xffffff,
        receiveShadow = false,
        castShadow = false,
    } = options;

    // スケールの適用
    mesh.scale.set(...scale);

    // 位置の適用
    mesh.position.set(...position);

    // 回転の適用（ラジアン指定）
    mesh.rotation.set(...rotation);

    // マテリアルの変更
    if (mesh.material) {
        mesh.material = new THREE.MeshStandardMaterial({
            color: color,
            opacity: opacity,
            transparent: transparent,
            wireframe: wireframe,
        });
    }

    // 影の設定
    mesh.receiveShadow = receiveShadow;
    mesh.castShadow = castShadow;

    console.log("Mesh setup complete:", mesh);

    return mesh;
}
