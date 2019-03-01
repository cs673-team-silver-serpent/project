import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import project services
import { UserSessionService } from '../services/user-session.service';
import { UserService } from '../services/user.service';
// import project models
import { User } from '../models/User';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  @Output() userUpdated: EventEmitter<User> = new EventEmitter<User>();
  myUser: User;
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

    this.userService.getUserById(this.userId).subscribe (
      (response) => {
        this.myUser = response[0];
        this.myUser._id = this.userId;
      },
      (error) => console.log(error)
    );

  }

  updateUser() {
    this.userService.updateUser(this.myUser).subscribe (
      (response) => {
        this.myUser = response;
        this.userUpdated.emit(this.myUser);
        this.route.navigate(['home']);
      },
      (error) => {
        console.log(error);
      }
    );
   }


}
