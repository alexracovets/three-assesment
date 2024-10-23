import useLinesStore from "../../../store/useLinesStore";

const addAllLines = (scene) => {
    const lines = useLinesStore.getState().lines;
    
    lines.forEach((item) => {
        !scene.children.includes(item.line) ? scene.add(item.line) : null;
        !scene.children.includes(item.label) ? scene.add(item.label) : null;
    });
}

export default addAllLines;