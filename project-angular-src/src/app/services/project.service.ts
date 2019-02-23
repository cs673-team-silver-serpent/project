import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { NewProject, Project } from '../models/Project';
import { UserSessionService } from './user-session.service';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/map';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()

export class ProjectService {

  baseURL: String = 'https://localhost:3000';
  sharedId: String = '000';

  constructor(private http: HttpClient,
              private userSessionService: UserSessionService) {}

  public getAllProjects(): Observable<Project[]> {
    const url = `${this.baseURL}/projects`;
    return this.http.post<Project[]>(url, undefined);
  }

  public deleteProject(project: Project): Observable<any> {
    const url = `${this.baseURL}/project/delete`;
    return this.http.post(url, project);
  }

 public getProjectName(projectName: String): Observable<Project[]> {
  const projectObj = {
    projectName : projectName
  };
    // console.log(projectName);

    const url = `${this.baseURL}/project/projectName`;
    return this.http.post<Project[]>(url, projectObj);  // pass the data to controller
  }


  public getProjectById(projectId: String): Observable<Project> {
    // console.log("We are in service | Id: ", projectId);
    this.sharedId = projectId;
    const id = {
      id : projectId
    };
      const url = `${this.baseURL}/project/id`;
      return this.http.post<Project>(url, id);  // pass the data to controller
    }

  addProject(project: Project): Observable<NewProject> {
    const url = `${this.baseURL}/project`;
    return this.http.post<NewProject>(url, project);
  }

  getProjectsByOwner() {
    const body = {
      owner: this.userSessionService.user._id
    };
    const url = `${this.baseURL}/project/projectsByOwner`;
    return this.http.post<Project[]>(url, body);
  }

  getProjectsByUser() {
    const body = {
      userId: this.userSessionService.user._id
    };
    const url = `${this.baseURL}/project/projectsByUser`;
    return this.http.post<Project[]>(url, body);
  }

  updateProject(project: Project): Observable<Project> {
    const body = {
      'id': project._id,
      'projectName': project.projectName,
      'projectDescription': project.projectDescription,
      'repositoryLink': project.repositoryLink,
      'techStack': project.techStack,
      'projectDemo': project.projectDemo,
      'labels': project.labels
    };
    const url = `${this.baseURL}/project/updateProject`;
    console.log('url: ' + url);
    return this.http.post<Project>(url, body);
  }

}
