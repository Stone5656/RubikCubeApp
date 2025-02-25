/**
 * THREE.js を非同期でロード
 * @returns {Promise<typeof import("three")>}
 */
export async function importThree() {
    return await import("three");
}

/**
 * OrbitControls を非同期でロード
 * @returns {Promise<{ OrbitControls: typeof import("three/examples/jsm/controls/OrbitControls.js").OrbitControls }>}
 */
export async function importOrbitControls() {
    return await import("three/examples/jsm/controls/OrbitControls.js");
}

/**
 * STLLoader を非同期でロード
 * @returns {Promise<{ STLLoader: typeof import("three/examples/jsm/loaders/STLLoader.js").STLLoader }>}
 */
export async function importSTLLoader() {
    return await import("three/examples/jsm/loaders/STLLoader.js");
}

/**
 * OBJLoader を非同期でロード
 * @returns {Promise<{ OBJLoader: typeof import("three/examples/jsm/loaders/OBJLoader.js").OBJLoader }>}
 */
export async function importOBJLoader() {
    return await import("three/examples/jsm/loaders/OBJLoader.js");
}

/**
 * PLYLoader を非同期でロード
 * @returns {Promise<{ PLYLoader: typeof import("three/examples/jsm/loaders/PLYLoader.js").PLYLoader }>}
 */
export async function importPLYLoader() {
    return await import("three/examples/jsm/loaders/PLYLoader.js");
}
