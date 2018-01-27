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
    let URI = `${this.serverApi}/portal/`;
    return this.http.get(URI)
      .map(response => response.json())
      .map(response => <Project[]>response.lists);
  }

  public deleteProject(projectId: string) {
    let URI = `${this.serverApi}/portal/${projectId}`;
    let headers = new Headers;
    headers.append('Content-Type','application/json');
    return this.http.delete(URI, {headers})
       .map(response => response.json());
  }

}
