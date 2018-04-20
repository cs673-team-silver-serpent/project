import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { Project } from '../models/Project';
import { MatTableDataSource } from '@angular/material';
import { UserSessionService } from '../services/user-session.service';
import { User } from '../models/User';
import { Router } from '@angular/router';
import { element } from 'protractor';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})




// project: projec
// project= new Project[]
//   projectName:searchName
// });
export class TestComponent implements OnInit {
  
  



 
  
  //Show just one project
  user :User;
  constructor(private projectService: ProjectService, private userSessionService: UserSessionService, private router: Router) { }
 // private displayedProject: NewProject;
 projects: Project[] = [];
 displayedColumns = ['projectName', 'select'];
 dataSource = new MatTableDataSource<Project>(this.projects);
  
 ownerName='Default';
 //projectName='Default';
 projectDescription='Default';
 repoLink='Default';
 demoLink='Default';



  ngOnInit() {
if(this.userSessionService.user)
{
  this.user= this.userSessionService.user;
}
else
{
  this.user = {
    _id: 0,
  firstName: 'Guest',
  lastName: '',
  title: '',
  email: '',
  password: '',
  __v: 0,
    }

}


/*this.projects[]=
{
  dateCreated: Date.now(),
  projectName: "",
  projectDescription: "",
  repositoryLink: "",
  techStack: [],
   projectDemo: "",
  labels: [],
  __v: 0
}*/
    /*this.displayedProject = {
      owner: '',
      projectName: '',
      projectDescription: '',
      projectMembers: '',
      techStack: [],
      repositoryLink: '',
      projectDemo: '',
      labels: []*/
    };  /*********************************d*/

    btnStatus=0;
    onBtnClick(){
this.btnStatus+=1;
    }

   abc='1234';
   searchName="ver";

    getProject(){
    //  this.searchName=document.getElementById("nameTextQuery") ///work on this part
      this.projectService.getProjectName(this.searchName).subscribe(
        response=>{  
          console.log(response);
          this.projects=response;
          this.dataSource = new MatTableDataSource<Project>(this.projects);
         
        }
      )
    }

    selectProject(element){
      
    }
 

}
