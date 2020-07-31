import { Component, OnInit } from '@angular/core';
import { Task, workflow } from '../../classes/task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.scss']
})
export class TasklistComponent implements OnInit {

    tasks: Task[];
    errMess: string;
    wf = workflow;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService
      .getTask()
      .subscribe(
        value => {this.tasks = value.map(workflow)},
        error => this.errMess = <any>error
      );
  }

}
