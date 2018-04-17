import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { Project } from '../models/Project';
import { MatTableDataSource } from '@angular/material';
import { UserSessionService } from '../services/user-session.service';
import { User } from '../models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  projects: Project[] = [];
  //@Output() projectfound: EventEmitter<NewProject> = new EventEmitter<NewProject>();
  //Show just one project
  user :User;
  constructor(private projectService: ProjectService, private userSessionService: UserSessionService, private router: Router) { }
 // private displayedProject: NewProject;
  
 ownerName='Default';
 projectName='Default';
 projectDescription='Default';
 repoLink='Default';
 demoLink='Default';



  ngOnInit() {
if(this.userSessionService.user)
{
  this.user= this.userSessionService.user;
}
else
{
  this.user = {
    _id: 0,
  firstName: 'Guest',
  lastName: '',
  title: '',
  email: '',
  password: '',
  __v: 0,
    }

}
    /*this.displayedProject = {
      owner: '',
      projectName: '',
      projectDescription: '',
      projectMembers: '',
      techStack: [],
      repositoryLink: '',
      projectDemo: '',
      labels: []*/
    };  /*********************************d*/


  //show project 
  //this.projectService.displayProject(this.newProject).subscribe(
   // response => {
   ///   this.projects = response;
   // }



    



  

  /*public displayProject(project: Project) {
    this.projectService.deleteProject(project).subscribe(
      response => {
        this.projects = this.projects.filter(projects => projects !== project)
        this.projectService.displayProject(project.subscribe(
          response => {
            this.projects = response;

          },
          (error) => {
            console.log(error);
          }
        );
      });
  }*/

}
