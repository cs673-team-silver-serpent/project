import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { Project } from '../models/Project';


@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css']
})
export class ViewProjectComponent implements OnInit {

 // an array of projects
 private projects: Project[] = [];

 constructor(private projectServ: ProjectService) { }

 ngOnInit() {
     // Load projects on init
     this.loadProjects();
 }

 public loadProjects() {
    // get projects from server and update list of projects
    this.projectServ.getAllProjects().subscribe(
        response => this.projects = response, );
 }

 public deleteProject(project: Project) {
    this.projectServ.deleteProject(project._id).subscribe(
       response => this.projects = this.projects.filter(projects => projects !== project),)
 }

 public onAddProject(newProject) {
   this.projects = this.projects.concat(newProject);
 }

}
