import { AmbientLight, DirectionalLight, PerspectiveCamera } from "three";

const createLigths = (scene) => {
    const ambientLight = new AmbientLight(0x808080)
    const directionLight = new DirectionalLight(0xffffff, 0.5)
    return { ambientLight, directionLight };
}

export default createLigths;