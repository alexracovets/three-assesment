import useLinesStore from "../../store/useLinesStore";
import useTaskStore from '../../store/useTaskStore';
import removeAllLines from './utils/removeAllLines';
import addAllLines from './utils/addAllLines';

const taskSubscribe = (scene, plane, cube1, cube2, cube3) => {
    useTaskStore.subscribe((state) => {
        switch (state.currentTask) {
            case 1:
                console.log('1')
                !scene.children.includes(cube1) ? scene.add(cube1) : null;
                removeAllLines(scene);
                scene.children.includes(plane) ? scene.remove(plane) : null;
                scene.children.includes(cube2) ? scene.remove(cube2) : null;
                scene.children.includes(cube3) ? scene.remove(cube3) : null;
                break;
            case 2:
                !scene.children.includes(plane) ? scene.add(plane) : null;
                removeAllLines(scene);
                scene.children.includes(cube1) ? scene.remove(cube1) : null;
                scene.children.includes(cube2) ? scene.remove(cube2) : null;
                scene.children.includes(cube3) ? scene.remove(cube3) : null;
                break;
            case 3:
                !scene.children.includes(cube2) ? scene.add(cube2) : null;
                !scene.children.includes(cube3) ? scene.add(cube3) : null;
                addAllLines(scene);
                scene.children.includes(plane) ? scene.remove(plane) : null;
                scene.children.includes(cube1) ? scene.remove(cube1) : null;
                break;
            default:
                removeAllLines(scene);
                scene.children.includes(plane) ? scene.remove(plane) : null;
                scene.children.includes(cube1) ? scene.remove(cube1) : null;
                scene.children.includes(cube2) ? scene.remove(cube2) : null;
                scene.children.includes(cube3) ? scene.remove(cube3) : null;
                break;
        }
    });
    useLinesStore.subscribe((state) => {
        // del lines on scene if we del its on sideBar 
        const deletElement = state.toDelet;
        if (deletElement) {
            useLinesStore.setState((prevState) => ({
                ...prevState,
                lines: prevState.lines.filter((item) => item.line.uuid !== deletElement.line.uuid),
                toDelet: null,
            }));

            scene.remove(deletElement.line, deletElement.label);
        }
    });

}

export default taskSubscribe;