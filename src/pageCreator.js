import Project from "./modules/project"
import Task from "./modules/task"
import Todolist from "./modules/todolist"

const todoList = new Todolist
const inbox = todoList.getProjectName('Inbox')
inbox.addTask(new Task('Test1', 'Test Description', '', 3))
let currentProject = inbox

//need inbox, today, this week
//inbox is all unsorted tasks
//today is all tasks which have a deadline which is the current day
//this week is all tasks which have a deadline current day + 7

//div task //to append onto content

//task class
//Task(title, description, dueDate, priority)
//if no dueDate provided, set to None

//project class
//Project.addTask()

//pageTitle.textContent = projectTitle

const addTaskForm = (taskItemInput,taskItemPrompt) => {
    taskItemInput.classList.toggle('active')
    const taskData = document.createElement('input')
    taskData.classList.add('add-task-input')
    taskData.setAttribute('id', 'add-task-input')
    taskData.setAttribute('type', 'text')
    taskItemInput.appendChild(taskData)

    const buttonContainer = document.createElement('div')
    buttonContainer.classList.add('button-container')

    const taskDataSubmit = document.createElement('button')
    taskDataSubmit.classList.add('add-task-submit')
    taskDataSubmit.setAttribute('id', 'add-task-submit')
    taskDataSubmit.textContent = 'Add'
    taskDataSubmit.addEventListener('click', () => {
        //get taskData.value, priority.value etc.
        //push new task to currentProject
    })

    const taskDataCancel = document.createElement('button')
    taskDataCancel.classList.add('add-task-cancel')
    taskDataCancel.setAttribute('id', 'add-task-cancel')
    taskDataCancel.textContent = 'Cancel'
    taskDataCancel.addEventListener('click', () => {
        taskItemInput.classList.toggle('active')
        taskItemPrompt.classList.toggle('active')
    })

    buttonContainer.appendChild(taskDataSubmit)
    buttonContainer.appendChild(taskDataCancel)
    taskItemInput.appendChild(buttonContainer)
}

const addTaskItem = () => {
    const taskItem = document.createElement('div')
    const taskItemPrompt = document.createElement('div')
    taskItemPrompt.classList.add('task-item-prompt')
    const taskItemInput = document.createElement('div')
    taskItemInput.classList.add('task-item-input')
    

    const addItemButton = document.createElement('button')
    addItemButton.classList.add('task-button')

    addItemButton.addEventListener("click", () =>{
        taskItemPrompt.classList.toggle('active')
        taskItemInput.innerHTML = ''
        addTaskForm(taskItemInput,taskItemPrompt)
    })

    const addItem = document.createElement('i')
    addItem.classList.add('fa-solid', 'fa-plus')
    addItem.style.color = '#000000'
    addItemButton.appendChild(addItem)
    taskItemPrompt.appendChild(addItemButton)

    const title = document.createElement('p')
    title.classList.add('add-task-title')
    title.textContent = 'Add Task'
    taskItemPrompt.appendChild(title)

    taskItem.appendChild(taskItemPrompt)
    taskItem.appendChild(taskItemInput)
    
    return taskItem
}

const taskList = () =>{
    if (currentProject.tasks.length === 0){
        return addTaskItem();
    } else {
        const taskItemsList = document.createElement('div')
        taskItemsList.classList.add('task-items-list')
        currentProject.tasks.forEach(task => {
            const taskItem = document.createElement('div');
            taskItem.classList.add('task-item');

            const buttonNameGroup = document.createElement('div')
            buttonNameGroup.classList.add('button-name-group')

            const completedButton = document.createElement('button')
            completedButton.classList.add('completed-button')
            completedButton.setAttribute('id', 'completed-button')
            const completedIcon = document.createElement('i');
            completedIcon.classList.add('fa-regular', 'fa-circle-check');
            completedIcon.style.color = '#000000';
            completedButton.appendChild(completedIcon)
            buttonNameGroup.appendChild(completedButton)

            const taskName = document.createElement('p')
            taskName.textContent = task.getName()
            buttonNameGroup.appendChild(taskName)
            
            const taskDate = document.createElement('input')
            taskDate.setAttribute('type', 'date')
            //needs setAttribute('id', 'date') but not sure how this would conflict with other tasks
            
            taskItem.appendChild(buttonNameGroup)
            taskItem.appendChild(taskDate)
            taskItemsList.appendChild(taskItem)
            taskItemsList.appendChild(addTaskItem())
        });
        return taskItemsList
    }
}

const createProjectList = () =>{
    const projectList = document.getElementById('project-list')
    todoList.projects.forEach(project => {

        const projectItem = document.createElement('button')
        projectItem.classList.add('project-item');
        projectItem.addEventListener("click", () => {
            currentProject = project
            createContent()
        })
        const projectTitle = document.createElement('p')
        projectTitle.classList.add('project-title')
        projectTitle.textContent = project.getName()
        projectItem.appendChild(projectTitle)
        projectList.appendChild(projectItem)
    })
};


const createContent = () =>{
    console.log(currentProject.getName())
    const content = document.getElementById('content')
    content.innerHTML = ''
    const title = document.createElement('h2')
    title.classList.add('content-title')
    title.textContent = currentProject.getName()
    content.appendChild(title)
    content.appendChild(taskList())
    return content
}

const initPage = () =>{
    createProjectList()
    createContent()
}

export default initPage