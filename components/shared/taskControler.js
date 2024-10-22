import useTaskStore from '../../store/useTaskStore';

const taskCheck = (taskListItems) => {
    const { currentTask } = useTaskStore.getState();

    taskListItems.forEach((item) => {
        const task = item.getAttribute('data-task');
        Number(task) === currentTask ? item.classList.add('active') : item.classList.remove('active');
    });
}

const taskCliker = (taskListItems) => {
    taskListItems.forEach((item) => {
        item.addEventListener('click', () => {
            const task = Number(item.getAttribute('data-task'));
            useTaskStore.getState().setCurrentTask(task);
            taskCheck(taskListItems);
        });
    });
}

const taskControler = () => {
    const taskListItems = document.querySelectorAll('#task-list li');

    taskCheck(taskListItems);
    taskCliker(taskListItems);
}

export default taskControler;