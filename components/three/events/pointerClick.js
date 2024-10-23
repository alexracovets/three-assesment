import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';
import { Vector3 } from "three";

import useLinesStore from "../../../store/useLinesStore";
import useMouseStore from "../../../store/useMouseStore";

import createLine from "../geometries/createLine";

const pointerClick = (renderer, camera, scene, raycaster, pickableObjects) => {
    const click = () => {
        if (useLinesStore.getState().isSelected) {

            const { x: mouseX, y: mouseY } = useMouseStore.getState().mousePosition;

            raycaster.setFromCamera({ x: mouseX, y: mouseY }, camera);
            const intersects = raycaster.intersectObjects(pickableObjects, false);

            if (intersects.length > 0) {
                if (!useLinesStore.getState().isDrawing) {
                    // Start drawing the line

                    // geting line points for start
                    const points = [];
                    points.push(intersects[0].point);
                    points.push(intersects[0].point.clone());

                    // create line
                    const line = createLine(points);
                    scene.add(line);

                    // create label
                    const labelDiv = document.createElement('div');
                    labelDiv.className = 'label';
                    labelDiv.innerText = '0.0m';
                    const labelObj = new CSS2DObject(labelDiv);
                    labelObj.position.copy(intersects[0].point);
                    scene.add(labelObj);

                    // added line and label to store
                    useLinesStore.getState().setCurrentLine({ line, label: labelObj });

                    // open draw state
                    useLinesStore.getState().setIsDrawing(true);
                } else {

                    // Finish drawing the line

                    // get line from store
                    const { line, label } = useLinesStore.getState().currentLine;

                    // geting line points for end
                    const positions = line.geometry.attributes.position.array;
                    positions[3] = intersects[0].point.x;
                    positions[4] = intersects[0].point.y;
                    positions[5] = intersects[0].point.z;
                    line.geometry.attributes.position.needsUpdate = true;

                    // update label value
                    const start = new Vector3(positions[0], positions[1], positions[2]);
                    const end = new Vector3(positions[3], positions[4], positions[5]);
                    const distance = start.distanceTo(end);
                    // put text value
                    label.element.innerText = `${distance.toFixed(2)}m`;
                    // centered text
                    label.position.lerpVectors(start, end, 0.5);

                    // close draw state
                    useLinesStore.getState().setIsDrawing(false);

                    // added line to lines list store 
                    useLinesStore.getState().setLines({ line, label });
                }
            }
        }
    }

    renderer.domElement.addEventListener('pointerdown', click, false);
}

export default pointerClick;