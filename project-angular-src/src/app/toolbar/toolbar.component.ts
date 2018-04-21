import { Component, OnInit } from '@angular/core';
import { UserSessionService } from '../services/user-session.service';
import { User } from '../models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  user: User;

  constructor(private userSessionService: UserSessionService,private router: Router) { }
  viewLogout=false;
  viewLogin=true;

  ngOnInit() {
    if(this.userSessionService.user){
      this.viewLogout=true;
      this.viewLogin=false;
      this.user = this.userSessionService.user;
    }
    
    else{
      
     this.user = {
        _id: 0,
      firstName: 'Guest',
      lastName: '',
      title: '',
      email: '',
      password: '',
      __v: 0,
     }

    }
    
  }
  

  onLogout() {
    this.userSessionService.logOutUser();
    this.user = this.userSessionService.user;
    this.router.navigate(['/login']);
  }
}
