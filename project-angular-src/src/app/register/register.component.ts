import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../models/User';
import { UserSessionService } from '../services/user-session.service';
import { Router } from '@angular/router';
import { FormsModule, EmailValidator } from '@angular/forms';
import { ViewChild } from '@angular/core/src/metadata/di';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  newUser: User;
  @Output() userAdded: EventEmitter<User> = new EventEmitter<User>();

  status = "";
  lengthError = true;
  x = ""; y = "";
  First = "";
  Last = "";
  Email = "";
  allCool = false;
  confirmation = "";
  errorStatus = false;
  errorMessage = "";
  success = false;
  validForm = 0;
  passLength = 0;
  isEmailValid = 0;

  constructor(private userSessionService: UserSessionService) { }
  
  ngOnInit() {
    this.pageRefresh();
    this.newUser = {
      _id: '',
      firstName: '',
      lastName: '',
      title: '',
      email: '',
      password: '',
      __v: 0,
    };


  } //page Initialization ends here

  pageRefresh() {
    this.validForm = 0;
    this.allCool = false;
    this.errorStatus = false;
    this.x = "";
    this.y = "";
    this.First = "";
    this.Last = "";
    this.Email = "";
    this.passLength = 0;
    this.isEmailValid = 0;
    this.lengthError = false;
  }
  emailError;
  showEmailError(){
    if(this.emailvalidation()!=1 && this.Email!=""){
      this.emailError=true;
    } 
  
  else this.emailError=false;
}
  
  //create new account
  onCreateNewAccount() {
    //Show Email Error
    this.showEmailError();
  
    //
    this.validForm = this.formValidation();
    if (this.allCool != true && this.validForm == 1) {
      console.log(this.newUser);

      
      this.userSessionService.addUser(this.newUser).subscribe(
        response => {
          console.log(response);
          this.userAdded.emit(this.newUser);
          this.success = true;
          this.errorMessage = "User Added Successfully";
          setTimeout(
            () => {
              this.success = false;
            }, 4000);

        });
      this.ngOnInit();
    }

    else {
      this.errorMessage = "Please check the form";
      this.errorStatus = true;
    }


  }

  //----------GET START-------------------------------------------
  getPassword1(event: Event) {
    this.x = (<HTMLInputElement>event.target).value;
    this.matchPasswords();
    if (this.x.length < 8) this.lengthError = true;
    else this.lengthError = false;
  }

  getPassword2(event: Event) {
    this.y = (<HTMLInputElement>event.target).value;
    this.matchPasswords();
  }


  
  getFName(event: Event) {

    this.First = (<HTMLInputElement>event.target).value;
  }
  getLName(event: Event) {
    this.Last = (<HTMLInputElement>event.target).value;
  }
  getEmail(event: Event) {
    this.Email = (<HTMLInputElement>event.target).value;
  }
//--------------GET END-------------------------------------------



  matchPasswords() {

    if (this.y == this.x && this.y != "" && this.x != "") {
      this.confirmation = "";
      this.allCool = false;
    }
    else
      if (this.y != "") {
        this.confirmation = "Passwords do not match ";
        this.allCool = true;
      }
  }//matchpasword_End


  //--FORM VALIDATE--------------------------------------
  formValidation() {
    this.passLength = this.y.length;

    if (this.First != "" && this.Last != "" && this.Email != ""
      && this.passLength > 7 && this.emailvalidation() == 1) {
      return 1;
    }
    else
      return 0;
  }

  

  emailvalidation() {
    var atI = this.Email.indexOf("@");
    var dotI = this.Email.indexOf(".");
    if (dotI != atI + 1
      && atI != 0 && atI != -1
      && dotI != -1) {
      return 1;      
    }

    else return 0;


  }
} 
