import { PerspectiveCamera } from "three";

const createCamera = () => {
    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    camera.position.y = 3;
    return camera;
}

export default createCamera;