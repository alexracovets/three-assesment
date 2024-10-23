import useCreateHander from '../../store/useCreateHander';

const createHandler = () => {
    const create = document.getElementById('create');

    create.addEventListener('click', () => {
        useCreateHander.setState((prevState) => ({
            ...prevState,
            isChangeHandler: !prevState.isChangeHandler,
        }));
    });
}

export default createHandler;