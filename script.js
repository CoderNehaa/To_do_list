let tasks = [];
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');
const taskList = document.getElementById('list');

function renderList(){}

function markTaskAsComplete(taskId){
    const task = tasks.filter((task) => {return task.id === taskId})
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

