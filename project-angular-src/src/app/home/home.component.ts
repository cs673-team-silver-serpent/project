import { Component, OnInit } from '@angular/core';
import { UserSessionService } from '../services/user-session.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoggedIn: Boolean;

  constructor(private userSessionService: UserSessionService) { }

  ngOnInit() {
    console.log(this.userSessionService.user);
    if(this.userSessionService.isLoggedIn){
      this.isLoggedIn = true;
    }
  }
}