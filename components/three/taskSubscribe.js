import useTaskStore from '../../store/useTaskStore';

const taskSubscribe = (scene, plane, cube1, cube2, cube3) => {
    useTaskStore.subscribe((state) => {
        switch (state.currentTask) {
            case 1:
                !scene.children.includes(cube1) ? scene.add(cube1) : null;
                scene.children.includes(plane) ? scene.remove(plane) : null;
                scene.children.includes(cube2) ? scene.remove(cube2) : null;
                scene.children.includes(cube3) ? scene.remove(cube3) : null;
                break;
            case 2:
                !scene.children.includes(plane) ? scene.add(plane) : null;
                scene.children.includes(cube1) ? scene.remove(cube1) : null;
                scene.children.includes(cube2) ? scene.remove(cube2) : null;
                scene.children.includes(cube3) ? scene.remove(cube3) : null;
                break;
            case 3:
                !scene.children.includes(cube2) ? scene.add(cube2) : null;
                !scene.children.includes(cube3) ? scene.add(cube3) : null;
                scene.children.includes(plane) ? scene.remove(plane) : null;
                scene.children.includes(cube1) ? scene.remove(cube1) : null;
                break;
            default:
                scene.children.includes(plane) ? scene.remove(plane) : null;
                scene.children.includes(cube1) ? scene.remove(cube1) : null;
                scene.children.includes(cube2) ? scene.remove(cube2) : null;
                scene.children.includes(cube3) ? scene.remove(cube3) : null;
                break;
        }
    });
}

export default taskSubscribe;