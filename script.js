const taskHolder = document.getElementById('task-holder');
const addTaskBtn = document.getElementById('add-task');
const taskModal = document.getElementById('task-modal');
const saveBtn = document.getElementById('save-btn');
const modalTitle = document.getElementById('modal-title');
const closeModalBtn = document.getElementById('close-modal-btn');
const taskInput = document.getElementById('task-name-input');
const taskExtraInfo = document.getElementById('task-description-input');
const modalInputLabel = document.getElementById('modal-input-label');
const modalInfoLabel = document.getElementById('modal-info-label');

taskModal.close();

let tasks = [];

const editTask = (task) => {
    modalInputLabel.textContent = 'Edit Task:';
    taskInput.value = task.task;
    modalInfoLabel.textContent = 'Edit Extra Info:';
    taskExtraInfo.value = task.info;
    taskModal.showModal();
}

const closeModal = () => {
    loadTasks();
    taskModal.close();
};

saveTask = () => {
    const task = taskInput.value;
    const extraInfo = taskExtraInfo.value;

    const newTaskObj = {
        task: task,
        info: extraInfo,
    }

    tasks.push(newTaskObj);
    closeModal();
}

const loadTasks = () => {
    taskHolder.innerHTML = ``;
    tasks.forEach(task => {
        taskHolder.innerHTML += `
            <div class="task">
                <p class="task-info">${task.task}</p>
                <input type="checkbox" class="task-checkbox">
            </div>
        `
    });
}

const addTask = () => {
    modalTitle.textContent = 'Create new task:';
    taskInput.value = '';
    taskExtraInfo.value = '';
    taskModal.showModal();
};

taskHolder.addEventListener('change', change => {
    if(change.target.matches('.task-checkbox')) {
        const taskText = change.target.previousElementSibling;
        taskText.classList.toggle('completed', change.target.checked)
    };
});

taskHolder.addEventListener('click', click => {
    const taskElement = click.target.closest('.task');
    if(taskElement) {
        editTask(taskElement);
    }
});
addTaskBtn.addEventListener('click', addTask);
closeModalBtn.addEventListener('click', closeModal);
saveBtn.addEventListener('click', saveTask);