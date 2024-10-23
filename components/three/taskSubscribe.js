import useLinesStore from "../../store/useLinesStore";
import useTaskStore from '../../store/useTaskStore';
import useCreateHander from '../../store/useCreateHander';

import removeAllLines from './utils/removeAllLines';
import addAllLines from './utils/addAllLines';

const taskSubscribe = (scene, controls, renderer, plane, cube1, cube2, cube3, cube2Fake, cube3Fake) => {
    const aside = document.getElementById('aside');
    const message = document.getElementById('message');
    useTaskStore.subscribe((state) => {
        switch (state.currentTask) {
            case 1:
                !scene.children.includes(cube1) ? scene.add(cube1) : null;
                removeAllLines(scene);
                scene.children.includes(plane) ? scene.remove(plane) : null;
                scene.children.includes(cube2) ? scene.remove(cube2) : null;
                scene.children.includes(cube3) ? scene.remove(cube3) : null;
                scene.children.includes(cube2Fake) ? scene.remove(cube2Fake) : null;
                scene.children.includes(cube3Fake) ? scene.remove(cube3Fake) : null;
                aside.classList.remove('active');
                message.classList.remove('active');
                break;
            case 2:
                !scene.children.includes(plane) ? scene.add(plane) : null;
                removeAllLines(scene);
                scene.children.includes(cube1) ? scene.remove(cube1) : null;
                scene.children.includes(cube2) ? scene.remove(cube2) : null;
                scene.children.includes(cube3) ? scene.remove(cube3) : null;
                scene.children.includes(cube2Fake) ? scene.remove(cube2Fake) : null;
                scene.children.includes(cube3Fake) ? scene.remove(cube3Fake) : null;
                aside.classList.remove('active');
                message.classList.remove('active');
                break;
            case 3:
                !scene.children.includes(cube2) ? scene.add(cube2) : null;
                !scene.children.includes(cube3) ? scene.add(cube3) : null;
                !scene.children.includes(cube2Fake) ? scene.add(cube2Fake) : null;
                !scene.children.includes(cube3Fake) ? scene.add(cube3Fake) : null;
                addAllLines(scene);
                scene.children.includes(plane) ? scene.remove(plane) : null;
                scene.children.includes(cube1) ? scene.remove(cube1) : null;
                aside.classList.add('active');
                message.classList.add('active');
                break;
            default:
                removeAllLines(scene);
                scene.children.includes(plane) ? scene.remove(plane) : null;
                scene.children.includes(cube1) ? scene.remove(cube1) : null;
                scene.children.includes(cube2) ? scene.remove(cube2) : null;
                scene.children.includes(cube3) ? scene.remove(cube3) : null;
                scene.children.includes(cube2Fake) ? scene.remove(cube2Fake) : null;
                scene.children.includes(cube3Fake) ? scene.remove(cube3Fake) : null;
                aside.classList.remove('active');
                message.classList.remove('active');
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
    useCreateHander.subscribe((state) => {
        // check is create button active
        const create = document.getElementById('create');
        const isChangeActive = state.isChangeHandler;

        if (isChangeActive) {
            useLinesStore.getState().setIsSelected(true);
            controls.enabled = false;
            renderer.domElement.style.cursor = 'crosshair';
            create.classList.add('active')
        } else {
            useLinesStore.getState().setIsSelected(false);
            controls.enabled = true;
            renderer.domElement.style.cursor = 'auto';
            create.classList.remove('active')

            if (useLinesStore.getState().isDrawing) {
                const { line, label } = useLinesStore.getState().currentLine
                scene.remove(line);
                scene.remove(label);
                useLinesStore.getState().removeLines(line);
                useLinesStore.getState().setIsDrawing(false);
            }
        }
    });
}

export default taskSubscribe;