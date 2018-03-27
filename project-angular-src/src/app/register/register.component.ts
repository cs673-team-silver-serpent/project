import { Component, OnInit } from '@angular/core';
import { removeDebugNodeFromIndex } from '@angular/core/src/debug/debug_node';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 // private newUser;
  status = "";

 private x = "";
 private y = "";
 private btnSwitchOff = true;
 private confirmation = "";
 
 titles = [
  {value: '1', viewValue: 'Mr.'},
  {value: '2', viewValue: 'Ms.'},
  {value: '3', viewValue: 'Mrs.'}
];

  constructor() { }

  ngOnInit() {
    /*this.newUser={
      firstName:'' ,
      lastName:'' ,
      title: '',
      email: '',
      password:'' ,

    };*/

    

  };



  //create new account
  createNewAccount() {            
    //check if the email already exists in the database--------------TO DO ITEM

    //saving the user credentials

    
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

/*addUser = (request, response) => {
  let newUser = new User({
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    title: request.body.title,
    email: request.body.email,
    password: request.body.password,
    favorites: request.body.favorites,
    role: request.body.role,
  });
  newUser.save((error, user) => {
    if (error) {
      response.json({success: false, message: `Failed to create a new user. Error: ${error}`});
    } else {
      response.json({success: true, message: "User added successfully."});
    }
  });
}*/