import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/User';
import { UserSessionService } from './user-session.service';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class UserService {

  baseURL: String = 'https://localhost:3000';
  user: User = {
    firstName: null,
    lastName: null,
    title: null,
    email: null,
    password: null,
    __v: null,
    _id: null
  }

  constructor(
    private http: HttpClient,
    private userSessionService: UserSessionService,
    ) {}

    updateUser(userId: String): Observable<User> {
      const body = {
        'id': this.user._id,
        'firstName': this.user.firstName,
        'lastname': this.user.lastName,
        'title': this.user.title,
        'password': this.user.password
      };
      const url = `${this.baseURL}/user/update`;
      alert('updating the user\'s information!');
      return this.http.post<User>(url, body);
    }


}
