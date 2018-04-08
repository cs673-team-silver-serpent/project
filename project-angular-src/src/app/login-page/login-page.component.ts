import { Component, OnInit } from '@angular/core';
import { UserSessionService } from '../services/user-session.service';
import { User } from '../models/User';
import { Router } from '@angular/router';
import { Session } from '../models/Session';


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
  loginError: boolean = false;
  passwordVisibility: boolean = false;
  buttonicon: string="visibility_off";

  constructor(private userSessionService: UserSessionService,
              private router: Router) { }

  ngOnInit() {
  }
  


  // authenticateUser() {
  //   // var email = 'ben@foundingfathers.com';
  //   // var password = 'password';

  //   this.userSessionService.authenticate(this.authInfo.userName, this.authInfo.password).subscribe(
  //     (user) => {
  //       console.log("login-page response: ", user.firstName);
  //       if (user.firstName) {
  //         this.userSessionService.logInUser(user);
  //         this.router.navigate(['/home']);
  //         this.loginError = false;
  //       } else {
  //         console.log("Wrong Password");
  //         this.loginError = true;
  //       }
  //     },
  //     (error) => {
  //       console.log("Error: ", error);
  //     });
  // }

  authenticateUser() {
    this.userSessionService.authenticate(this.authInfo.userName, this.authInfo.password).subscribe(
      (session: Session) => {
        if (session.userId) {
          this.userSessionService.setSession(session);
          let sessionToken = this.userSessionService.getSession().sessionToken;
          
          this.userSessionService.getUserBySessionToken(sessionToken).subscribe(
            (user: User) => {
              console.log("login-page  authenticateUser  user:", user);
              this.userSessionService.setUser(user);
              this.router.navigate(['/home']);
            },
            (error) => {
              console.log("login-page  authenticateUser  error:", error);
          });
        } else {
          console.log("Wrong Password");
          this.loginError = true;
        }
      },
      (error) => {
        console.log("login-page.authenticateUser error: ", error);
      });
  }

  toggleVisibility() {
    if(this.passwordVisibility==false)
    {
      this.passwordVisibility = true;
      this.buttonicon="visibility"
      
    }
    else
    {
    this.passwordVisibility = false;
    this.buttonicon="visibility_off";
  }

  }
}
