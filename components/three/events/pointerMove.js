import useLinesStore from "../../../store/useLinesStore";

const pointerMove = (renderer, camera, raycaster, pickableObjects) => {
    const move = (event) => {
        event.preventDefault();

        // put mouse position into store
        useLinesStore.getState().setMousePosition({
            x: (event.clientX / renderer.domElement.clientWidth) * 2 - 1,
            y: -(event.clientY / renderer.domElement.clientHeight) * 2 + 1
        })

        if (useLinesStore.getState().isDrawing) {
            // getting drawing line from store
            const line = useLinesStore.getState().currentLine;

            // getting mouse position from store
            const { x: mouseX, y: mouseY } = useLinesStore.getState().mousePosition;

            // set mouse position to raycaster
            raycaster.setFromCamera({ x: mouseX, y: mouseY }, camera);

            // get normal posittin by raycaster
            const intersects = raycaster.intersectObjects(pickableObjects, false);
            if (intersects.length > 0) {
                const positions = line.geometry.attributes.position.array;
                positions[3] = intersects[0].point.x;
                positions[4] = intersects[0].point.y;
                positions[5] = intersects[0].point.z;

                //update draw line
                line.geometry.attributes.position.needsUpdate = true;
            }
        }
    }

    document.addEventListener('mousemove', move, false);
}

export default pointerMove;