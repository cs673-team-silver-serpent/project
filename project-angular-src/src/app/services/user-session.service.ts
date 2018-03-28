import { Injectable } from '@angular/core';
import { User, Roles } from '../models/User';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

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

  /*addUser(user: User) {
    return this.http.post(`${this.baseURL}/user`, user);
  }*/

  public addUser(user: User) {
    return this.http.post(`${this.baseURL}/user`, user);
    //return this.http.post(`${this.baseURL}/user`, user);
  }


  /*showall users
  showAllUsers(user: User){
    return this.http.get(`${this.baseURL}/user`, user);

  }*/
}


