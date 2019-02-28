import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/User';
import { UserSessionService } from './user-session.service';
import 'rxjs/add/operator/map';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class UserService {

  baseURL: String = 'https://localhost:3000';

  constructor(
    private http: HttpClient,
    private userSessionService: UserSessionService,
    ) {}

    public getUserById(userId: String): Observable<User> {
      const id = {
        id: userId
      };
      const url = `${this.baseURL}/user/id`;
      return this.http.post<User>(url, id);
    }


    public updateUser(user: User): Observable<User> {
      const body = {
        'id': user._id,
        'firstName': user.firstName,
        'lastName': user.lastName,
        'email': user.email,
        'title': user.title,
        'password': user.password
      };
      const url = `${this.baseURL}/user/update`;
      return this.http.post<User>(url, body);
    }


}
