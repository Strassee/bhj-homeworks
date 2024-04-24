const task = document.getElementById('task__input');
const taskList = document.getElementById('tasks__list');
const form = document.getElementById('tasks__form');

let countTask = localStorage.getItem('count'); 
countTask = countTask ? countTask : 0;
let tasks = {};

for (let i = 0; i < localStorage.length; i++) {
    let myKey = localStorage.key(i);
    if(myKey.slice(0, 4) === 'task') {
        tasks[myKey] = localStorage.getItem(myKey);
    }
}

for (let key in tasks) {
    restoreTasks(key, tasks[key]);
}

form.addEventListener('submit', (e) => {
    // e.preventDefault();
    if (task.value) {
        countTask++;
        tn = `task${countTask}`;
        localStorage.setItem(tn, task.value);
        localStorage.setItem('count', countTask);
        restoreTasks(tn, task.value);
    }
});

function restoreTasks(k, t) {
    const div = document.createElement('div');
    div.classList.add('task');
    div.innerHTML = `<div class="task__title">${t}</div><a href="#" class="task__remove">&times;</a>`;
    taskList.appendChild(div);
    const a = div.querySelector('.task__remove');
    a.addEventListener('click', (e) => {
        div.remove();
        localStorage.removeItem(k);
    });
    form.reset();
}