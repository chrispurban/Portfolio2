import { Component, OnInit } from '@angular/core';
import { ViewService } from '../../services/view.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  projects = [
    {
      _id:"first",
      name:"Worksplat",
      notes:"",
      technologies:[
        "Angular",
        "MongoDB",
        "NodeJS",
        "Express",
        "Auth0",
        "Heroku"
      ],
      purpose:"Facilitates completion of tasks by emulating various features of Kanban boards, Eisenhower/Covey quadrants, and the bug-tracking system utilized by Unity Technologies. Adjustments are made to more succinctly capture the nature of a task, so that users may better negotiate competing interests before applying constraints. Effort is also made to control the splitting and joining of tasks.",
      features:"Non numquam ea odio sit et. Soluta tenetur ut at rem. Quod corrupti quo omnis est distinctio distinctio."
    }
  ];

  constructor(public view:ViewService) {

  }

  ngOnInit(): void { }

}
