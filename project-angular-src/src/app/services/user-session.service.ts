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

  /*addUser(user: User) {
    return this.http.post(`${this.baseURL}/user`, user);
  }*/

  public addUser(user: User) {
    return this.http.post(`${this.baseURL}/user`, user);
    //return this.http.post(`${this.baseURL}/user`, user);
  }


  // public getProjectById(projectId: String): Observable<Project>{
  //   console.log("We are in service | Id: ",projectId);
  //   var id={
  //     id : projectId
  //   } 
  //     const url = `${this.baseURL}/project/id`
  //     return this.http.post<Project>(url,id);  //pass the data to controller    
  //   }
public getUserById(userId: String): Observable<User>{
console.log("This user Id is sent: ",userId)
  var id={
    id: userId
  }
  const url = `${this.baseURL}/user/id`
  return this.http.post<User>(url, id);
}


  /*showall users
  showAllUsers(user: User){
    return this.http.get(`${this.baseURL}/user`, user);

  }*/
}


