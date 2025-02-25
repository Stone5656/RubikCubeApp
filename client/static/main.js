import { importThree } from "./asyncImporters.js";
import { loadModel } from "./load/index.js";
import {
    CAMERA_FOV, CAMERA_NEAR, CAMERA_FAR, CAMERA_POSITION,
    WINDOW_WIDTH, WINDOW_HEIGHT, ASPECT_RATIO,
    ENABLE_ANTIALIAS, BACKGROUND_COLOR, ENABLE_TRANSPARENCY, ENABLE_SHADOWS, CANVAS,
    ENABLE_DAMPING, DAMPING_FACTOR, ENABLE_PAN, KEY_PAN_SPEED,
    SCREEN_SPACE_PANNING, MIN_DISTANCE, MAX_DISTANCE, MAX_POLAR_ANGLE,
    LIGHT_COLOR, LIGHT_INTENSITY, LIGHT_POSITION,
    MESH_SETUP_OPTIONS
} from "./config.js"; // 定数をインポート

/** メイン関数 */
async function main() {
    // THREE.js を非同期で取得
    const THREE = await importThree();

    // **Sceneモジュールを確実にインポート**
    const Scene = await import("./scene/index.js");

    // **Proxyを回避するために個別に取り出す**
    const { setupScene, createCamera, generateRenderer, setupControls, setupLights, setupMesh } = Scene;

    // === シーンの初期化 ===

    // **シーンの作成**
    const scene = await setupScene(); // 🔥 `setupScene()` を確実に実行

    // **カメラの作成**
    const camera = await createCamera(CAMERA_FOV, ASPECT_RATIO, CAMERA_NEAR, CAMERA_FAR, CAMERA_POSITION);

    // **レンダラーの作成**
    const renderer = await generateRenderer(
        CANVAS, 
        WINDOW_WIDTH,
        WINDOW_HEIGHT,
        ENABLE_ANTIALIAS,
        BACKGROUND_COLOR,
        ENABLE_TRANSPARENCY,
        ENABLE_SHADOWS
    );

    // **カメラコントロールの設定**
    const controls = await setupControls(
        camera,
        renderer,
        ENABLE_DAMPING,
        DAMPING_FACTOR,
        ENABLE_PAN,
        KEY_PAN_SPEED,
        SCREEN_SPACE_PANNING,
        MIN_DISTANCE,
        MAX_DISTANCE,
        MAX_POLAR_ANGLE
    );

    // **ライトの設定**
    await setupLights(
        scene,
        LIGHT_COLOR,
        LIGHT_INTENSITY,
        LIGHT_POSITION
    );

    // === モデルのロードとアニメーション開始 ===
    const modelPath = window.modelPath;
    const material = new THREE.MeshNormalMaterial({ wireframe: false });

    try {
        let mesh = await loadModel(
            scene,
            modelPath,
            material
        );

        mesh = await setupMesh(mesh, MESH_SETUP_OPTIONS);

        startAnimation(
            scene,
            camera,
            renderer,
            controls,
            [mesh]
        );
    } catch (error) {
        console.error(error);
    }

    // === ウィンドウサイズ変更対応 ===
    window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// === アニメーションループ ===
async function startAnimation(scene, camera, renderer, controls, meshArray) {
    let moving = true;
    let resetTimer = null;

    function renderLoop() {
        requestAnimationFrame(renderLoop);

        meshArray[0]

        controls.update();
        renderer.render(scene, camera);
    }

    renderLoop();
}

// **メイン関数を実行**
main();
