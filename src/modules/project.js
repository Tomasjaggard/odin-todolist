import {toDate,isToday, isThisWeek, parseISO} from 'date-fns'

export default class Project{
    constructor(name){
        this.name = name
        this.tasks = []
    }

    setName(name){
        this.name = name
    }

    getName(){
        return this.name
    }

    setTasks(tasks){
        this.tasks = tasks
    }

    getTasks(){
        return this.tasks
    }

    addTask(newTask){
        if (this.tasks.find((task) => task.getName() === newTask.name)) return
        this.tasks.push(newTask)
    }

    removeTask(taskName){
        this.tasks = this.tasks.filter((task) => task.title !== taskName)
    }

    getTask(taskName){
        return this.tasks.find((task) => task.getName() === taskName)
    }

    getTasksToday(){
        return this.tasks.filter((task) => {
            const taskDate = task.getDate()
            if(taskDate == null) return
            return isToday(toDate(taskDate))
        })
    }

    getTasksThisWeek(){
        return this.tasks.filter((task) => {
            const taskDate = task.getDate()
            if(taskDate == null) return
            return isThisWeek(toDate(taskDate))
        })
    }
}