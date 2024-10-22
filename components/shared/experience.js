import createControls from '../three/sceneElem/createControls';
import createRenderer from '../three/sceneElem/createRenderer';
import createLigths from '../three/sceneElem/createLigths';
import createCamera from '../three/sceneElem/createCamera';
import createScene from '../three/sceneElem/createScene';

import createPlane from '../three/geometries/createPlane';
import createCube from '../three/geometries/createCube';

import boxAnimation from '../three/animation/boxAnimation';
import planeAnimation from '../three/animation/planeAnimation';

import addOnScene from '../three/utils/addOnScene';
import taskSubscribe from './taskSubscribe';

import useTaskStore from '../../store/useTaskStore';


const experience = () => {

    // Create Scene
    const scene = createScene();
    const camera = createCamera();
    const renderer = createRenderer();
    const controls = createControls(camera, renderer);
    
    // Light 
    const { ambientLight, directionLight } = createLigths()

    // Create elems
    const cube = createCube();
    const plane = createPlane();

    // Added on scene 
    addOnScene(scene, ambientLight, directionLight);
    if (useTaskStore.getState().currentTask === 1) {
        addOnScene(scene, cube);
    } else if (useTaskStore.getState().currentTask === 2) {
        addOnScene(scene, plane);
    }
    
    // Animation
    function animate() {
        requestAnimationFrame(animate);
        controls.update();

        boxAnimation(scene, cube);
        planeAnimation(scene, plane);

        renderer.render(scene, camera);
    }

    taskSubscribe(scene, cube, plane)

    animate();
    document.body.appendChild(renderer.domElement);
}

export default experience