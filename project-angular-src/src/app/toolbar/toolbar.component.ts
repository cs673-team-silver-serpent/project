import { Component, OnInit } from '@angular/core';
import { UserSessionService } from '../services/user-session.service';
import { User } from '../models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  user: User;
  viewLogout: Boolean = false;
  viewLogin: Boolean = false;

  constructor(
    private userSessionService: UserSessionService,
    private router: Router) { }

  ngOnInit() {
    if (this.userSessionService.user.firstName !== 'Guest') {
      this.viewLogout = true;
      this.viewLogin = false;
      this.user = this.userSessionService.user;
    } else {
      this.viewLogin = true;
      this.viewLogout = false;
      this.user = {
          '_id': '',
          'firstName': 'Guest',
          'lastName': null,
          'title': null,
          'email': null,
          'password': null,
          '__v': 0,
      };
    }
  }


  onLogout() {
    this.userSessionService.logOutUser();
    this.user = this.userSessionService.user;
    this.router.navigate(['/login']);
  }
}
