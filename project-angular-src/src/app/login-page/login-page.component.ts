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
export class LoginPageComponent {
  authInfo = {
    email: "",
    password: ""
  }
  loginError: boolean = false;
  loginValid: boolean = false;
  passwordVisibility: boolean = false;
  buttonIcon: string="visibility_off";

  constructor(private userSessionService: UserSessionService,
              private router: Router) { }

  ngOnInit() {
    console.log("login-page.component User: ", this.userSessionService.user);
  }
  
  authenticateUser() {
    this.userSessionService.authenticate(this.authInfo.email, this.authInfo.password).subscribe(
      (session: Session) => {
        if (session.userId) {
          this.userSessionService.setSession(session);
          let sessionToken = this.userSessionService.session.sessionToken;
          
          this.userSessionService.getUserBySessionToken(sessionToken).subscribe(
            (user: User) => {
              this.userSessionService.setUser(user);
              document.cookie = "user="+user;
              this.router.navigate(['/home']);
            },
            (error) => {
              console.log("login-page  userSessionService.getUserBySessionToken:", error);
          });
        } else {
          console.log("Wrong Password");
          this.loginError = true;
        }
      },
      (error) => {
        this.loginError = true;
        console.log("login-page userSessionService.authenticate error: ", error);
      });
  }

  toggleVisibility() {
    if(this.passwordVisibility==false) {
      this.passwordVisibility = true;
      this.buttonIcon="visibility"
    } else {
      this.passwordVisibility = false;
      this.buttonIcon="visibility_off";
    }
  }

  isLoginValid() {
    if (this.authInfo.email.length >= 7 && this.authInfo.password.length > 7) {
      this.loginValid = true;
    } 
  }
}
