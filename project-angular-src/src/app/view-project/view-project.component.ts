import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { Project } from '../models/Project';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css']
})
export class ViewProjectComponent implements OnInit {

 // an array of projects
 projects: Project[] = [];
 displayedColumns = ['dateCreated', 'projectName', 'projectDescription', 'delete'];
 dataSource = new MatTableDataSource<Project>(this.projects);

 constructor(private projectService: ProjectService) { }

 ngOnInit() {
     // Load projects on init
     this.projectService.getAllProjects().subscribe(
       response => {
         this.projects = response;
         this.dataSource = new MatTableDataSource<Project>(this.projects);
       },
       (error) => {
         console.log(error);
       }
     );
 }

 public deleteProject(project: Project) {
   console.log("Deleting Project: ", project.projectName, "ID: ", project._id);
    this.projectService.deleteProject(project).subscribe(
       response => {
         this.projects = this.projects.filter(projects => projects !== project)
         this.projectService.getAllProjects().subscribe(
          response => {
            this.projects = response;
            this.dataSource = new MatTableDataSource<Project>(this.projects);
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
        this.dataSource = new MatTableDataSource<Project>(this.projects);
      },
      (error) => {
        console.log(error);
      }
    );
 }

}