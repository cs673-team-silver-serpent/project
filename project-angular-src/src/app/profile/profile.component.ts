import { Component, OnInit, OnChanges } from '@angular/core';
import { UserSessionService } from '../services/user-session.service';
import { UserService } from '../services/user.service';
import { User } from '../models/User';
import { Router } from '@angular/router';
import { MatTableDataSource, MatTab } from '@angular/material';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  revisedUser: User;
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();

  constructor(private userSessionService: UserSessionService,
              private router: Router,
              private userService: UserService
              ) {}

  ngOnInit() {
    if (this.userSessionService.user) {      // Check that user object is not empty
      this.user = this.userSessionService.user;
       this.userService.getUserById(this.user._id).subscribe (
        response => {
          this.revisedUser = response[0];
          this.revisedUser._id = this.user._id;
        },
        (error) => console.log(error)
      );
    } else {
      this.user = {
        '_id': this.userSessionService.user._id,
        'firstName': 'Guest',
        'lastName': null,
        'title': null,
        'email': null,
        'password': null,
        '__v': 0,
      };
    }
  }

}


