import { importThree } from "../asyncImporters.js";

/**
 * レンダラーを生成し、WebGLコンテキストを準備する。
 * @param {HTMLCanvasElement | null} canvas - 使用する `<canvas>` 要素（null の場合は自動作成）
 * @param {number} width - レンダラーの幅（通常 `window.innerWidth`）
 * @param {number} height - レンダラーの高さ（通常 `window.innerHeight`）
 * @param {boolean} antialias - アンチエイリアスの有効化（デフォルト: true）
 * @param {number | string} backgroundColor - 背景色（デフォルト: `0x000000`（黒））
 * @param {boolean} transparent - 背景の透明度（デフォルト: false）
 * @param {boolean} enableShadows - 影の有効化（デフォルト: false）
 * @returns {THREE.WebGLRenderer} WebGLレンダラーオブジェクト
 */
export async function generateRenderer(
    canvas = null,
    width = window.innerWidth,
    height = window.innerHeight,
    antialias = true,
    backgroundColor = 0x000000,
    transparent = false,
    enableShadows = false
) {
    const THREE= await importThree();
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas || document.createElement("canvas"),
        antialias: antialias,
        alpha: transparent,
    });

    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(backgroundColor);
    renderer.shadowMap.enabled = enableShadows;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    if (!canvas) {
        document.body.appendChild(renderer.domElement);
    }

    return renderer;
}
