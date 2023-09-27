import Todolist from "./todolist"
import Project from "./project"
import Task from "./task"


export default class Storage{
    static saveTodolist(data){
        localStorage.setItem('todoList', JSON.stringify(data))
    }


    static getTodoList() {

        const todoList = Object.assign(
        new Todolist(),
        JSON.parse(localStorage.getItem('todoList'))
        )

        todoList.setProjects(
            todoList.getProjects()
            .map((project) => Object.assign(new Project(), project)))

        todoList.getProjects()
            .forEach((project) =>project.setTasks(project.getTasks()
            .map((task) => Object.assign(new Task(), task))))

        todoList.getProjects()
            .forEach((project) => project.getTasks().forEach((task) => {
                if(task.getDate() == null) return
                task.setDate(new Date(task.getDate()))
            }))

        return todoList
    }

    static addProject(project){
        const todoList = Storage.getTodoList()
        todoList.addProject(project)
        Storage.saveTodolist(todoList)
    }

    static removeProject(project){
        const todoList = Storage.getTodoList()
        todoList.removeProject(project)
        Storage.saveTodolist(todoList)
    }

    static addTask(projectName, taskName){
        const todoList = Storage.getTodoList()
        todoList.getProject(projectName).addTask(taskName)
        Storage.saveTodolist(todoList)
        
    }

    static removeTask(projectName, taskName){
        const todoList = Storage.getTodoList()
        todoList.getProject(projectName).removeTask(taskName)
        Storage.saveTodolist(todoList)
    }
    
    static setDueDate(projectName, taskName, date){
        const todoList = Storage.getTodoList()
        todoList.getProject(projectName).getTask(taskName).setDate(date)
        Storage.saveTodolist(todoList)
    }
}