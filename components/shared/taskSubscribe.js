import useTaskStore from '../../store/useTaskStore';

const taskSubscribe = (scene, cube, plane) => {
    useTaskStore.subscribe((state) => {
        switch (state.currentTask) {
            case 1:
                !scene.children.includes(cube) ? scene.add(cube) : null;
                scene.children.includes(plane) ? scene.remove(plane) : null;
                break;
            case 2:
                !scene.children.includes(plane) ? scene.add(plane) : null;
                scene.children.includes(cube) ? scene.remove(cube) : null;
                break;
            case 3:
                scene.children.includes(plane) ? scene.remove(plane) : null;
                scene.children.includes(cube) ? scene.remove(cube) : null;
                break;
            default:
                scene.children.includes(plane) ? scene.remove(plane) : null;
                scene.children.includes(cube) ? scene.remove(cube) : null;
                break;
        }
    });
}

export default taskSubscribe;