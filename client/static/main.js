import { importThree } from "./asyncImporters.js";
import { loadModel } from "./load/index.js";
import {
    CAMERA_FOV, CAMERA_NEAR, CAMERA_FAR, CAMERA_POSITION,
    WINDOW_WIDTH, WINDOW_HEIGHT, ASPECT_RATIO,
    ENABLE_ANTIALIAS, BACKGROUND_COLOR, ENABLE_TRANSPARENCY, ENABLE_SHADOWS, CANVAS,
    ENABLE_DAMPING, DAMPING_FACTOR, ENABLE_PAN, KEY_PAN_SPEED,
    SCREEN_SPACE_PANNING, MIN_DISTANCE, MAX_DISTANCE, MAX_POLAR_ANGLE,
    LIGHT_COLOR, LIGHT_INTENSITY, LIGHT_POSITION,
    DEGREES_TO_RADIANS,
    BASE_SETUP_OPTIONS, MESH_OPTIONS, POINT_OPTIONS1, POINT_OPTIONS2
} from "./config.js"; // 定数をインポート

/** メイン関数 */
async function main() {
    // THREE.js を非同期で取得
    const THREE = await importThree();

    // **Sceneモジュールを確実にインポート**
    const Scene = await import("./scene/index.js");

    // **Proxyを回避するために個別に取り出す**
    const { setupScene, createCamera, generateRenderer, setupControls, setupLights, setupObject } = Scene;

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
        let mesh1 = await loadModel(
            scene,
            modelPath,
            material
        );

        mesh1 = await setupObject(
            mesh1,
            BASE_SETUP_OPTIONS,
            POINT_OPTIONS1
        );

        let mesh2 = await loadModel(
            scene,
            modelPath,
            material
        );

        mesh2 = await setupObject(
            mesh2,
            BASE_SETUP_OPTIONS,
            POINT_OPTIONS2
        );

        let textElement = document.getElementById("matchRate");

        await startAnimation(
            scene,
            camera,
            renderer,
            controls,
            [mesh1, mesh2],
            textElement
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
async function startAnimation(scene, camera, renderer, controls, meshArray, textElement) {
    if (meshArray.length < 2) {
        console.error("meshArray には少なくとも 2 つのメッシュが必要です。");
        return;
    }

    let mesh1 = meshArray[0];
    let mesh2 = meshArray[1];

    const initialPos1 = 10;
    const initialPos2 = -10;
    mesh1.position.x = initialPos1;
    mesh2.position.x = initialPos2;

    const initialRot1 = [-90 * DEGREES_TO_RADIANS, 0, 0];
    const initialRot2 = [-90 * DEGREES_TO_RADIANS, -45 * DEGREES_TO_RADIANS, 0];
    mesh1.rotation.set(...initialRot1);
    mesh2.rotation.set(...initialRot2);

    let moving = true;
    let resetTimer = null;
    const duration = 5000; // 5秒で動かす
    const frameRate = 60;
    const totalFrames = (duration / 1000) * frameRate;
    let frameCount = 0;

    function renderLoop() {
        requestAnimationFrame(renderLoop);

        if (moving) {
            if (frameCount < totalFrames) {
                let progress = frameCount / totalFrames; // 進捗率 0～1
                mesh1.position.x = initialPos1 * (1 - progress);
                mesh2.position.x = initialPos2 * (1 - progress);
                mesh2.rotation.y = initialRot2[1] * (1 - progress);

                // 一致率を計算
                let matchRate = Math.floor(progress * 100);
                textElement.innerText = `一致率: ${matchRate}%`;

                frameCount++;
            } else {
                mesh1.position.x = 0;
                mesh2.position.x = 0;
                mesh2.rotation.y = 0;

                // 100% にする
                textElement.innerText = `一致率: 100%`;

                // 2秒後に初期位置に戻す
                if (!resetTimer) {
                    moving = false;
                    resetTimer = setTimeout(() => {
                        mesh1.position.x = initialPos1;
                        mesh2.position.x = initialPos2;
                        mesh2.rotation.y = initialRot2[1];
                        moving = true;
                        frameCount = 0;
                        resetTimer = null;
                        textElement.innerText = `一致率: 0%`; // リセット
                    }, 2000);
                }
            }
        }

        controls.update();
        renderer.render(scene, camera);
    }

    renderLoop();
}

// **メイン関数を実行**
main();
