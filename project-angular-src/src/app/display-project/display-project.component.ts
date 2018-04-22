import { Component, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { ProjectService } from '../services/project.service';
import { Project } from '../models/Project';
import { MatTableDataSource } from '@angular/material';
import { UserSessionService } from '../services/user-session.service';
import { User } from '../models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-display-project',
  templateUrl: './display-project.component.html',
  styleUrls: ['./display-project.component.css']
})
export class DisplayProjectComponent implements OnInit {


  user: User;
  constructor(private projectService: ProjectService, private userSessionService: UserSessionService, private router: Router) { }

  projects: Project[] = [];
  displayedColumns = ['projectName', 'select'];
  dataSource = new MatTableDataSource<Project>(this.projects);


  ngOnInit() {

  }



  searchName;
  showError=false;
  showProjectList=false;
  showProjectContent=false;
  noMatch=false;
errorMessage="Please Enter Search keywords";


  getProject() {
    this.searchName = (document.getElementById("x") as HTMLInputElement).value.trim();
    if(this.searchName.length==0){
      this.showProjectContent=false;
      this.showError=true;
      this.showProjectList=false;
      
    }
    else{
      this.showError=false;
      console.log("Text box value: ",this.searchName)
    //  this.searchName=document.getElementById("nameTextQuery") ///work on this part
    this.projectService.getProjectName(this.searchName).subscribe(
      response => {
        console.log(response);
        this.projects = response;
        if(this.projects.length!=0){
          this.dataSource = new MatTableDataSource<Project>(this.projects);
          this.showProjectList=true;
        }
        else{
          this.showProjectList=false;
          this.showProjectContent=false;
          this.noMatch=true;
          console.log("Nothing found")
        }

        
        // this.abc=response.length;
      }
    )
    }

  }

  selectedProjectName;
  selectedProjectId;
  selectedProjectDescription="Not Available";
  selectedProjectDateCreated="Not Available";
  selectedProjectOwnerId="Not Available";
  selectedProjectDemo="Not Available";
  selectedProjectRepositoryLink="Not Available";
  selectedProjectBackEnd="Not Available";
  selectedProjectFrontend="Not Available";
  selectedProjectFramework="Not Available";
  selectedProjectTestingFramework="Not Available";
  selectedProjectVersionControlTool="Not Available";

  tech = "null";

  selectProject(project: Project) {
    this.showProjectContent=true;
    var searchProject = project.projectName;
    index = 0;
    var index = this.projects.findIndex(x => x.projectName === searchProject)
    console.log("Project Selected: ", project.projectName, "ID: ", project._id, "Index:", index)
    this.selectedProjectName = this.projects[index].projectName;
    this.selectedProjectId = this.projects[index]._id;
    //this.tech=this.projects[index].techStack[1];
    console.log("Clicked Project: ", this.selectedProjectName);
    console.log("Tech Stack: ", this.tech);
    this.showClickedProject();
  }

  newProject: Project;

  pName = "First";
  showClickedProject() {
    //console.log("We are in showClickedProject() method||Project To Show: ",this.selectedProjectName,"Id: ",this.selectedProjectId);
    this.projectService.getProjectById(this.selectedProjectId).subscribe(
      response => {
        this.newProject = response;
        console.log("Response of Show Project", response);
        //console.log("Project Name: ",this.newProject[0].projectName)
        var iniIndex=0;
        this.selectedProjectName = this.newProject[iniIndex].projectName
        this.selectedProjectDescription = this.newProject[iniIndex].projectDescription
        this.selectedProjectDateCreated = this.newProject[iniIndex].dateCreated
        this.selectedProjectDemo = this.newProject[iniIndex].projectDemo
        this.selectedProjectName = this.newProject[iniIndex].projectName
        this.selectedProjectRepositoryLink = this.newProject[iniIndex].repositoryLink
        this.selectedProjectBackEnd=this.newProject[iniIndex].techStack[0];        
        this.selectedProjectFramework=this.newProject[iniIndex].techStack[1];
        this.selectedProjectFrontend=this.newProject[iniIndex].techStack[2];
       // this.getMembersById();

      }
    )

  }

  member: User;
  memberName;
  email;

  //this function takes user id as input and calls the getuserbyid function of the controller
  getMembersById() {
    this.userSessionService.getUserById("5abd5ffa6ea4fc1294685f15").subscribe(
      //console.log(user);
     
      (response) => {
        this.member=response[0];        
        console.log("login-page response: ", response); 
        this.memberName = this.member.firstName;
        //this.email = this.member.email;
      },
      (error) => {
        console.log("Error: ", error);
      });
      console.log(this.user);
  }


}
