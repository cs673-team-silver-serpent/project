import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user = {
    firstName: 'John', 
    lastName: 'Doe', 
    email: 'john.doe@gmail.com',
    joinDate: new Date('2018-01-14')}

  constructor() { }

  ngOnInit() {
  }

}
