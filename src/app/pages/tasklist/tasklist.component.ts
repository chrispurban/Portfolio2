import { Component, OnInit } from '@angular/core';
//import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.scss']
})
export class TasklistComponent implements OnInit {

    tasks: string[];
    errMess: string;

  constructor(/*private taskService: TaskService*/) { }

  ngOnInit(): void {/*
    this.taskService.getTasks()
      .subscribe(tasks => this.tasks = tasks, errmess => this.errMess = <any>errmess);*/
  }

}
