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
    const url = `${this.baseURL}/view`;
    return this.http.get<Project[]>(url);
  }

  // public deleteProject(projectId: string) {
  //   const URI = `${this.serverApi}/${projectId}`;
  //   const headers = new Headers;
  //   headers.append('Content-Type', 'application/json');
  //   return this.http.delete(URI, {headers})
  //      .map(response => response.json());
  // }

  public deleteProject(projectID: string): Observable<any>{
    const url = `${this.baseURL}/delete/${projectID}`
    return this.http.delete(url);
  }

  public addProject(project: NewProject): Observable<NewProject> {
    const url = `${this.baseURL}/add`
    return this.http.post<NewProject>(url, project, httpOptions);
  }

}
