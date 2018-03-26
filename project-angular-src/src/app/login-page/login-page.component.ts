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


    /*
    1. Check is username is valid (present in the database)
    2. If 1 is true, user enters password
    3. Verify the password and provide access token
    4. Create session with a timeout (ask the team about cookies security)
    5.

    */ 

    /*myvar=false;
   setTimeout(()=>{
     this.myvar=true;
   },2000);*/

    console.log("Authenticating");
    this.userSessionService.signInUser();
    console.log(this.userSessionService.user);

    this.router.navigate(['/home']);

  }

  redirect_register(){
    this.router.navigate(['/register'])
  }


  loginwithGoogle(){
    
  }

}
