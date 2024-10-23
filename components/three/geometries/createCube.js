import { Mesh, BoxGeometry, MeshStandardMaterial } from "three";

const createCube = (position = [0, 0, 0], size = 3) => {
    const geometry = new BoxGeometry(size, size, size);
    const material = new MeshStandardMaterial({ color: '#4dc3a9' });
    const cube = new Mesh(geometry, material);
    cube.position.set(position[0], position[1], position[2]);

    return cube;
}

export default createCube;