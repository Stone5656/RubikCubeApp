import { importOrbitControls } from "../asyncImporters.js";

/**
 * カメラの操作コントロールを設定する。
 * @param {THREE.Camera} camera - 操作対象のカメラ
 * @param {THREE.Renderer} renderer - レンダラー（DOM要素にアタッチ）
 * @param {boolean} enableDamping - 慣性効果を有効化（デフォルト: true）
 * @param {number} dampingFactor - 慣性の影響度（デフォルト: 0.05）
 * @param {boolean} enablePan - パン操作の有効化（デフォルト: true）
 * @param {number} keyPanSpeed - キーボードによるパン操作の速度（デフォルト: 50.0）
 * @param {boolean} screenSpacePanning - 画面空間パンの有効化（デフォルト: false）
 * @param {number} minDistance - 最小ズーム距離（デフォルト: 0.5）
 * @param {number} maxDistance - 最大ズーム距離（デフォルト: 100）
 * @param {number} maxPolarAngle - 最大回転角度（デフォルト: Math.PI, 180度）
 * @returns {OrbitControls} カメラコントロールオブジェクト
 */
export async function setupControls(
    camera,
    renderer,
    enableDamping = true,
    dampingFactor = 0.05,
    enablePan = true,
    keyPanSpeed = 50.0,
    screenSpacePanning = false,
    minDistance = 0.5,
    maxDistance = 100,
    maxPolarAngle = Math.PI
) {
    const { OrbitControls } = await importOrbitControls(); // 非同期で OrbitControls をロード
    const controls = new OrbitControls(camera, renderer.domElement);

    controls.enableDamping = enableDamping;
    controls.dampingFactor = dampingFactor;
    controls.enablePan = enablePan;
    controls.keyPanSpeed = keyPanSpeed;
    controls.screenSpacePanning = screenSpacePanning;
    controls.minDistance = minDistance;
    controls.maxDistance = maxDistance;
    controls.maxPolarAngle = maxPolarAngle;

    return controls;
}
