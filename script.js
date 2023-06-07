let tasks = [];
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('task_counter');
const tasksList = document.getElementById('list');


function addTaskToLi(task){
    const li = document.createElement('li');
    li.innerHTML = `
        <input type="checkbox" id="${task.id}" ${task.done ? 'checked' : ''} class="custom-checkbox">
        <label for = "${task.id}"> ${task.text}</label>
        <i class="fa-solid fa-trash-can delete" data-id="${task.id}"></i>
    `;
    tasksList.append(li);
}

// This function will show list on page.
function renderList(){
    tasksList.innerHTML = ``;

    for(let i = 0; i < tasks.length; i++){
        addTaskToLi(tasks[i])
    }
    tasksCounter.innerHTML = tasks.length;
}

// Task toggle
function markTaskAsComplete(taskId){
    const task = tasks.filter(function(task){
        return task.id === taskId
    });

    if(task.length > 0){
        const currentTask = task[0];
        currentTask.done = !currentTask.done;
        renderList();
        showNotification('Task toggled successfully');
        return;
    }
    showNotification('Could not toggle task');
}

// Delete task
function deleteTask(taskId){
    const newTasks = tasks.filter(function(task) {
        return task.id !== taskId
    });
    tasks = newTasks;
    renderList();
    showNotification('Task deleted successfully!');
}

// Add task
function addTask(task){
    if(task){
        tasks.push(task);
        renderList();    
        showNotification('Task added successfully !');
        return;
    }
    showNotification('Task can not be added.')
}

// Show alerts
function showNotification(text){
    alert(text);
}

// Handling enter to add task
function handleInputKeypress(e){
    if(e.key === 'Enter'){
        const text = e.target.value;

        if(!text){
            showNotification('Task text can not be empty!');
            return;
        }
        const task={
            text,
            id: Date.now().toString(),
            done:false
        }
        e.target.value="";
        addTask(task);
    }   
}

// Handling click events
function handleClick(e){
    const target = e.target;
    console.log(target);

    if(target.className === 'fa-solid fa-trash-can delete'){
        const taskId = target.dataset.id;
        deleteTask(taskId);
        return;
    } else if (target.className === 'custom-checkbox'){
        const taskId = target.id;
        markTaskAsComplete(taskId);
        return;
    }
}

function initializeApp(){
    addTaskInput.addEventListener('keyup', handleInputKeypress);
    document.addEventListener('click', handleClick);
}

initializeApp();
