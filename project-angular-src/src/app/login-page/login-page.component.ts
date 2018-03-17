import { Component, OnInit } from '@angular/core';
import { UserSessionService } from '../services/user-session.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {

  constructor(private userSessionService: UserSessionService,
              private router: Router) { }

  ngOnInit() {
    console.log("test",this.userSessionService.user);

  }

  authenticateUser() {
    console.log("Authenticating");
    this.userSessionService.signInUser();
    console.log(this.userSessionService.user);

    this.router.navigate(['/home']);

  }

}
