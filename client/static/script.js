import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("threeCanvas"), antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// カメラの初期位置を遠くする
camera.position.set(0, 0, 20);

// OrbitControls の設定
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.enablePan = true;
controls.keyPanSpeed = 50.0;
controls.minDistance = 0.5;
controls.maxDistance = 100;
controls.maxPolarAngle = Math.PI;

// 光源の追加
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

// STLモデルを格納する変数
let mesh1, mesh2;

// モデルの拡張子を判別
const extension = modelPath.split('.').pop().toLowerCase();

let loader;
let onLoad;

switch (extension) {
    case "stl":
        loader = new STLLoader();
        onLoad = (geometry) => {
            const material = new THREE.MeshNormalMaterial({ wireframe: false });

            // 1つ目のSTLモデル
            mesh1 = new THREE.Mesh(geometry, material);
            mesh1.rotation.x = -Math.PI / 2;  // 90度回転
            mesh1.scale.set(0.5, 0.5, 0.5);
            mesh1.position.set(10, -5, 0);  // 初期位置: x = 10
            scene.add(mesh1);

            // 2つ目のSTLモデル
            mesh2 = new THREE.Mesh(geometry, material);
            mesh2.rotation.x = -Math.PI / 2;
            mesh2.scale.set(0.5, 0.5, 0.5);
            mesh2.position.set(-10, -5, 0);  // 初期位置: x = -10
            scene.add(mesh2);
        };
        break;

    default:
        console.error("Unsupported file format:", extension);
}

// ローダーが適切に設定されている場合のみロード処理を実行
if (loader) {
    loader.load(modelPath, onLoad, undefined, (error) => console.error(`${extension.toUpperCase()} Load Error:`, error));
}

// **アニメーション用の変数**
let moving = true;
let resetTimer = null;

// **アニメーションループ**
function animate() {
    requestAnimationFrame(animate);

    // 両方のモデルがロードされている場合のみアニメーション実行
    if (mesh1 && mesh2 && moving) {
        // モデルの移動速度
        const speed = 0.1;

        // `x = 0` に近づける
        if (mesh1.position.x > 0) mesh1.position.x -= speed;
        if (mesh2.position.x < 0) mesh2.position.x += speed;

        // 両方のモデルが `x = 0` に到達したら 2 秒停止
        if (mesh1.position.x <= 0 && mesh2.position.x >= 0 && resetTimer === null) {
            moving = false;  // 移動を停止
            resetTimer = setTimeout(() => {
                // 初期位置に戻す
                mesh1.position.x = 10;
                mesh2.position.x = -10;
                moving = true;
                resetTimer = null;
            }, 2000);  // 2秒後にリセット
        }
    }

    controls.update();
    renderer.render(scene, camera);
}
animate();

// ウィンドウリサイズ対応
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
