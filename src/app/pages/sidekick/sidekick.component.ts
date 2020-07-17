import { Component, OnInit } from '@angular/core';
import { Task } from '../../classes/task';
import { TaskService } from '../../services/task.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidekick',
  templateUrl: './sidekick.component.html',
  styleUrls: ['./sidekick.component.scss']
})
export class SidekickComponent implements OnInit {

  task = {subject:'', details:''};
  errMess:string;

  constructor(
    private taskService:TaskService,
    public auth: AuthService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.task);
    this.taskService
      .newTask(this.task)
      .subscribe(
        value => this.task = value,
        error => this.errMess = <any>error
      );
  }

}
