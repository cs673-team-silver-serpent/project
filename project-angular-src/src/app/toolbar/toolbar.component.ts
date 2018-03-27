import { Component, OnInit } from '@angular/core';
import { UserSessionService } from '../services/user-session.service';
import { User } from '../models/User';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  user: User;

  constructor(private userSessionService: UserSessionService) { }

  ngOnInit() {
    this.user = this.userSessionService.user;
  }

  onLogout() {
    this.userSessionService.logOutUser();
    this.user = this.userSessionService.user;
  }
}
