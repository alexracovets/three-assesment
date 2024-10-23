import { BufferGeometry, Line, LineBasicMaterial } from "three";

const createLine = (points) => {
    const geometry = new BufferGeometry().setFromPoints(points);
    const material = new LineBasicMaterial({
        color: 0xffffff,
        transparent: false
    });
    
    const line = new Line(geometry, material);
    line.frustumCulled = false;

    return line
}

export default createLine