import { Component, OnInit } from '@angular/core';
import { UserSessionService } from '../services/user-session.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  authInfo = {
    userName: "",
    password: ""
  }

  constructor(private userSessionService: UserSessionService,
              private router: Router) { }

  ngOnInit() {
  }

  authenticateUser() {
    // var email = 'ben@foundingfathers.com';
    // var password = 'password';

    this.userSessionService.authenticate(this.authInfo.userName, this.authInfo.password).subscribe(
      (user) => {
          console.log("login-page response: ", user.firstName);
          if (user.firstName) {
          this.userSessionService.logInUser(user);
          this.router.navigate(['/home']);
          } else {
            console.log("Wrong Password");
          }
      },
      (error) => {
        console.log("Error: ", error);
      });
  }


  //Redirect the flow to Register page
  redirect_register(){
    this.router.navigate(['/register']);
  }
}
