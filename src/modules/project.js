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

    addTask(newTask){
        if (this.tasks.find((task) => task.getName() === newTask.name)) return
        this.tasks.push(newTask)
    }

    removeTask(taskName){
        this.tasks = this.tasks.filter((task) => task.title !== taskName)
    }

    getTask(taskName){
        return this.tasks.some((task) => task.getName() === taskName)
    }

    getTasksToday(){
        // pending
    }

    getTasksThisWeek(){
        // pending
    }
}