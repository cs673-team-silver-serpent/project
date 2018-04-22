import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { Project } from '../models/Project';
import { MatTableDataSource } from '@angular/material';
import { UserSessionService } from '../services/user-session.service';
import { User } from '../models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css']
})
export class ViewProjectComponent implements OnInit {

 // an array of projects
 projects: Project[] = [];
 displayedColumns: String[] = ['dateCreated', 'projectName', 'projectDescription', 'delete'];
 dataSource = new MatTableDataSource<Project>(this.projects);


 constructor(private projectService: ProjectService,
             private userSessionService: UserSessionService,
             private router: Router) { }
  user: User;
  enableDelete=false;  //toggle the delete button
  
  ngOnInit() {
    if (this.userSessionService.user.firstName == 'Guest') {
      this.displayedColumns.pop();
    }
    this.displayedColumns

    this.projectService.getAllProjects().subscribe(
      response => {
        this.projects = response;
        this.dataSource = new MatTableDataSource<Project>(this.projects);
      },
      (error) => console.log(error)
    );
    
    if(this.userSessionService.user){
      this.enableDelete=true;
    } else this.enableDelete=false;
  }
  
  deleteProject(project: Project) {
    console.log("Deleting Project: ", project.projectName, "ID: ", project._id);
    this.projectService.deleteProject(project).subscribe(
      (response) => {
        this.projects = this.projects.filter(projects => projects !== project)
        this.projectService.getAllProjects().subscribe(
          (response) => {
            this.projects = response;
            this.dataSource = new MatTableDataSource<Project>(this.projects);
          },
          (error) => {
            console.log(error);
          }
        );
    });
  }

  onNewProjectAddedRefreshList(newProject) {
    this.projectService.getAllProjects().subscribe(
      response => {
        this.projects = response;
        this.dataSource = new MatTableDataSource<Project>(this.projects);
      },
      (error) => {
        console.log(error);
    });
  }
}