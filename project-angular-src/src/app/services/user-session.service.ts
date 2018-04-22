import { Injectable } from '@angular/core';
import { User, Roles } from '../models/User';
import { Session } from '../models/Session';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserSessionService {
  session: Session;
  baseURL = 'https://localhost:3000';
  user: User = {
    _id: '',
    firstName: 'Guest',
    lastName: '',
    title: '',
    email: '',
    password: '',
    __v: 0
  }


  constructor(private http: HttpClient) { }

  // Sends Username and password and expects a SessionToken to be returned
  authenticate(email: String, password: String): Observable<any> {
    var userAuth = {
      email: email,
      password: password
    }
    return this.http.post(`${this.baseURL}/user/auth`, userAuth);
  }

  logInUser(user: User) {
    this.user = user;
  }

  logOutUser() {
    this.user = undefined;
  }

  setSession( session: Session) {
    this.session = session;
  }

  getUser(): User {
    return this.user;
  }

  setUser(user:User) {
    this.user = user;
  }

  getSession(): Session {
    return this.session;
  }

  isUserProfilePopulated(): boolean {
    if (this.user) {
      return true;
    } else {
      return false;
    }
  }

  getUserBySessionToken(sessionToken: string) {
    var body = {
      sessionToken: sessionToken 
    };
    return this.http.post(`${this.baseURL}/session/getUserBySession/`, body)
  }

  clearUserProfile(): void {
    this.user = undefined;
  }

  public addUser(user: User) {
    return this.http.post(`${this.baseURL}/user`, user);
  }
}


