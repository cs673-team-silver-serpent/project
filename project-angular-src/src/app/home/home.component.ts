import { Component, OnInit } from '@angular/core';
import { UserSessionService } from '../services/user-session.service';
import { User } from '../models/User';
import { ProjectService } from '../services/project.service';
import { Project } from '../models/Project';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  projects: Project[];
  displayedColumns: String[] = ['dateCreated', 'projectName', 'projectDescription', 'techStack', 'repositoryLink', 'projectDemo', 'labels'];
  dataSource = new MatTableDataSource<Project>(this.projects);
  

  constructor(private projectService: ProjectService,
              private userSessionService: UserSessionService) { }

  ngOnInit() {
    this.projectService.getProjectsByOwner().subscribe(
      (response) => {
        // console.log("----------------------", response);
        this.projects = response;
        this.dataSource = new MatTableDataSource<Project>(this.projects);
      },
      (error) => {
        console.log(error);
    });
  }
}
