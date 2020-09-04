import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  projects = [
    {
      _id:"First",
      name:"Worksplat"
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
