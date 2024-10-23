import useLinesStore from "../../../store/useLinesStore";
import createLine from "../geometries/createLine";

const pointerClick = (renderer, camera, scene, raycaster, pickableObjects) => {
    const click = () => {
        if (useLinesStore.getState().isSelected) {

            const { x: mouseX, y: mouseY } = useLinesStore.getState().mousePosition;

            raycaster.setFromCamera({ x: mouseX, y: mouseY }, camera);
            const intersects = raycaster.intersectObjects(pickableObjects, false);

            if (intersects.length > 0) {
                if (!useLinesStore.getState().isDrawing) {
                    // Start drawing the line

                    // geting line points for start
                    const points = [];
                    points.push(intersects[0].point);
                    points.push(intersects[0].point.clone());

                    // create Line
                    const line = createLine(points);
                    scene.add(line);

                    // added Line to store
                    useLinesStore.getState().setCurrentLine(line);
                    // open draw state
                    useLinesStore.getState().setIsDrawing(true);
                    // added line ti lines list store
                    useLinesStore.getState().setLines(line);
                } else {

                    // Finish drawing the line

                    // get line from store
                    const line = useLinesStore.getState().currentLine;
                    
                    // geting line points for end
                    const positions = useLinesStore.getState().currentLine.geometry.attributes.position.array;
                    positions[3] = intersects[0].point.x;
                    positions[4] = intersects[0].point.y;
                    positions[5] = intersects[0].point.z;

                    // update position
                    line.geometry.attributes.position.needsUpdate = true;

                    // close draw state
                    useLinesStore.getState().setIsDrawing(false);

                }
            }
        }
    }

    renderer.domElement.addEventListener('pointerdown', click, false);
}

export default pointerClick;