import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { NewProject, Project } from '../models/Project';

import 'rxjs/add/operator/map';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class ProjectService {

  baseURL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  public getAllProjects(): Observable<Project[]> {
    const url = `${this.baseURL}/projects`;
    return this.http.post<Project[]>(url, undefined);
  }

  public deleteProject(project: Project): Observable<any>{
    const url = `${this.baseURL}/project/delete`
    return this.http.post(url, project);
  }
  


  //----NEW---------------------------------------------
 public getProjectName(projectName: String): Observable<Project[]>{
  var projectObj={
    projectName : projectName
  } 
  console.log(projectName);

    const url = `${this.baseURL}/project/projectName`
    return this.http.post<Project[]>(url,projectObj);  //pass the data to controller
    
  }

  public getProjectById(projectId: String): Observable<any>{
    console.log("We are in service | Id: ",projectId);
    var projectIdObj={
      Id : projectId
    } 
      
      const url = `${this.baseURL}/project/id`
      return this.http.post(url,projectIdObj);  //pass the data to controller    
    }

    
//------------FINISH NEW-----------------------------------------

  public addProject(project: NewProject): Observable<NewProject> {
    const url = `${this.baseURL}/project`
    return this.http.post<NewProject>(url, project);
  }
}
