import { WebGLRenderer } from "three";

const createRenderer = () => {
    const renderer = new WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    return renderer;
}

export default createRenderer;