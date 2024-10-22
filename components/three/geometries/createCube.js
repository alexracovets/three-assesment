import { Mesh, BoxGeometry, MeshStandardMaterial } from "three";

const createCube = () => {
    const geometry = new BoxGeometry(3,3,3);
    const material = new MeshStandardMaterial({ color: '#4dc3a9' });
    const cube = new Mesh(geometry, material);

    return cube;
}


export default createCube;