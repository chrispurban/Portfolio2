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
      name:"Taktile",
      tech:["Angular", "MongoDB", "NodeJS", "Express", "Auth0", "Heroku"],
      desc:[
        "Task management in the style of a Kanban board, a pun on Lean's 'takt time' and the use of a grid interface.",
        "Users are encouraged to describe what weak points they've identified rather than predetermined solutions; this helps to maintain scope/objectivity and open negotiating space when multiple teams and requirements are involved.",
        "Like recursion? Drop me an email to see how this app was used in its own development!"
      ]
    }
  ];

  constructor(public view:ViewService){}

  ngOnInit():void {
    for(let n of Array(0)){
      this.projects.push(this.projects[0]);
    }
  }

}
