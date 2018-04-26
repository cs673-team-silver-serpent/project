import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { ProjectService } from '../services/project.service';
import { Project } from '../models/Project';
import { MatTableDataSource } from '@angular/material';
import { UserSessionService } from '../services/user-session.service';
import { User } from '../models/User';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject'
import { ProjectBoxComponent } from '../project-box/project-box.component';


@Component({
  selector: 'app-display-project',
  templateUrl: './display-project.component.html',
  styleUrls: ['./display-project.component.css']
})
export class DisplayProjectComponent implements OnInit {

constructor(private projectService: ProjectService,private userSessionService:UserSessionService,private router: Router) { }

  @ViewChild(ProjectBoxComponent) projectBoxObject: ProjectBoxComponent;

  user: User;
  projects: Project[] = [];
  displayedColumns: String[] = ['projectName', 'select'];
  dataSource = new MatTableDataSource<Project>(this.projects);

  ngOnInit() {
  }

  searchName;
  showError = false;
  showProjectList = false;
  showProjectContent: Boolean = false;
  noMatch = false;
  errorMessage = "Please Enter The Search Keywords";

  getProject() {
    this.projectBoxObject.ngOnInit(); //show.Content=false;
    this.searchName = (document.getElementById("x") as HTMLInputElement).value.trim();
    if (this.searchName.length == 0) {
      this.projectBoxObject.showContent = false;
      this.showError = true;
      this.showProjectList = false;
    }
    else {
      this.showError = false;
      console.log("getProject searchName: ", this.searchName)
      //  this.searchName=document.getElementById("nameTextQuery") ///work on this part
      this.projectService.getProjectName(this.searchName).subscribe(
        (response) => {
          console.log(response);
          this.projects = response;
          if (this.projects.length != 0) {
            this.dataSource = new MatTableDataSource<Project>(this.projects);
            this.showProjectList = true;
            this.noMatch = false;

          }
          else {
            this.projectBoxObject.showContent = false;
            this.showProjectList = false;
            this.noMatch = true;
            console.log("Nothing found")
          }
        },
        (error) => {
          console.log(error)
          this.projectBoxObject.serviceError=true;
          this.showProjectList = false;
          this.projectBoxObject.serviceError = true;
          this.projectBoxObject.showContent = false;

        },
        () => { console.log("Finished") }

      );
    }

  }

  //Initial Values
  selectedProjectName;
  selectedProjectId;
  selectProject(project: Project) {
    var searchProject = project.projectName;
    index = 0;
    var index = this.projects.findIndex(x => x.projectName === searchProject)
    console.log("Project Selected: ", project.projectName, "ID: ", project._id, "Index:", index)
    this.selectedProjectName = this.projects[index].projectName;
    this.selectedProjectId = this.projects[index]._id;
    console.log("Clicked Project: ", this.selectedProjectName);
    this.showClickedProject();
  }

  showClickedProject() {

    this.projectService.sharedId = this.selectedProjectId;
    this.projectBoxObject.populate();
    //console.log("SHaredId",this.projectService.sharedId)
  }




}
