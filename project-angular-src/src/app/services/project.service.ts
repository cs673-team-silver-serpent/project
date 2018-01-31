import { Injectable } from '@angular/core';
import { Http,Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Project } from '../models/Project';

import 'rxjs/add/operator/map';


@Injectable()
export class ProjectService {

  constructor(private http: Http) { }
  private serverApi = 'http://localhost:3000';

  public getAllProjects():Observable<Project[]> {
    let URI = `${this.serverApi}/`;
    return this.http.get(URI)
      .map(response => response.json())
      .map(response => <Project[]>response.projects);
  }

  public deleteProject(projectId: string) {
    let URI = `${this.serverApi}/${projectId}`;
    let headers = new Headers;
    headers.append('Content-Type','application/json');
    return this.http.delete(URI, {headers})
       .map(response => response.json());
  }

  public addProject(project: Project) {
    let URI = `${this.serverApi}/`;
    let headers = new Headers;
    let body = JSON.stringify({title: project.title, description: project.description});
    headers.append('Content-type','application/json');
    return this.http.post(URI,body,{headers:headers}).map(response => response.json);
  }

}
