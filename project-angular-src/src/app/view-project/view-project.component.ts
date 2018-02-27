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
 projects: Project[] = [];

 constructor(private projectService: ProjectService) { }

 ngOnInit() {
     // Load projects on init
     this.projectService.getAllProjects().subscribe(
       response => {
         this.projects = response;
       },
       (error) => {
         console.log(error);
       }
     );

 }


 public deleteProject(project: Project) {
    this.projectService.deleteProject(project._id).subscribe(
       response => {
         this.projects = this.projects.filter(projects => projects !== project)

         this.projectService.getAllProjects().subscribe(
          response => {
            this.projects = response;
          },
          (error) => {
            console.log(error);
          }
        );
    });
  }

  public onNewProjectAddedRefreshList(newProject) {
    this.projectService.getAllProjects().subscribe(
      response => {
        this.projects = response;
      },
      (error) => {
        console.log(error);
      }
    );
 }

}
