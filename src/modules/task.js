export default class Task{
    constructor(title, description, dueDate = null, priority = 'low'){
        this.title = title
        this.description = description
        this.dueDate = dueDate instanceof Date ? dueDate : null;
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
        const day = this.dueDate.getDate();
        const month = this.dueDate.getMonth() + 1;
        const year = this.dueDate.getFullYear();

        const formattedDay = day.toString().padStart(2, '0');
        const formattedMonth = month.toString().padStart(2, '0');
        const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;
        return formattedDate
    }
}