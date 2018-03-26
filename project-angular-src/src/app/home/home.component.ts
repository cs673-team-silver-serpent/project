import { Component, OnInit } from '@angular/core';
import { UserSessionService } from '../services/user-session.service';
import { User } from '../models/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user = this.userSessionService.user;

  constructor(private userSessionService: UserSessionService) { }

  ngOnInit() {
    console.log("home.component user: ", this.user);
  }
}
