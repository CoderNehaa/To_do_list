let tasks = [];
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('task_counter');
const tasksList = document.getElementById('list');

function addTaskToLi(task){
    const li = document.createElement('li');
    li.innerHTML = `
        <input type="checkbox" id="${task.id}" ${task.done ? 'checked' : ''} class="custom-checkbox">
        <label for = "${task.id}"> ${task}</label>
        <i class="fa-solid fa-trash-can" data-id="${task.id}"></i>
    `;
    tasksList.append(li);
}

function renderList(){
    // This function will show list on page.
    tasksList.innerHTML = ``;

    for(let i = 0; i < tasks.length; i++){
        addTaskToLi(tasks[i])
    }
    tasksCounter.innerHTML = tasks.length;
}

function markTaskAsComplete(taskId){
    const task = tasks.filter((task) => {return task.id === taskId});

    if(task.length > 0){
        const currentTask = task[0];
        currentTask.done = !currentTask.done;
        renderList();
        showNotification('Task toggled successfully');
    }
}

function deleteTask(taskId){
    const newTasks = tasks.filter((task) => {return task.id !== taskId});
    tasks = newTasks;
    renderList();
    showNotification('Task deleted successfully!');
}

function addTask(task){
    console.log("Hello I am addTask function and I will add ", task , "to task-list.");
    tasks.push(task);
    renderList();    
    showNotification('Task added successfully !');
    return;
}

function showNotification(text){
    alert(text);
}

function handleInputKeypress(e){
    if(e.key === 'Enter'){
        const text = e.target.value;

        if(!text){
            showNotification('Text can not be empty!');
            return;
        }
        console.log(text);
        addTask(text);
    }   
}

addTaskInput.addEventListener('keyup', handleInputKeypress);
