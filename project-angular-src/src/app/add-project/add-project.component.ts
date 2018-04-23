import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NewProject, Project } from '../models/Project';
import { ProjectService } from '../services/project.service';
import { ViewChild } from '@angular/core/src/metadata/di';
import { UserSessionService } from '../services/user-session.service';
import { User } from '../models/User';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  @Output() projectAdded: EventEmitter<NewProject> = new EventEmitter<NewProject>();
  newProject: NewProject;
  formIsValid: Boolean = false;
  userIsAuthorized: Boolean = false;
  
  constructor(private projectService: ProjectService,
              private userSessionService: UserSessionService,
              private router: Router) { }
  
  ngOnInit() {
    this.createEmptyProject();
    if ( this.userSessionService.user.firstName != 'Guest') {
      this.userIsAuthorized = true;
    }
  }

  onCreateNewProject() {
    var proj = {
      dateCreated: new Date(),
      dateModified: new Date(),
      owner: this.newProject.owner,
      projectName: this.newProject.projectName,
      projectDescription: this.newProject.projectDescription,
      projectMembers: this.parseString(this.newProject.projectMembers),
      techStack: this.parseString(this.newProject.techStack),
      repositoryLink: this.newProject.repositoryLink,
      projectDemo: this.newProject.projectDemo,
      labels: this.parseString(this.newProject.labels),
      _id: ''
    }
    console.log("add-project -- onCreate New Project(): project: ", proj);

    this.projectService.addProject(proj).subscribe(
      response => {
        this.projectAdded.emit(this.newProject);
        this.createEmptyProject();
        this.formIsValid = false;
    });
  }

  // Break a comma seperated string into an array
  parseString(s: String): String[] {
    if (s == '') {
      return [];
    } else {
      return s.split(",");
    }
  }

  isProjectValid(): Boolean {
    if (this.newProject.projectName.length < 1){
      return false;
    }
    if (this.newProject.projectDescription.length < 1) {
      return false;
    }
    return true;
  }

  updateFormValid(): void {
    this.formIsValid = this.isProjectValid();
  }

  createEmptyProject(): void {
    this.newProject = {
      projectName: '',
      projectDescription: '',
      owner: this.userSessionService.user._id,
      projectMembers: '',
      techStack: '',
      repositoryLink: '',
      projectDemo: '',
      labels: ''
    };
  }
}
