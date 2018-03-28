import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NewProject } from '../models/Project';
import { ProjectService } from '../services/project.service';
import { ViewChild } from '@angular/core/src/metadata/di';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  private newProject: NewProject;
  @Output() projectAdded: EventEmitter<NewProject> = new EventEmitter<NewProject>();

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.newProject = {
      owner: '',
      projectName: '',
      projectDescription: '',
      projectMembers: '',
      techStack: [],
      repositoryLink: '',
      projectDemo: '',
      labels: []
    };
  }

  public onCreateNewProject() {
    console.log(this.newProject);
    this.projectService.addProject(this.newProject).subscribe(
      response => {
        console.log(response);
        this.projectAdded.emit(this.newProject);
        this.newProject = {
          owner: '',
          projectName: '',
          projectDescription: '',
          projectMembers: '',
          techStack: [],
          repositoryLink: '',
          projectDemo: '',
          labels: []
        };
    });
  }
}
