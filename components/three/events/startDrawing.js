import useLinesStore from "../../../store/useLinesStore";

const startDrawing = (renderer, controls, scene) => {

    window.addEventListener('keydown', function (event) {
        if (event.key === 'Control') {
            useLinesStore.getState().setIsSelected(true);
            controls.enabled = false;
            renderer.domElement.style.cursor = 'crosshair';
        }
    });

    window.addEventListener('keyup', function (event) {
        if (event.key === 'Control') {
            useLinesStore.getState().setIsSelected(false);
            controls.enabled = true;
            renderer.domElement.style.cursor = 'auto';

            if (useLinesStore.getState().isDrawing) {
                const line = useLinesStore.getState().currentLine
                scene.remove(line);
                useLinesStore.getState().removeLines(line);
                useLinesStore.getState().setIsDrawing(false);
            }
        }
    });
}

export default startDrawing;