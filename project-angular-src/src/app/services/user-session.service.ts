import { Injectable } from '@angular/core';
import { User, Roles } from '../models/User';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserSessionService {
  user: User;
  baseURL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  authenticate(email: String, password: String): Observable<any> {
    var userAuth = {
      email: email,
      password: password
    };
    
    return this.http.post(`${this.baseURL}/user/auth`, userAuth);
    }

  logInUser(user: User) {
    this.user = user;
  }

  logOutUser() {
    this.user = undefined;
  }


}
