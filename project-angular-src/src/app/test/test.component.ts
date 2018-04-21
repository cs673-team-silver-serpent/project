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
  
  // @Output() projectAdded: EventEmitter<Project> = new EventEmitter<Project>();
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
    }; 

    btnStatus=0;
    onBtnClick(){
this.btnStatus+=1;
    }

   abc='none';
   searchName="pro";


    getProject(){
    //  this.searchName=document.getElementById("nameTextQuery") ///work on this part
      this.projectService.getProjectName(this.searchName).subscribe(
        response=>{  
          console.log(response);
          this.projects=response;
          this.dataSource = new MatTableDataSource<Project>(this.projects);
          // this.abc=response.length;
          this.abc=this.projects[1].projectName;
          
         
        }
      )
    }
    selectedProjectName;
    selectedProjectId;
    selectProject(project: Project){
      var searchProject = project.projectName;
      index=0;
var index = this.projects.findIndex(x=>x.projectName === searchProject)
      //console.log("Project Selected: ", project.projectName, "ID: ", project._id,"SNO:",index)
     this.selectedProjectName=this.projects[index].projectName;
     this.selectedProjectId=this.projects[index]._id;
      //console.log("Clicked Project: ", this.selectedProject);   
      this.showClickedProject();
    }
 
newProject: Project;

    showClickedProject(){
      console.log("We are in showClickedProject() method||Project To Show: ",this.selectedProjectName,"Id: ",this.selectedProjectId);
      this.projectService.getProjectById(this.selectedProjectId).subscribe(
        response=>{
          //console.log("Response",response);
          console.log("Response of Show Project",response);
          
        }
      )



    }






}
