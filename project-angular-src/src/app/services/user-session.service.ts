import { Injectable } from '@angular/core';
import { User, Roles } from '../models/User';


@Injectable()
export class UserSessionService {
  user: User;
  userToken: String;

  constructor() { }

  // Signs the user in and updates the service
  signInUser() {
    var andy: User = {
      firstName: 'Andy',
      middleName: 'J',
      lastName: 'OConnell',
      title: 'titleStudent',
      email: 'aoconnel@bu.edu',
      role: Roles.user,
    }
    this.user = andy;
    this.userToken = '1234kjh457ljhkg5436mn23456j2hg';
  }

  signOutUser() {
    this.user = null;
    this.userToken = null;
  }


}
