// import external libraries
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
// import project services
import { ProjectService } from '../services/project.service';
import { UserSessionService } from '../services/user-session.service';
// import project models
import { Project } from '../models/Project';
import { User } from '../models/User';
// import project styles
import '../../styles.css';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css']
})
export class ViewProjectComponent implements OnInit {

 // an array of projects
 projects: Project[] = [];
 displayedColumns: String[] = ['projectNameDescription', 'delete', 'edit'];
 dataSource = new MatTableDataSource<Project>(this.projects);


 constructor(private projectService: ProjectService,
             private userSessionService: UserSessionService,
             private router: Router) { }
  user: User;
  enableDelete=false;  //toggle the delete button

  ngOnInit() {
    if (this.userSessionService.user.firstName == 'Guest') {
      this.displayedColumns.splice(2,2);
    }

    this.projectService.getAllProjects().subscribe(
      (response) => {
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
    // console.log("Deleting Project: ", project.projectName, "ID: ", project._id);
    this.projectService.deleteProject(project).subscribe (
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
      (response) => {
        this.projects = response;
        this.dataSource = new MatTableDataSource<Project>(this.projects);
      },
      (error) => {
        console.log(error);
    });
  }

  editProject(project: Project) {
    let projectId = project._id;
    this.projectService.getProjectById(projectId).subscribe (
        (response) => {
          this.projects.push(response);
          this.dataSource = new MatTableDataSource<Project>(this.projects);
        },
        (error) => {
          console.log(error);
        }
    );
  }
}
