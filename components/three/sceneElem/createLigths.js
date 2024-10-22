import { AmbientLight, DirectionalLight } from "three";

const createLigths = () => {
    const ambientLight = new AmbientLight(0xffffff);
    const directionLight = new DirectionalLight(0xffffff, 2);
    
    return { ambientLight, directionLight };
}

export default createLigths;