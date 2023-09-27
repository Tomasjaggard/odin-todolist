import Project from "./project"

export default class Todolist{
    constructor(){
        this.projects = []
        this.projects.push(new Project('Inbox'));
        this.projects.push(new Project('Today'));
        this.projects.push(new Project('This week'));
    }


    getProject(projectName){
        return this.projects.find((project) => project.getName() === projectName);
    }

    setProjects(projects) {
        this.projects = projects
    }

    getProjects(){
        return this.projects
    }

    addProject(newProject){
        if (this.projects.find((project) => project.getName() === newProject.getName())) return;
        this.projects.push(newProject);
    }

    deleteProject(projectName){
        this.projects = this.projects.filter((project) => project !== projectName)
    }
}