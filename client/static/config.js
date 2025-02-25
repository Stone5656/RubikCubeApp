// === カメラ設定 ===
export const CAMERA_FOV = 75; // 視野角 (Field of View)
export const CAMERA_NEAR = 0.1; // カメラの最近距離
export const CAMERA_FAR = 1000; // カメラの最遠距離
export const CAMERA_POSITION = [0, 0, 20]; // カメラの初期位置

// === ウィンドウサイズ ===
export const WINDOW_WIDTH = window.innerWidth;
export const WINDOW_HEIGHT = window.innerHeight;
export const ASPECT_RATIO = WINDOW_WIDTH / WINDOW_HEIGHT; // アスペクト比（ウィンドウサイズから算出）

// === レンダラー設定 ===
export const ENABLE_ANTIALIAS = true; // アンチエイリアス（滑らかな描画）
export const BACKGROUND_COLOR = 0xffffff; // 背景色（黒）
export const ENABLE_TRANSPARENCY = false; // 透明背景の有効化
export const ENABLE_SHADOWS = true; // 影の有効化
export const CANVAS = document.getElementById("threeCanvas");

// === カメラコントロール設定 ===
export const ENABLE_DAMPING = true; // 慣性効果の有効化
export const DAMPING_FACTOR = 0.05; // 慣性の影響度
export const ENABLE_PAN = true; // パン操作（カメラの移動）を有効化
export const KEY_PAN_SPEED = 50.0; // キーボードによるパン移動の速度
export const SCREEN_SPACE_PANNING = false; // 画面空間でのパン操作を無効化
export const MIN_DISTANCE = 0.5; // カメラの最小ズーム距離
export const MAX_DISTANCE = 100; // カメラの最大ズーム距離
export const MAX_POLAR_ANGLE = Math.PI; // カメラの回転角度の上限（180度）

// === ライト設定 ===
export const LIGHT_COLOR = 0xffffff; // ライトの色
export const LIGHT_INTENSITY = 1; // 光の強さ
export const LIGHT_POSITION = [5, 5, 5]; // ライトの初期位置

// 🔥 角度をラジアンに変換するための定数
export const DEGREES_TO_RADIANS = Math.PI / 180; // 1° = π / 180 ラジアン

// === メッシュ設定用オプション ===
export const MESH_SETUP_OPTIONS = {
    scale: [0.5, 0.5, 0.5],       // 1.5倍のスケール
    position: [0, -2, 0],         // y=-2 の位置
    rotation: [DEGREES_TO_RADIANS*-90, 0, 0], // y軸で90度回転
    opacity: 0.8,                 // 半透明
    transparent: true,             // 透明化を有効化
    wireframe: false,              // ワイヤーフレーム表示をオフ
    color: 0xff0000,               // 赤色
    receiveShadow: true,           // 影を受け取る
    castShadow: true,              // 影を落とす
};
