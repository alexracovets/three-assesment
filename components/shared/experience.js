import { Raycaster } from 'three';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';

import planeAnimation from '../three/animation/planeAnimation';
import createControls from '../three/sceneElem/createControls';
import createRenderer from '../three/sceneElem/createRenderer';
import createCamera from '../three/sceneElem/createCamera';
import createLigths from '../three/sceneElem/createLigths';
import boxAnimation from '../three/animation/boxAnimation';
import createPlane from '../three/geometries/createPlane';
import createScene from '../three/sceneElem/createScene';
import pointerClick from '../three/events/pointerClick';
import startDrawing from '../three/events/startDrawing';
import createCube from '../three/geometries/createCube';
import pointerMove from '../three/events/pointerMove';
import taskSubscribe from '../three/taskSubscribe';

import useTaskStore from '../../store/useTaskStore';
import resize from '../three/events/resize';

const experience = () => {

    // Create Scene
    const scene = createScene();
    const camera = createCamera();
    const renderer = createRenderer();
    const controls = createControls(camera, renderer);
    const { ambientLight, directionLight } = createLigths();

    const labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0px';
    labelRenderer.domElement.style.pointerEvents = 'none';

    // Create elems
    const cube1 = createCube();
    const plane = createPlane();
    const cube2 = createCube([2, 0, 0], 2);
    const cube3 = createCube([-2, 0, 0], 2);

    // z-fight fix
    const cube2Fake = createCube([2, 0, 0], 2);
    const cube3Fake = createCube([-2, 0, 0], 2);
    cube2Fake.scale.set(1.0005, 1.0005, 1.0005);
    cube3Fake.scale.set(1.0005, 1.0005, 1.0005);
    cube2Fake.visible = false;
    cube3Fake.visible = false;

    // Raycaster for detecting clicks
    const raycaster = new Raycaster();
    const pickableObjects = [cube2Fake, cube3Fake];

    // Added on scene 
    scene.add(ambientLight, directionLight);

    switch (useTaskStore.getState().currentTask) {
        case 1:
            // added elem for task 1
            scene.add(cube1);
            break;
        case 2:
            // added elem for task 2 
            scene.add(plane);
            break;
        case 3:
            // added elem for task 3
            scene.add(cube2, cube3, cube2Fake, cube3Fake);
            break;

        default:
            break;
    }

    // added events
    resize(camera, renderer, labelRenderer);
    startDrawing(renderer, controls, scene);
    pointerClick(renderer, camera, scene, raycaster, pickableObjects);
    pointerMove(renderer, camera, raycaster, pickableObjects);
    taskSubscribe(scene, controls, renderer, plane, cube1, cube2, cube3, cube2Fake, cube3Fake);
    // Animation
    function animate() {
        requestAnimationFrame(animate);
        controls.update();

        boxAnimation(scene, cube1);
        planeAnimation(scene, plane);
        renderer.render(scene, camera);
        labelRenderer.render(scene, camera);
    }

    animate();

    document.body.appendChild(renderer.domElement);
    document.body.appendChild(labelRenderer.domElement);
}

export default experience;
