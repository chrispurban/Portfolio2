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

    task:Task;
    errMess:string;
    wf = workflow;

  constructor(
    private taskService:TaskService,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.taskService
      .getTask(this.route.snapshot.params.id)
      .subscribe(
        value => {this.task = value, workflow(this.task)},
        error => this.errMess = <any>error
      );
  }

  snap() {
    console.log("gottem");
    this.wf(this.task);
  }

}
