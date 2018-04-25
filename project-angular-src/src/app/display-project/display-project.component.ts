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



x:number=0;
  ngOnInit() {
    

  }

  
  

  searchName;
  showError = false;
  showProjectList = false;
  showProjectContent = false;
  noMatch = false;
  errorMessage = "Please Enter The Search Keywords";


  getProject() {
    this.showProjectContent = false;
    this.searchName = (document.getElementById("x") as HTMLInputElement).value.trim();
    if (this.searchName.length == 0) {
      this.showProjectContent = false;
      this.showError = true;
      this.showProjectList = false;

    }
    else {
      this.showError = false;
      console.log("Text box value: ", this.searchName)
      //  this.searchName=document.getElementById("nameTextQuery") ///work on this part
      this.projectService.getProjectName(this.searchName).subscribe(
        response => {
          console.log(response);
          this.projects = response;
          if (this.projects.length != 0) {
            this.dataSource = new MatTableDataSource<Project>(this.projects);
            this.showProjectList = true;
            this.noMatch = false;
            //this.noMatch = false;
          }
          else {
            this.showProjectList = false;
            this.showProjectContent = false;
            this.noMatch = true;
            console.log("Nothing found")
          }
        }
      )
    }

  }

  //Initial Values
  selectedProjectName;
  selectedProjectId;
  selectedProjectDescription = "Not Available";
  selectedProjectDateCreated;
  selectedProjectOwner;
  selectedProjectDemo = "Not Available";
  selectedProjectRepositoryLink = "Not Available";
  selectedProjectBackEnd = "Not Available";
  selectedProjectFrontend = "Not Available";
  selectedProjectFramework = "Not Available";
  selectedProjectTestingFramework = "Not Available";
  selectedProjectVersionControlTool = "Not Available";
  selectedProjectMember0;
  selectedProjectMember1;
  selectedProjectMember2;
  selectedProjectMember3;
  selectedProjectMember4;
  selectedProjectMember5;

  selectedProjectMember: any[]=[];


  selectProject(project: Project) {
    this.showProjectContent = true;
    var searchProject = project.projectName;
    index = 0;
    var index = this.projects.findIndex(x => x.projectName === searchProject)
    console.log("Project Selected: ", project.projectName, "ID: ", project._id, "Index:", index)
    this.selectedProjectName = this.projects[index].projectName;
    this.selectedProjectId = this.projects[index]._id;
    //this.tech=this.projects[index].techStack[1];
    console.log("Clicked Project: ", this.selectedProjectName);
    this.showClickedProject();
  }

  newProject: Project;
tagsLength=111;
projcetLabeles:any[];
tags="";

  showClickedProject() {
    this.tags="";
    //console.log("We are in showClickedProject() method||Project To Show: ",this.selectedProjectName,"Id: ",this.selectedProjectId);
    this.projectService.getProjectById(this.selectedProjectId).subscribe(
      response => {
        this.newProject = response;
        console.log("Response of Show Project", response);
        this.tagsLength=this.newProject[0].labels.length;
        console.log("Tech Stack Length: ", this.tagsLength);

        for(var i=0;i<this.tagsLength;i++)
        {
          this.tags+="#"+this.newProject[0].labels[i];
          console.log("Tags++",this.tags)
        }
        
        //console.log("Project Name: ",this.newProject[0].projectName)
        var iniIndex = 0;
        this.selectedProjectName = this.newProject[iniIndex].projectName
        this.selectedProjectDescription = this.newProject[iniIndex].projectDescription
        this.selectedProjectDateCreated = this.newProject[iniIndex].dateCreated
        this.selectedProjectDemo = this.newProject[iniIndex].projectDemo
        this.selectedProjectName = this.newProject[iniIndex].projectName
        this.selectedProjectRepositoryLink = this.newProject[iniIndex].repositoryLink
        this.selectedProjectBackEnd = this.newProject[iniIndex].techStack[0];
        this.selectedProjectFramework = this.newProject[iniIndex].techStack[1];
        this.selectedProjectFrontend = this.newProject[iniIndex].techStack[2];
        this.selectedProjectTestingFramework = this.newProject[iniIndex].techStack[3];
        this.selectedProjectVersionControlTool = this.newProject[iniIndex].techStack[4];

        var ownerId;
        ownerId=this.newProject[iniIndex].owner
        this.getMembersById(ownerId,101);
        
        for (var i=0;i<4;i++){
        var id = (this.newProject[iniIndex].projectMembers[i]).toString();
        this.selectedProjectMember[1]=this.getMembersById(id,i);
        //console.log("chad",this.selectedProjectMember[i]);
        }
      }
    )
  }

  member: User;
  email;
  //Conditional Get, Ticket dependents[owner, else]
  getMembersById(id,sno) {
    var iniIndex = 0;
    if(sno==101)
    {
      this.userSessionService.getUserById(id).subscribe(
        (response) => {
          this.member = response[0];
          this.selectedProjectOwner=this.member.firstName;
          console.log("This is owner:",this.selectedProjectOwner);
    },
    (error) => {
      console.log("Error: ", error);
  })
  console.log("Run Mode: Members")
}
    
    else {
    
    this.userSessionService.getUserById(id).subscribe(
      (response) => {
        this.member = response[0];
        // console.log("login-page response: ", response);
        // console.log("Name", this.member.firstName);
        this.selectedProjectMember[sno+1]=this.member.firstName;
        console.log("selected Project Member: ", this.selectedProjectMember[sno+1]);

        this.selectedProjectMember1=this.selectedProjectMember[1];
        this.selectedProjectMember2=this.selectedProjectMember[2];
        this.selectedProjectMember3=this.selectedProjectMember[3];
        this.selectedProjectMember4=this.selectedProjectMember[4];
        console.log("Only users mode ran this time")
        
      },
      (error) => {
        console.log("Error: ", error);
  });
}
    console.log(this.user);
  }


}
