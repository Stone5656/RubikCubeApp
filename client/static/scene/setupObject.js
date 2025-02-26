import { importThree } from "../asyncImporters.js";

/**
 * 3D オブジェクト（Mesh, Points, Object3D）のセットアップを行う
 * @param {THREE.Mesh | THREE.Points | THREE.Object3D} object - 3Dモデルのオブジェクト
 * @param {Object} base_options - 全てのオブジェクト共通のオプション
 * @param {number[]} [base_options.scale=[1,1,1]] - スケール倍率 [x, y, z]
 * @param {number[]} [base_options.position=[0,0,0]] - 位置 [x, y, z]
 * @param {number[]} [base_options.rotation=[0,0,0]] - 回転 [x, y, z] (ラジアン)
 * @param {Object} object_options - オブジェクト種別ごとのオプション (Mesh, Points, Object3D)
 * @returns {Promise<THREE.Mesh | THREE.Points | THREE.Object3D>} セットアップ済みのオブジェクト
 */
export async function setupObject(object, base_options = {}, object_options = {}) {
    const THREE = await importThree();

    // 共通オプション
    const {
        scale = [1, 1, 1],
        position = [0, 0, 0],
        rotation = [0, 0, 0],
    } = base_options;

    // スケールの適用
    object.scale.set(...scale);

    // 位置の適用
    object.position.set(...position);

    // 回転の適用（ラジアン指定）
    object.rotation.set(...rotation);

    // `object` の型に応じてオプションを適用
    switch (true) {
        case object.isMesh: {
            // Mesh 用オプション
            const {
                color = 0xffffff,
                opacity = 1.0,
                transparent = false,
                wireframe = false,
                receiveShadow = false,
                castShadow = false,
            } = object_options;

            object.material = new THREE.MeshStandardMaterial({
                color: color,
                opacity: opacity,
                transparent: transparent,
                wireframe: wireframe,
            });

            object.receiveShadow = receiveShadow;
            object.castShadow = castShadow;
            break;
        }

        case object.isPoints: {
            // Points 用オプション
            const {
                color = 0xffffff,
                opacity = 1.0,
                transparent = false,
                size = 1.0,
                sizeAttenuation = true,
                vertexColors = false,
            } = object_options;

            object.material = new THREE.PointsMaterial({
                color: color,
                opacity: opacity,
                transparent: transparent,
                size: size,
                sizeAttenuation: sizeAttenuation,
                vertexColors: vertexColors,
            });
            break;
        }

        case object.isObject3D: {
            // Object3D（グループなど）用オプション（今のところ追加オプションなし）
            console.log("Object3D setup complete:", object);
            break;
        }

        default:
            console.warn("Unsupported object type:", object);
    }

    console.log("Object setup complete:", object);
    return object;
}
