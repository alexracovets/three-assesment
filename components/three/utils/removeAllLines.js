import useLinesStore from "../../../store/useLinesStore";

const removeAllLines = (scene) => {
    const lines = useLinesStore.getState().lines;

    lines.forEach((item) => {
        scene.remove(item.line);
        scene.remove(item.label);
    });


}

export default removeAllLines;