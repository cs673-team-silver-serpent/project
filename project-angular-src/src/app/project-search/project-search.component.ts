import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-project-search',
  templateUrl: './project-search.component.html',
  styleUrls: ['./project-search.component.css']
})
export class ProjectSearchComponent implements OnInit {

  classes = [
    {id: 'CS673', department: 'MET', name: 'Software Engineering'},
    {id: 'CS566', department: 'MET', name: 'Analysis of Algorithms'},
    {id: 'CS575', department: 'MET', name: 'Operating Systems'}
  ]
  search: String = 'test';

  constructor() { }

  ngOnInit() {
  }

  onSearch() {
    console.log("SUBMITTED", this.search);
  }

}
