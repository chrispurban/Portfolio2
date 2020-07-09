import { Component, OnInit } from '@angular/core';
import { Task } from '../../classes/task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.scss']
})
export class TasklistComponent implements OnInit {

    tasks: Task[];
    errMess: string;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService
      .getTask()
      .subscribe(
        value => this.tasks = value,
        error => this.errMess = <any>error
      );
  }

}