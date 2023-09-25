import Project from "./modules/project"
import Task from "./modules/task"
import Todolist from "./modules/todolist"

const todoList = new Todolist
const inbox = todoList.getProject('Inbox')
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

    const dataGroup = document.createElement('div')
    dataGroup.classList.add('data-group')

    const taskName = document.createElement('input')
    taskName.classList.add('add-task-name')
    taskName.setAttribute('id', 'add-task-name')
    taskName.setAttribute('type', 'text')

    dataGroup.appendChild(taskName)

    const taskPriority = document.createElement('select')
    taskPriority.classList.add('add-task-priority')
    taskPriority.setAttribute('id', 'add-task-priority')
    taskPriority.setAttribute('type', 'select')

    const option1 = document.createElement('option');
    option1.value = 'low';
    option1.text = 'Low';

    const option2 = document.createElement('option');
    option2.value = 'medium';
    option2.text = 'Medium';

    const option3 = document.createElement('option');
    option3.value = 'high';
    option3.text = 'High';

    taskPriority.appendChild(option1)
    taskPriority.appendChild(option2)
    taskPriority.appendChild(option3)

    dataGroup.appendChild(taskPriority)

    const buttonContainer = document.createElement('div')
    buttonContainer.classList.add('button-container')

    const taskDate = document.createElement('input')
    taskDate.classList.add('add-task-date')
    taskDate.setAttribute('type', 'date')

    dataGroup.appendChild(taskDate)

    const taskDataSubmit = document.createElement('button')
    taskDataSubmit.classList.add('add-task-submit')
    taskDataSubmit.setAttribute('id', 'add-task-submit')
    taskDataSubmit.textContent = 'Add'
    taskDataSubmit.addEventListener('click', () => {
        const _taskName = taskName.value
        if(_taskName === '') return
        if(currentProject.getTask(_taskName)) return

        let _taskDate = taskDate.value
        if(!_taskDate){
            _taskDate = 'None'
        } else{
            _taskDate = new Date(taskDate.valueAsDate)
        }
        currentProject.addTask(new Task(_taskName, 'Test Description', _taskDate, taskPriority.value))
        createContent()
    })

    const taskDataCancel = document.createElement('button')
    taskDataCancel.classList.add('add-task-cancel')
    taskDataCancel.setAttribute('id', 'add-task-cancel')
    taskDataCancel.textContent = 'Cancel'
    taskDataCancel.addEventListener('click', () => {
        taskItemInput.classList.toggle('active')
        taskItemPrompt.classList.toggle('active')
    })
    taskItemInput.appendChild(dataGroup)
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

const createTask = (task) => {
    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item');

    const taskName = document.createElement('p')
    taskName.textContent = task.getName()

    const buttonNameGroup = document.createElement('div')
    buttonNameGroup.classList.add('button-name-group')
    const completedButton = document.createElement('button')
    completedButton.classList.add('completed-button')
    completedButton.setAttribute('id', 'completed-button')
    const completedIcon = document.createElement('i');
    completedIcon.classList.add('fa-regular', 'fa-circle-check');
    completedIcon.style.color = '#000000';
    completedButton.addEventListener("click", () => {
        currentProject.removeTask(task.getName())
        createContent()
    })
    completedButton.appendChild(completedIcon)
    buttonNameGroup.appendChild(completedButton)
    
    buttonNameGroup.appendChild(taskName)
    
    taskItem.appendChild(buttonNameGroup)
    if(task.getDate() == "None"){
        const taskDate = document.createElement('input')
        taskDate.setAttribute('type', 'date')
        taskItem.appendChild(taskDate)
        taskDate.addEventListener('blur', () => {
            task.setDate(new Date(taskDate.valueAsDate))
            taskItem.replaceChild(createDate(task), taskDate)
            task.getDate()
            createContent()
        })
    } else {
        taskItem.appendChild(createDate(task))
    }
    return taskItem
}

const createDate = (task) => {
    const taskDateDisplay = document.createElement('p')
    taskDateDisplay.textContent = task.getDateFormatted()
    return taskDateDisplay
}

const taskList = () =>{
    if (currentProject.tasks.length === 0){
        return addTaskItem();
    } else {
        const taskItemsList = document.createElement('div')
        taskItemsList.classList.add('task-items-list')
        currentProject.tasks.forEach(task => {
            const taskItem = createTask(task)
            taskItemsList.appendChild(taskItem)
        });
        taskItemsList.appendChild(addTaskItem())
        return taskItemsList
    }
}

const projectSorter = () => {
    const todayProject = todoList.getProject('Today')
    const thisWeekProject = todoList.getProject('This week')
    todoList.projects.forEach(project => {
        console.log(project.getName())
        console.log(project.tasks)
        const thisDayTasks = project.getTasksToday()
        const thisWeekTasks = project.getTasksThisWeek()
        project.tasks.forEach(task => {
            console.log(task)
            if(thisDayTasks.includes(task) && thisWeekTasks.includes(task)){
                thisDayTasks.forEach(item => {
                    project.removeTask(item.getName())
                    todayProject.addTask(item)
                });
            } else if (thisWeekTasks.includes(task)){
                thisWeekTasks.forEach(item => {
                    project.removeTask(item.getName())
                    thisWeekProject.addTask(item)
                });
            }
        });
    })
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
    projectSorter()
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