import { Component, OnInit } from '@angular/core';
import { removeDebugNodeFromIndex } from '@angular/core/src/debug/debug_node';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  status = "";

 private x = "";
 private y = "";
 private btnSwitchOff = true;
 private confirmation = "";


  constructor() { }

  ngOnInit() {

  };

  //create new account

  createNewAccount() {            
    //check if the email already exists in the database--------------TO DO ITEM

    //saving the user credentials
    var user:User;

    this.userSessionService.addUser(user).subscribe(
      (response) => {
        console.log("USER has been created", response);
        this.router.navigate(['/login'])
      },
      (error) => {
        console.log("Error", error)
      }
    )

    
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
      document.getElementById('passwordStatus').style.color = "green";
      this.btnSwitchOff = false;
    }
    else
      if (this.y != "") {
        this.confirmation = "Passwords do not match ";
        document.getElementById('passwordStatus').style.color = "red";
        this.btnSwitchOff = true;
      }

  }

}

