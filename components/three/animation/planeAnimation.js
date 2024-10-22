const planeAnimation = (scene, geometry) => {
    if (scene.children.includes(geometry)) {
        geometry.material.uniforms.uTime.value += 0.05;
    }
}

export default planeAnimation;