import { Component, OnInit, Output, EventEmitter } from '@angular/core';
// import project services
import { UserSessionService } from '../services/user-session.service';
import { ProjectService } from '../services/project.service';
// import project models
import { Project } from '../models/Project';
import { User } from '../models/User';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {
  @Output() projectToEdit: EventEmitter<Project> = new EventEmitter<Project>();
  editProject: Project;
  userIsAuthorized: Boolean = false;
  formIsValid: Boolean = false;

  constructor(
    private userSessionService: UserSessionService,
    private projectService: ProjectService
    ) {
  }

  ngOnInit() {
    if (this.userSessionService.user.firstName !== 'Guest') {
      this.userIsAuthorized = true;
    }

  }

}
