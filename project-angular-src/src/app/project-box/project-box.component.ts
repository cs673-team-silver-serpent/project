import { Component, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { ProjectService } from '../services/project.service';
import { Project } from '../models/Project';
import { MatTableDataSource } from '@angular/material';
import { UserSessionService } from '../services/user-session.service';
import { User } from '../models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-box',
  templateUrl: './project-box.component.html',
  styleUrls: ['./project-box.component.css']

})
export class ProjectBoxComponent implements OnInit {

  constructor(private projectService: ProjectService, private userSessionService: UserSessionService, private router: Router) {

  }


  newProject: Project;

  projectInstanceId: String;
  ngOnInit() {
    this.showContent = false;

  }
  projectSelected() {
    console.log("Event Grasped");
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
  serviceError = false;

  showContent = false;  //toggle project content
  wait = false;  //toggle spinner

  //Getting the details of the project selected from the list
  populate() {
    this.tags = "";
    this.wait = true;
    this.showContent = false;
    this.projectService.getProjectById(this.projectService.sharedId.toString())
      .subscribe(
        (response) => {
          console.log(response);
          setTimeout(
            () => {
              this.newProject = response;
              console.log("After Timeout", this.newProject)
              this.setvalues();
              this.wait = false;
              this.showContent = true;
            }, 1500);

        },
        (error) => {
          console.log(error)
          this.wait = false;
          this.serviceError = true;
        },

        () => console.log("All data fetched| Data Stream Completed")

      )
    console.log("New Project2 :", this.newProject)
  }

  //Populating the Project Details (excluding members' names)
  tagsLength = 1;
  tags = "";
  index = 0;
  setvalues() {

    console.log("New Project3 :", this.newProject)
    this.selectedProjectName = this.newProject[this.index].projectName;
    this.selectedProjectDescription = this.newProject[this.index].projectDescription
    this.selectedProjectDateCreated = this.newProject[this.index].dateCreated
    this.selectedProjectDemo = this.newProject[this.index].projectDemo
    this.selectedProjectName = this.newProject[this.index].projectName
    this.selectedProjectRepositoryLink = this.newProject[this.index].repositoryLink
    this.selectedProjectBackEnd = this.newProject[this.index].techStack[0];
    this.selectedProjectFramework = this.newProject[this.index].techStack[1];
    this.selectedProjectFrontend = this.newProject[this.index].techStack[2];
    this.selectedProjectTestingFramework = this.newProject[this.index].techStack[3];
    this.selectedProjectVersionControlTool = this.newProject[this.index].techStack[4];
    console.log("Name", this.selectedProjectName);

    //Populating the tags
    this.tagsLength = this.newProject[0].labels.length;
    console.log("Tech Stack Length: ", this.tagsLength);

    for (var i = 0; i < this.tagsLength; i++) {
      this.tags += "#" + this.newProject[0].labels[i];
    }

    //populating the members using the method below
    this.populatemembers();
  }

  populatemembers() {

    var ownerId = this.newProject[0].owner
    console.log("owner", ownerId)
    this.getMembersById(ownerId, 101);

    for (var i = 1; i < this.newProject[this.index].projectMembers.length + 1; i++) {
      var id = (this.newProject[this.index].projectMembers[i - 1]).toString();

      this.getMembersById(id, i);
    }

  }

  member: User;
  getMembersById(id: String, sno: number) {
    this.userSessionService.getUserById(id).subscribe(
      (response) => {
        setTimeout(
          () => {
            this.member = response;
            console.log(response)
            this.setMember(sno);
          }, 500);

      },
      (error) => console.log(error),
      () => console.log("User Data Returned Successfully")
    )
  }

  projectMembers: String[] = [];

  setMember(sno: number) {
    if (sno == 101) {
      this.selectedProjectOwner = this.member[0].firstName;
      console.log("selectedProjectOwner", this.selectedProjectOwner)
    }

    if (sno != 101) {

      this.projectMembers[sno] = this.member[0].firstName;
      console.log("Members:", this.projectMembers[sno])
      this.selectedProjectMember1 = this.projectMembers[1];
      this.selectedProjectMember2 = this.projectMembers[2];
      this.selectedProjectMember3 = this.projectMembers[3];
      this.selectedProjectMember4 = this.projectMembers[4];

    }

  }






}
