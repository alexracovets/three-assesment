import { Raycaster } from 'three';

import planeAnimation from '../three/animation/planeAnimation';
import createControls from '../three/sceneElem/createControls';
import createRenderer from '../three/sceneElem/createRenderer';
import createCamera from '../three/sceneElem/createCamera';
import createLigths from '../three/sceneElem/createLigths';
import boxAnimation from '../three/animation/boxAnimation';
import createPlane from '../three/geometries/createPlane';
import createScene from '../three/sceneElem/createScene';
import createCube from '../three/geometries/createCube';
import pointerClick from '../three/events/pointerClick';
import startDrawing from '../three/events/startDrawing';
import pointerMove from '../three/events/pointerMove';
import addOnScene from '../three/utils/addOnScene';
import taskSubscribe from '../three/taskSubscribe';

import useTaskStore from '../../store/useTaskStore';

const experience = () => {

    // Create Scene
    const scene = createScene();
    const camera = createCamera();
    const renderer = createRenderer();
    const controls = createControls(camera, renderer);
    const { ambientLight, directionLight } = createLigths();

    // Create elems
    const cube = createCube();
    const plane = createPlane();
    const cube2 = createCube([2, 0, 0], 2);
    const cube3 = createCube([-2, 0, 0], 2);

    // z-fight fix
    const cube2Fake = createCube([2, 0, 0], 2);
    const cube3Fake = createCube([-2, 0, 0], 2);
    cube2Fake.scale.set(1.001, 1.001, 1.001);
    cube3Fake.scale.set(1.001, 1.001, 1.001);
    cube2Fake.visible = false;
    cube3Fake.visible = false;

    // Raycaster for detecting clicks
    const raycaster = new Raycaster();
    const pickableObjects = [cube2Fake, cube3Fake];

    // Added on scene 
    addOnScene(scene, ambientLight, directionLight);

    switch (useTaskStore.getState().currentTask) {
        case 1:
            // added elem for task 1
            addOnScene(scene, cube);
            break;
        case 2:
            // added elem for task 2 
            addOnScene(scene, plane);
            break;
        case 3:
            // added elem for task 3
            addOnScene(scene, cube2, cube3, cube2Fake, cube3Fake);

            // added drawing events
            startDrawing(renderer, controls, scene);
            pointerClick(renderer, camera, scene, raycaster, pickableObjects);
            pointerMove(renderer, camera, raycaster, pickableObjects);
            break;

        default:
            break;
    }

    // Animation
    function animate() {
        requestAnimationFrame(animate);
        controls.update();

        boxAnimation(scene, cube);
        planeAnimation(scene, plane);
        renderer.render(scene, camera);
    }

    taskSubscribe(scene, plane, cube, cube2, cube3);
    animate();

    document.body.appendChild(renderer.domElement);
}

export default experience;
