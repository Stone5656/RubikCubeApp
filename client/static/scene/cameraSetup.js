import { importThree } from "../asyncImporters.js";

/**
 * カメラを作成し、視点を設定する。
 * @param {number} fov - 視野角（Field of View）
 * @param {number} aspect - アスペクト比（width / height）
 * @param {number} near - 近接クリップ面（最も近い描画可能距離）
 * @param {number} far - 遠方クリップ面（最も遠い描画可能距離）
 * @param {THREE.Vector3 | number[]} position - カメラの初期位置
 * @returns {THREE.PerspectiveCamera} 透視投影カメラオブジェクト
 */
export async function createCamera(fov, aspect, near, far, position = [0, 0, 20]) {
    const THREE= await importThree();
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    // 位置の設定（配列と THREE.Vector3 の両方に対応）
    if (Array.isArray(position)) {
        camera.position.set(...position);
    } else if (position instanceof THREE.Vector3) {
        camera.position.copy(position);
    } else {
        console.warn("Invalid position format. Expected an array or THREE.Vector3.");
        camera.position.set(0, 0, 20); // デフォルト位置
    }

    return camera;
}
