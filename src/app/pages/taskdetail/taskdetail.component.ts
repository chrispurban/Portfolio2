import { Component, OnInit } from '@angular/core';
import { Task, workflow } from '../../classes/task';
import { TaskService } from '../../services/task.service';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-taskdetail',
  templateUrl: './taskdetail.component.html',
  styleUrls: ['./taskdetail.component.scss']
})

export class TaskdetailComponent implements OnInit {

    task:any;
    errMess:string;
    wf = workflow;

  constructor(
    private taskService:TaskService,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.reload();
  }

  reload(){
    this.taskService
      .getTask(this.route.snapshot.params.id)
      .subscribe(
        value => {this.task = value, workflow(this.task)},
        error => this.errMess = <any>error
      );
  }

  transition(x){
    this.taskService
    .modTask(this.task._id, {code:workflow(this.task.state.phase + x).code})
    .subscribe(value => value);
  }

}
