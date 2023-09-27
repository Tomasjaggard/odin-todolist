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

    static addTask(project, task){
        const todoList = Storage.getTodoList()
        todoList.getProject(project).addTask(task)
        Storage.saveTodolist(todoList)
        
    }

    static removeTask(project, task){
        const todoList = Storage.getTodoList()
        todoList.getProject(project).removeTask(task)
        Storage.saveTodolist(todoList)
    }
    
    static setDueDate(project, task, date){
        const todoList = Storage.getTodoList()
        todoList.getProject(project).getTask(task).setDate(date)
        Storage.saveTodolist(todoList)
    }
}