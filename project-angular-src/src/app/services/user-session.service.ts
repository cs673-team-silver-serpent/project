import { Injectable } from '@angular/core';
import { User, Roles } from '../models/User';


@Injectable()
export class UserSessionService {
  user: User;
  isLoggedIn: Boolean= false;
  userToken: String;

  //password: String;

  constructor() { }

  // Signs the user in and updates the service
  signInUser() {


    // submitted an email and password

    // hash the password

    // auth with backend user session service
      // back end will check to see that the hash of submitted is the same 
      //get a token back (based off of hash of password)
    // store that token in this.userToken

    var andy: User = {
      firstName: 'Andy',
      lastName: 'OConnell',
      title: 'titleStudent',
      email: 'aoconnel@bu.edu',
      role: Roles.user,
    }
    this.user = andy;
    this.userToken = '1234kjh457ljhkg5436mn23456j2hg';
    //this.password = this.hashPassword("Very Secure Password")  //Post Hashed Password
    
    // after getting a token from express
    this.isLoggedIn = true;
  }


  hashPassword(password: String): String {
    //Some funtions that does the hash and return it
    return 'ThisIsThePostPasswordHashThatWillBeStoredInMongo';
  }

  signOutUser() {
    //sign out user from express

    //clear the user information
    this.user = null;
    this.userToken = null;

    
  }
}
