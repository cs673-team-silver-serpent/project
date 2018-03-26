import { Component, OnInit } from '@angular/core';
//import {MatFormFieldModule} from '@angular/material/form-field';
//import {MatInputModule} from '@angular/material/input';
//import {MatButtonModule} from '@angular/material/button';
// import { Router } from '@angular/router';
// import { UserSessionService } from '../services/user-session.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  status="";
  constructor() { }

  ngOnInit() {
    
  };

  //create new account
  /*createNewAccount(){
    
    /*check if the username already exist
    validate the data...show error messages if any
    
    if(all is well){
      1. save the user details
      2. redirect to login page for user to login using new credentials
    }
*/

createNewAccount(){    
  }

}
