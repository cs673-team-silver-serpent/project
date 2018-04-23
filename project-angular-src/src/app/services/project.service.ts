import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { NewProject, Project } from '../models/Project';
import { UserSessionService } from './user-session.service';

import 'rxjs/add/operator/map';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class ProjectService {

  baseURL = 'https://localhost:3000';

  constructor(private http: HttpClient,
              private userSessionService: UserSessionService) { }

  getAllProjects(): Observable<Project[]> {
    const url = `${this.baseURL}/projects`;
    return this.http.post<Project[]>(url, undefined);
  }

  deleteProject(project: Project): Observable<any>{
    const url = `${this.baseURL}/project/delete`
    return this.http.post(url, project);
  }

  addProject(project: Project): Observable<NewProject> {
    const url = `${this.baseURL}/project`
    return this.http.post<NewProject>(url, project);
  }

  getProjectsByOwner() {
    var body = {
      owner: this.userSessionService.user._id
    }
    console.log(body);
    const url = `${this.baseURL}/project/projectsByOwner`
    return this.http.post<Project[]>(url, body);
  }

}
