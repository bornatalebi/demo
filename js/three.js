// /**
//  * This example will render a green transparent cube of 0.5m m^3, 1 meter below the
//  * origin of the XR session
//  * 
//  * Features:
//  * - Three.js basics (Scene, Camera, Geometry, Material, Light)
//  * - WebXR basics (immersive AR session with internal positioning)
//  * 
//  * @author Maxim Van de Wynckel
//  * @date 22/09/2020
//  */
// import * as THREE from 'three';
// import { ARButton } from 'three/examples/jsm/webxr/ARButton';

// var scene, camera, renderer, container;

// init();

// /**
//  * Initialize the scene
//  */
// function init() {
//     // Container that will be used to render our WebGL graphics
//     container = document.createElement('div');
//     document.body.appendChild(container);

//     // Create a new scene and camera
//     scene = new THREE.Scene();
//     // TIP: The camera position origin is always the position where you 'start the session'
//     camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20);

//     // Create a new Cube geometry (0.5m, 0.5m, 0.5m)
//     const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
//     // TASK 2: Make the cube transparant
//     // https://threejs.org/docs/#api/en/materials/MeshPhongMaterial
//     // The material we will use for a our cube (green with opacity)
//     const material = new THREE.MeshPhongMaterial({
//         color: 0x00ff00,
//     });
//     // Create the 3D Mesh using the geometry and material
//     const cube = new THREE.Mesh(geometry, material);
//     cube.position.set(0, -1, 0);
//     scene.add(cube);    // All objects have to be added to the scene
//     // TASK 1: Add ambient light to the AR scene
//     // Ambient light source at the ceiling (3m above)
//     // Create an ambient light
//     const ambientLight = new THREE.AmbientLight(0xffffff); // soft white light

// // Set the position of the ambient light (optional since ambient light is global and doesn't have direction)
// // But setting position can help in understanding scene layout
//     ambientLight.position.set(0, 3, 0);

// // Add the ambient light to the scene
//     scene.add(ambientLight);
//     // Create the WebGL renderer
//     renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//     renderer.setPixelRatio(window.devicePixelRatio);
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     // Make sure the renderer uses WebXR
//     renderer.xr.enabled = true;

//     // Add a button to start our AR session. All XR sessions have to be
//     // started manually by the user through user input (security reasons)
//     // Internally, this ARButton simplifies the process of requesting a new XR session
//     // using navigator.xr.requestSession(...);
//     document.body.appendChild(ARButton.createButton(renderer, {}));
//     container.appendChild(renderer.domElement);

//     // Use the animate(timestamp, frame) function as the animation loop
//     renderer.setAnimationLoop(animate);
// }

// /**
//  * Animation loop
//  *  In this loop we can:
//  *  - Update the position and actions of objects (based on time)
//  *  - Image tracking/detection in AR
//  *  - Render the graphics frame
//  *  If we can do these actions within X ms, our FPS = 1000 / X (e.g. 60FPS for 16ms)
//  *
//  * @param {number} timestamp Creation timestamp when the XRFrame was made
//  * @param {XRFrame} frame Frame to render
//  */
// function animate(timestamp, frame) {
//     if (!frame)
//         return;
    
//     // Render the scene through the lens of our camera
//     renderer.render(scene, camera);
// }
import * as THREE from 'three';
import { ARButton } from 'three/examples/jsm/webxr/ARButton';

var scene, camera, renderer, container;

init();

/**
 * Initialize the scene
 */
function init() {
    // Container that will be used to render our WebGL graphics
    container = document.createElement('div');
    document.body.appendChild(container);

    // Create a new scene and camera
    scene = new THREE.Scene();
    // TIP: The camera position origin is always the position where you 'start the session'
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20);

    // Create two new Cube geometries (0.5m, 0.5m, 0.5m)
    const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    // The material we will use for our cubes (green with transparency)
    const material = new THREE.MeshPhongMaterial({
        color: 0x00ff00,
        opacity: 0.5,
        transparent: true
    });

    // Create two 3D Meshes using the geometry and material
    const cube1 = new THREE.Mesh(geometry, material);
    const cube2 = new THREE.Mesh(geometry, material);
    // Position cubes 2 meters in front of the origin, on the floor
    cube1.position.set(-0.75, 1, -2); // 0.75 meters left and 2 meters forward
    cube2.position.set(0.75, 1, -2);  // 0.75 meters right and 2 meters forward

    scene.add(cube1);
    scene.add(cube2);    // All objects have to be added to the scene

    // Create an ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff); // soft white light

    // Set the position of the ambient light (optional since ambient light is global and doesn't have direction)
    // But setting position can help in understanding scene layout
    ambientLight.position.set(0, 3, 0);

    // Add the ambient light to the scene
    scene.add(ambientLight);

    // Create the WebGL renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    // Make sure the renderer uses WebXR
    renderer.xr.enabled = true;

    // Add a button to start our AR session. All XR sessions have to be
    // started manually by the user through user input (security reasons)
    // Internally, this ARButton simplifies the process of requesting a new XR session
    // using navigator.xr.requestSession(...);
    document.body.appendChild(ARButton.createButton(renderer, {}));
    container.appendChild(renderer.domElement);

    // Use the animate(timestamp, frame) function as the animation loop
    renderer.setAnimationLoop(animate);
}

/**
 * Animation loop
 *  In this loop we can:
 *  - Update the position and actions of objects (based on time)
 *  - Image tracking/detection in AR
 *  - Render the graphics frame
 *  If we can do these actions within X ms, our FPS = 1000 / X (e.g. 60FPS for 16ms)
 *
 * @param {number} timestamp Creation timestamp when the XRFrame was made
 * @param {XRFrame} frame Frame to render
 */
function animate(timestamp, frame) {
    if (!frame)
        return;
    
    // Render the scene through the lens of our camera
    renderer.render(scene, camera);
}
