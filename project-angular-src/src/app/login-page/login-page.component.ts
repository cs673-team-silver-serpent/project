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
    this.router.navigate(['/home']);
  }

  /************************authenticateUser() {
   var email = 'ben@foundingfathers.com';
    var password = 'password';

    this.userSessionService.authenticate(email, password).subscribe(
      (user) => {
        console.log("login-page response: ", user); 
        this.userSessionService.logInUser(user);
        this.router.navigate(['/home']);
      },
      (error) => {
        console.log("Error: ", error);
      });                            

    //  if ( result ) {
    //    this.router.navigate(['/home']);
    //  }

  }*****************************************************************/


  //Redirect the flow to Register page
  redirect_register(){
    this.router.navigate(['/register']);
  }
}
