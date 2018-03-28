import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { User } from '../models/User';
import { UserSessionService } from '../services/user-session.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ViewChild } from '@angular/core/src/metadata/di';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  private newUser: User;
  

  status = "";

 private x = "";
 private y = "";
 private allCool = false;
 private confirmation = "";
 errorStatus=false;
 errorMessage="";
 success=false;
 
 
 titles = [
  {value: 'Mr.', viewValue: 'Mr.'},
  {value: 'Ms.', viewValue: 'Ms.'},
  {value: 'Mrs.', viewValue: 'Mrs.'}
];

  constructor(private userSessionService: UserSessionService) { }
  @Output() userAdded: EventEmitter<User> = new EventEmitter<User>();
  ngOnInit() {
    this.allCool = false;
    this.errorStatus=false;
    this.newUser = {
      _id:0,
      firstName: '',
      lastName:'',
      title:'',
      email: '',
      password: '',
      __v:0,
      }; 
      

} //page Initialization ends here


  //create new account
onCreateNewAccount() {

  if(this.allCool!=true){
    console.log(this.newUser);
      //---------------------------
      this.userSessionService.addUser(this.newUser).subscribe(
        response => {
          console.log(response);
          this.userAdded.emit(this.newUser);
      //--------------------------
          this.ngOnInit();
          this.success=true;
      });

  }

  else
  {
    this.newUser = {
      _id:0,
      firstName: 'name',
      lastName:'lname',
      title:'tit',
      email: 'email',
      password:'pass',
      __v:0,
      }; 
      
    this.errorMessage="Please Check the form";
    this.errorStatus=true;
  }

     
}
 
  


  getPassword1(event: Event) {
    this.x = (<HTMLInputElement>event.target).value;
    this.matchPasswords();
  }

  getPassword2(event: Event) {
    this.y = (<HTMLInputElement>event.target).value;
    this.matchPasswords();
  }

  matchPasswords() {

    if (this.y == this.x && this.y != "" && this.x != "") {
      this.confirmation = "";      
      this.allCool=false;
    }
    else
      if (this.y != "") {
        this.confirmation = "Passwords do not match ";
        this.allCool = true;
      }

  }//matchpasword_End

}//class end
