import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Project } from '../models/Project';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  private newProject: Project;
  @Output() addProject: EventEmitter<Project> = new EventEmitter<Project>();
  constructor(private projectServ: ProjectService) { }

  ngOnInit() {
    this.newProject = {
      _id: '',
      projectName: '',
      projectDescription: '',
      repositoryLink: ''
    };
  }

  public onSubmit() {
    console.log(this.newProject.projectName);
    this.projectServ.addProject(this.newProject).subscribe(
      response => {
          if (response) {
            this.addProject.emit(this.newProject);
          }
      },
    );
  }

}
