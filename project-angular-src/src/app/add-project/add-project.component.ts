import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Project } from '../models/Project';
import { ProjectService } from '../services/project.service';

@Output()
addProject: new EventEmitter<Project>();

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})

export class AddProjectComponent implements OnInit {

  private newProject: Project;
  constructor(private projectServ: ProjectService) { }

  ngOnInit() {
    this.newProject = {
      _id: '',
      title: '',
      description: '',
    }
  }

  public onSubmit() {
    this.projectServ.addProject(this.newProject).subscribe(
      response => {
          if (response.success == true)
            // if success, update the project-list component
            this.addList.emit(this.newProject);
      },
    );
  }

  public onAddProject(newProject) {
    this.projects = this.projects.concat(newProject);
  }

}
