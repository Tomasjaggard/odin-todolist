export default class Task{
    constructor(title, description, dueDate = 'None', priority = 1){
        this.title = title
        this.description = description
        this.dueDate = dueDate
        this.priority = priority
    }

    setName(name){
        this.title = name
    }

    getName(){
        return this.title
    }

    setDate(date){
        this.dueDate = this.date
    }

    getDate(){
        return this.dueDate
    }

    getDateFormatted() {
        const day = this.dueDate.split('/')[0]
        const month = this.dueDate.split('/')[1]
        const year = this.dueDate.split('/')[2]
        return `${month}/${day}/${year}`
    }
}