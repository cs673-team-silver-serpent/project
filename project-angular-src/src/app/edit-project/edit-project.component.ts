import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import project services
import { UserSessionService } from '../services/user-session.service';
import { ProjectService } from '../services/project.service';
// import project models
import { Project } from '../models/Project';
import { User } from '../models/User';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {
  @Output() projectToEdit: EventEmitter<Project> = new EventEmitter<Project>();
  myProject: Project;
  userIsAuthorized: Boolean = false;
  formIsValid: Boolean = false;
  projectId: String = '';

  constructor(
    private userSessionService: UserSessionService,
    private projectService: ProjectService,
    private route: ActivatedRoute
    ) {
  }

  ngOnInit() {
    if (this.userSessionService.user.firstName !== 'Guest') {
      this.userIsAuthorized = true;
    }
    this.route.queryParams.subscribe(
      (params) => {
      this.projectId = params['id'];
      console.log('the project id is', params['id']);
      });

    this.projectService.getProjectById(this.projectId).subscribe(
      (response) => {
        this.myProject = response[0];
        console.log('projectName: ', this.myProject.projectName);
      },
      (error) => console.log(error)
    );

  }

  updateProject() {
    console.log('this is the projectId: ');
  }


}
