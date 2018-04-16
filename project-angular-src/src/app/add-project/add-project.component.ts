import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NewProject } from '../models/Project';
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
  user: User;
  enableCreate: Boolean;
  
  constructor(private projectService: ProjectService,
              private userSessionService: UserSessionService,
              private router: Router) { }
  
  ngOnInit() {
    this.createEmptyProject();

    if(this.userSessionService.user){
      this.enableCreate=true;
    } else this.enableCreate=false;
  }

  public onCreateNewProject() {
    console.log(this.newProject);

    this.projectService.addProject    
    (this.newProject).subscribe(
      response => {
        this.projectAdded.emit(this.newProject);
        this.createEmptyProject();
    });
  }

  createEmptyProject() {
    this.newProject = {
      projectName: '',
      projectDescription: '',
      owner: this.userSessionService.user._id,
      projectMembers: [],
      techStack: [],
      repositoryLink: '',
      projectDemo: '',
      labels: []
    };
  }
}
