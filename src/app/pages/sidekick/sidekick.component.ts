import { Component, OnInit } from '@angular/core';
import { Task, workflow } from '../../classes/task';
import { TaskService } from '../../services/task.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidekick',
  templateUrl: './sidekick.component.html',
  styleUrls: ['./sidekick.component.scss']
})
export class SidekickComponent implements OnInit {

  submission: {};
  task = {subject:'', issue:'', history:[]};
  errMess:string;

  constructor(
    private taskService:TaskService,
    public auth: AuthService
  ) { }

  ngOnInit():void{}

  create(){
    this.task.history.push({code:workflow(0).code, time:new Date().toISOString()});
    this.submission = this.task;
    this.taskService
      .newTask(this.submission)
      .subscribe(
        value => {
          this.submission = value,
          this.task.subject = '';
          this.task.issue = '';
        },
        error => this.errMess = <any>error
      );
/*
*/
  }

}
