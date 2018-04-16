import { Component, OnInit } from '@angular/core';
import { UserSessionService } from '../services/user-session.service';
import { User } from '../models/User';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  

    constructor(private userSessionService: UserSessionService,
                private router: Router) { }

  ngOnInit() {
    if(this.userSessionService.user){      //Checking if the user object is not empty
    this.user = this.userSessionService.user;
    }

    else{
      this.user = {
        _id: this.userSessionService.user._id,
      firstName: 'Guest',
      lastName: '',
      title: '',
      email: '',
      password: '',
      __v: 0,
        }

    }
  }



}
//----BACKUP---------------
/*import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user = {
    firstName: 'John', 
    lastName: 'Doe', 
    email: 'john.doe@gmail.com',
    joinDate: new Date('2018-01-14')}

  constructor() { }

  ngOnInit() {
  }

}*/