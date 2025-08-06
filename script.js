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
let currentEditingId = null;

taskModal.close();

let tasks = [];

const deleteTask = (taskId) => {
    tasks = tasks.filter(task => task.id !== taskId);
    loadTasks();
    currentEditingId = null;
}

const editTask = (taskId) => {
    currentEditingId = taskId;
    const taskObj = tasks[tasks.findIndex(task => task.id === taskId)];
    taskInput.value = `${taskObj.task}`;
    taskExtraInfo.value = `${taskObj.info}`;
    modalTitle.textContent = `Edit Task:`
    taskModal.showModal()
}

const closeModal = () => {
    loadTasks();
    taskModal.close();
};

saveTask = () => {
        const task = taskInput.value;
        const extraInfo = taskExtraInfo.value;

        if(currentEditingId){
            const editingTask = tasks[tasks.findIndex(task => task.id === currentEditingId)];
            editingTask.info = extraInfo;
            editingTask.task = task;
        } else {
            const newTaskObj = {
                task: task,
                info: extraInfo,
                id: Date.now() + Math.random().toString(16).slice(2),
            };
            tasks.push(newTaskObj);
        };
        closeModal();
}

const loadTasks = () => {
    taskHolder.innerHTML = ``;
    tasks.forEach(task => {
        taskHolder.innerHTML += `
            <div class="task" data-id="${task.id}">
                <div class="task-wrapper">
                    <p class="task-info">${task.task}</p>
                    <input type="checkbox" class="task-checkbox">
                </div>
                <div class="task-expand-wrapper hidden">
                    <p class="task-description">${task.info}</p>
                    <div class="button-wrapper">
                        <button class="edit-button">Edit</button>
                        <button class="delete-task-button">X</button>
                    </div>
                </div>
            </div>
        `
    });
}

const addTask = () => {
    currentEditingId = null;
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
    if(click.target.matches('.task-checkbox')){
        return;
    } else if(click.target.matches('.edit-button')){
        const taskElement = click.target.closest('.task, .selected-task');
        editTask(taskElement.dataset.id);
    } else if(click.target.matches('.delete-task-button')){
        const taskElement = click.target.closest('.task, .selected-task');
        deleteTask(taskElement.dataset.id)
    }else {
        const taskElement = click.target.closest('.task, .selected-task');
        if(taskElement) {
            if(taskElement.classList.contains('task')){
                document.querySelectorAll('#task-holder .selected-task').forEach(task =>
                    {
                        task.classList.replace('selected-task', 'task');
                    });
                taskElement.classList.replace('task', 'selected-task');
            } else {
                taskElement.classList.replace('selected-task', 'task');
            }
        };

        document.querySelector('#task-holer .task').forEach(task => {
            if(task.classList.contains('selected-class')){
                return
            } else {
                task.classList.add('hidden');
            }
        })}
});
addTaskBtn.addEventListener('click', addTask);
closeModalBtn.addEventListener('click', closeModal);
saveBtn.addEventListener('click', saveTask);