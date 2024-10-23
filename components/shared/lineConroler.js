import useLinesStore from '../../store/useLinesStore';

const renderLinesToHTML = (lines) => {
    const linesContainer = document.getElementById('lines');

    // clear ul list
    linesContainer.innerHTML = '';

    // new li
    let index = 1;
    lines.forEach((list) => {

        // create new li
        const li = document.createElement('li');
        li.setAttribute('uuid', list.line.uuid);
        const p = document.createElement('p');
        p.textContent = `Line: ${index}`;
        const button = document.createElement('button');
        button.textContent = 'X';
        button.addEventListener('click', () => {
            useLinesStore.getState().setToDelet(list);  // Викликаємо функцію видалення лінії
        });

        index++;
        li.appendChild(p);
        li.appendChild(button);

        // add new li
        linesContainer.appendChild(li);
    });
}

const lineControler = () => {
    useLinesStore.subscribe((state) => {
        renderLinesToHTML(state.lines);
    });
}

export default lineControler;
