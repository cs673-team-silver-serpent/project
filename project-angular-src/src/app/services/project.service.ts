import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Project } from '../models/Project';

import 'rxjs/add/operator/map';


@Injectable()
export class ProjectService {

  constructor(private http: Http) { }
  private serverApi = 'http://localhost:3000';

  public getAllProjects(): Observable<Project[]> {
    const URI = `${this.serverApi}/`;
    return this.http.get(URI)
      .map(response => response.json())
      .map(response => <Project[]>response.projects);
  }

  public deleteProject(projectId: string) {
    const URI = `${this.serverApi}/${projectId}`;
    const headers = new Headers;
    headers.append('Content-Type', 'application/json');
    return this.http.delete(URI, {headers})
       .map(response => response.json());
  }

  public addProject(project: Project) {
    const URI = `${this.serverApi}/`;
    const headers = new Headers;
    const body = JSON.stringify({projectName: project.projectName, projectDescription: project.projectDescription,
      repositoryLink: project.repositoryLink});
    headers.append('Content-type', 'application/json');
    return this.http.post(URI, body, {headers: headers}).map(response => response.json);
  }

}
