import { Component, OnInit } from '@angular/core';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-display-project',
  templateUrl: './display-project.component.html',
  styleUrls: ['./display-project.component.css']
})
export class DisplayProjectComponent implements OnInit {
  projowner="";
  projname="";
  datecreated="";
  datelastmodified="";
  repolink="";
  demolink="";
  description="";

  constructor() { }

  ngOnInit() {
  }

}
