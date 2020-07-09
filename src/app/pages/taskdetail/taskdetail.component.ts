import { Component, OnInit } from '@angular/core';
import { Task } from '../../classes/task';
import { TaskService } from '../../services/task.service';

import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-taskdetail',
  templateUrl: './taskdetail.component.html',
  styleUrls: ['./taskdetail.component.scss']
})
export class TaskdetailComponent implements OnInit {

    task: Task;
    errMess: string;

  constructor(
    private taskService:TaskService,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.taskService
      .getTaksz(this.route.snapshot.params.id)
      .subscribe(
        value => this.task = value,
        error => this.errMess = <any>error
      );
  }

}
