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
  
  //----NEW--------------------------
 public getProjectName(projectName: String): Observable<any>{
    const url = `${this.baseURL}/project/projectName`
    return this.http.post(url, projectName);  //pass the data to controller
  }
  //-------------------------------------------

  //----NEW---return project id, search by name(project controller-getProjectId)---------------
 public getProjectId(project: Project): Observable<any>{
  const url = `${this.baseURL}/project/projectName`
  return this.http.post(url, project);
}

//-------------

//-------------


//-------------------------------------------

  public addProject(project: NewProject): Observable<NewProject> {
    const url = `${this.baseURL}/project`
    return this.http.post<NewProject>(url, project);
  }
}
