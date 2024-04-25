const task = document.getElementById('task__input');
const taskList = document.getElementById('tasks__list');
const form = document.getElementById('tasks__form');

let tasks;

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    for (let task in tasks) {
        restoreTasks(tasks[task]);
    }
} else {
    tasks = [];
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (task.value) {
        tasks.push(task.value);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        restoreTasks(task.value);
    }
});

function restoreTasks(task) {
    const div = document.createElement('div');
    div.classList.add('task');
    div.innerHTML = `<div class="task__title">${task}</div><a href="#" class="task__remove">&times;</a>`;
    taskList.appendChild(div);
    const a = div.querySelector('.task__remove');
    a.addEventListener('click', (e) => {
        div.remove();
        tasks.splice(tasks.indexOf(task), 1);
        tasks.length != 0 ? localStorage.setItem('tasks', JSON.stringify(tasks)) : localStorage.removeItem('tasks');
    });
    form.reset();
}