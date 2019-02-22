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
  displayedColumns: String[] = ['projectName', 'projectDescription', 'techStack', 'repositoryLink', 'projectDemo', 'labels', 'favorite'];
  dataSource = new MatTableDataSource<Project>(this.projects);
  user: User;

  constructor(private projectService: ProjectService,
              private userSessionService: UserSessionService) { }

  ngOnInit() {

    if (this.userSessionService.user.firstName === 'Guest') {
      this.projectService.getAllProjects().subscribe(
        (response) => {
          this.projects = response;
          this.dataSource = new MatTableDataSource<Project>(this.projects);
          this.displayedColumns.pop(); // pop off the favorites column for guests
        },
        (error) => {
          console.log(error);
      });
    } else {
      const owner = this.userSessionService.user._id;
      // new controller here getProjectsForUser
      this.projectService.getProjectsByOwner().subscribe(
        (response) => {
          this.projects = response;
          this.dataSource = new MatTableDataSource<Project>(this.projects);
        },
        (error) => {
          console.log(error);
      });
    }
  }
}
