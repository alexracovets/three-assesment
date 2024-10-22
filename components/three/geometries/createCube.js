import { Mesh, BoxGeometry, MeshStandardMaterial } from "three";

const createCube = () => {
    const geometry = new BoxGeometry(2,2,2);
    const material = new MeshStandardMaterial({ color: '#4dc3a9' });
    const cube = new Mesh(geometry, material);

    return cube;
}


export default createCube;