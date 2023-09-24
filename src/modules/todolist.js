import Project from "./project"

export default class Todolist{
    constructor(){
        this.projects = []
        this.projects.push(new Project('Inbox'));
        this.projects.push(new Project('Today'));
        this.projects.push(new Project('This week'));
    }


    getProjectName(projectName){
        return this.projects.find((project) => project.getName() === projectName);
    }

    addProject(newProject){
        if (this.projects.find((project) => project.getName() === newProject.getName())) return;
        this.projects.push(newProject);
    }

    deleteProject(projectName){
        this.projects.filter((project) => project !== projectName)
    }
}