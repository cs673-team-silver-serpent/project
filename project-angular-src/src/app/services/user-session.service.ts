import { Injectable } from '@angular/core';
import { User, Roles } from '../models/User';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class UserSessionService {
  user: User;
  isLoggedIn: Boolean= false;
  userToken: String;
  baseURL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  signInUser(email: String, passwordHash: String): Observable<any> {
    var userAuth = {
      email: email,
      password: passwordHash
    };
    return this.http.get(`${this.baseURL}/`)
    //send email and password hash to check if correct

    // succ will either get success with user and session 
    // fail will get an error
  }

  signOutUser() {
  }

  hashPassword(password: String): String {
    //Some funtions that does the hash and return it
    return '5E884898DA28047151D0E56F8DC6292773603D0D6AABBDD62A11EF721D1542D8';
  }
}
