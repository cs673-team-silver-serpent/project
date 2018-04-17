import { Component, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { ProjectService } from '../services/project.service';
import { Project } from '../models/Project';
import { MatTableDataSource } from '@angular/material';
import { UserSessionService } from '../services/user-session.service';
import { User } from '../models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-display-project',
  templateUrl: './display-project.component.html',
  styleUrls: ['./display-project.component.css']
})
export class DisplayProjectComponent implements OnInit {
  projowner = "";
  projname = "";
  datecreated = "";
  datelastmodified = "";
  repolink = "";
  demolink = "";
  description = "";

  projects: Project[] = [];
  displayedColumns = ['projectName', 'select'];
  ds = new MatTableDataSource<Project>(this.projects);

  constructor(private projectService: ProjectService,private userSessionService: UserSessionService,private router: Router) { }


  queryProject:Project;
  ngOnInit() {
    this.queryProject=    
    {owner: '',
    
      projectName: ,
      projectDescription: '',
      projectMembers: '',
      techStack: [],
      repositoryLink: '',
      projectDemo: '',
      labels: [],
      _id:'',
      dateCreated: '',
      dateModified:'',
  }
  }

  //method to get the list of project matching the entered name
  searchProjectsByName() {
    
    this.projectService.getProject(queryProject).subscribe(
      response => {
        this.projects = this.projects.filter(projects => projects !== project)
        this.projectService.getAllProjects().subscribe(
         response => {
           this.projects = response;
          // this.dataSource = new MatTableDataSource<Project>(this.projects);
         },
        }
      }
  //method to show the clicked project's details
  showThisProject() {
/* */
  }


}
