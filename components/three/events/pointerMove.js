import { Vector3 } from "three";
import useLinesStore from "../../../store/useLinesStore";
import useMouseStore from "../../../store/useMouseStore";

const pointerMove = (renderer, camera, raycaster, pickableObjects) => {
    const move = (event) => {
        event.preventDefault();

        // put mouse position into store
        useMouseStore.getState().setMousePosition({
            x: (event.clientX / renderer.domElement.clientWidth) * 2 - 1,
            y: -(event.clientY / renderer.domElement.clientHeight) * 2 + 1
        })

        if (useLinesStore.getState().isDrawing) {
            // getting drawing line from store
            const { line, label } = useLinesStore.getState().currentLine;

            // getting mouse position from store
            const { x: mouseX, y: mouseY } = useMouseStore.getState().mousePosition;

            // set mouse position to raycaster
            raycaster.setFromCamera({ x: mouseX, y: mouseY }, camera);

            // get normal posittin by raycaster
            const intersects = raycaster.intersectObjects(pickableObjects, false);

            if (intersects.length > 0) {
                //udate last move position
                const positions = line.geometry.attributes.position.array;
                positions[3] = intersects[0].point.x;
                positions[4] = intersects[0].point.y;
                positions[5] = intersects[0].point.z;

                // update label value
                const start = new Vector3(positions[0], positions[1], positions[2]);
                const end = new Vector3(positions[3], positions[4], positions[5]);
                const distance = start.distanceTo(end);
                label.element.innerText = `${distance.toFixed(2)}m`;
                // centered text
                label.position.lerpVectors(start, end, 0.5);

                //update draw line
                line.geometry.attributes.position.needsUpdate = true;
            }
        }
    }

    document.addEventListener('mousemove', move, false);
}

export default pointerMove;