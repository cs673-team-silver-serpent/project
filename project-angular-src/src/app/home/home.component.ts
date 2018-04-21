import { Component, OnInit } from '@angular/core';
import { UserSessionService } from '../services/user-session.service';
import { User } from '../models/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private userSessionService: UserSessionService) { }
}
