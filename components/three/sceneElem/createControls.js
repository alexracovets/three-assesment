import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const createControls = (camera, renderer) => {
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.target.set(0, 0, 0);
    return controls;
}

export default createControls;