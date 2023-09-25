export default class Task{
    constructor(title, description, dueDate = 'None', priority = 'low'){
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
        this.dueDate = date
    }

    getDate(){
        return this.dueDate
    }

    getDateFormatted() {
        const dateSplit = this.dueDate.split('-')
        const day = dateSplit[2]
        const month = dateSplit[1]
        const year = dateSplit[0]
        return `${day}/${month}/${year}`
    }
}