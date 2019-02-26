import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import project services
import { UserSessionService } from '../services/user-session.service';
import { UserService } from '../services/user.service';
// import project models
import { User } from '../models/User';
import { MatTableDataSource } from '@angular/material';
import { projectionDef } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  user: User = {
    _id: null,
    __v: null,
    password: null,
    firstName: null,
    lastName: null,
    email: null,
    title: null
  };
  userIsAuthorized: Boolean = false;
  formIsValid: Boolean = false;
  userId: String = '';


  constructor(
    private userSessionService: UserSessionService,
    private userService: UserService,
    private activeRoute: ActivatedRoute,
    private route: Router
    ) {}

  ngOnInit() {

    if (this.userSessionService.user.firstName !== 'Guest') {
      this.userIsAuthorized = true;
    }

    this.activeRoute.queryParams.subscribe(
      (params) => {
        this.userId = params['id'];
      });

    this.userService.updateUser(this.userId).subscribe (
      (response) => {
        this.user = response[0];
        this.user._id = this.userId;
      },
      (error) => console.log(error)
    );

  }

  updateUser() {
    this.userService.updateUser(this.userId).subscribe (
      (response) => {
        this.user = response;
        // this.route.navigate(['viewProject']);
      },
      (error) => {
        console.log(error);
      }
    );
   }


}
