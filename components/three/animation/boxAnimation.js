const boxAnimation = (scene, geometry) => {
    if (scene.children.includes(geometry)) {
        geometry.rotation.x += 0.01;
        geometry.rotation.y += 0.01;
    }
}

export default boxAnimation;