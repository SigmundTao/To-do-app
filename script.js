const taskHolder = document.getElementById('task-holder');
const addTaskBtn = document.getElementById('add-task');
const taskModal = document.getElementById('task-modal');
const saveBtn = document.getElementById('save-btn');
const modalTitle = document.getElementById('modal-title');
const closeModalBtn = document.getElementById('close-modal-btn');
const taskInput = document.getElementById('task-name-input');
const taskExtraInfo = document.getElementById('task-description-input');
let currentEditingId = null;
let currentSelectedTaskId = null;

taskModal.close();

let tasks = [];
let completedTasks = [];


const taskCompleted = (taskId) => {
    if (currentSelectedTaskId === taskId) {
        currentSelectedTaskId = null;
    }

    const taskIndex = tasks.findIndex(t => t.id === taskId);
    const completedIndex = completedTasks.findIndex(t => t.id === taskId);

    if (taskIndex !== -1) {
        completedTasks.push(tasks.splice(taskIndex, 1)[0]);
    } else if (completedIndex !== -1) {
        tasks.push(completedTasks.splice(completedIndex, 1)[0]);
    }

    loadTasks();
};


const deleteTask = (taskId) => {
    tasks = tasks.filter(task => task.id !== taskId);
    completedTasks = completedTasks.filter(task => task.id !== taskId);
    if (currentSelectedTaskId === taskId) {
        currentSelectedTaskId = null;
    }
    loadTasks();
};


const editTask = (taskId) => {
    currentEditingId = taskId;
    const taskObj = tasks.find(task => task.id === taskId) || completedTasks.find(task => task.id === taskId);
    if (taskObj) {
        taskInput.value = taskObj.task;
        taskExtraInfo.value = taskObj.info;
        modalTitle.textContent = `Edit Task:`;
        taskModal.showModal();
    }
};

const closeModal = () => {
    loadTasks();
    taskModal.close();
};


const saveTask = () => {
    const task = taskInput.value.trim();
    const extraInfo = taskExtraInfo.value.trim();

    if (!task) return;

    if (currentEditingId) {
        const editingTask = tasks.find(task => task.id === currentEditingId) || completedTasks.find(task => task.id === currentEditingId);
        if (editingTask) {
            editingTask.task = task;
            editingTask.info = extraInfo;
        }
    } else {
        const newTaskObj = {
            task,
            info: extraInfo,
            id: String(Date.now() + Math.random().toString(16).slice(2)),
        };
        tasks.push(newTaskObj);
    }

    closeModal();
};


const loadTasks = () => {
    taskHolder.innerHTML = '';

    const renderTask = (task, isCompleted) => {
        const isSelected = currentSelectedTaskId === task.id;
        return `
            <div class="task${isSelected ? ' selected-task' : ''}" data-id="${task.id}">
                <div class="task-wrapper">
                    <p class="task-info${isCompleted ? ' completed' : ''}">${task.task}</p>
                    <input type="checkbox" class="task-checkbox" ${isCompleted ? 'checked' : ''}>
                </div>
                <div class="task-expand-wrapper ${isSelected ? 'unhidden' : ''}">
                    <p class="task-description">${task.info}</p>
                    <div class="button-wrapper">
                        <button class="edit-button">Edit</button>
                        <button class="delete-task-button">X</button>
                    </div>
                </div>
            </div>
        `;
    };

    tasks.forEach(task => taskHolder.innerHTML += renderTask(task, false));
    completedTasks.forEach(task => taskHolder.innerHTML += renderTask(task, true));
};


const addTask = () => {
    currentEditingId = null;
    modalTitle.textContent = 'Create new task:';
    taskInput.value = '';
    taskExtraInfo.value = '';
    taskModal.showModal();
};


taskHolder.addEventListener('change', e => {
    if (e.target.matches('.task-checkbox')) {
        const taskId = e.target.closest('.task').dataset.id;
        taskCompleted(taskId);
    }
});

taskHolder.addEventListener('click', e => {
    const taskElement = e.target.closest('.task');
    if (!taskElement) return;
    const taskId = taskElement.dataset.id;

    if (e.target.matches('.task-checkbox')) return;

    if (e.target.matches('.edit-button')) {
        editTask(taskId);
    } else if (e.target.matches('.delete-task-button')) {
        deleteTask(taskId);
    } else {
        if (currentSelectedTaskId === taskId) {
            currentSelectedTaskId = null; 
        } else {
            currentSelectedTaskId = taskId;
        }
        loadTasks();
    }
});

addTaskBtn.addEventListener('click', addTask);
closeModalBtn.addEventListener('click', closeModal);
saveBtn.addEventListener('click', saveTask);

loadTasks();