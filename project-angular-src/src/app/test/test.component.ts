import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { Project } from '../models/Project';
import { MatTableDataSource } from '@angular/material';
import { UserSessionService } from '../services/user-session.service';
import { User } from '../models/User';
import { Router } from '@angular/router';
import { element } from 'protractor';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})





export class TestComponent implements OnInit {
  
  
  
  constructor() { }
 
 text="Value of textbox";
 len;
  trim(){
   this.text=(document.getElementById("textBox") as HTMLInputElement).value.trim();
   
   this.len=this.text.length
  }
 



  ngOnInit() {}   

}







