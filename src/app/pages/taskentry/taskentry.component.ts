import { Component, OnInit, Inject} from '@angular/core';
import { Task, workflow } from '../../classes/task';
import { TaskService } from '../../services/task.service';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-taskentry',
  templateUrl: './taskentry.component.html',
  styleUrls: ['./taskentry.component.scss']
})

export class TaskentryComponent implements OnInit {

  thinking;
  task = {subject:'', issue:'', notes:'', history:[]};
  errMess:string;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data:any,
    private popup:MatBottomSheetRef<TaskentryComponent>,
    private taskService:TaskService
  ){}

  ngOnInit():void{}

  onSubmit(){
    this.thinking = true;

    this.task.history.push({
      code:workflow(0).code, // send to first stage
      time:new Date().toISOString() // current time
    });
    this.taskService
      .create(this.task)
      .subscribe(
        value => {this.popup.dismiss(value)},
        error => this.errMess = <any>error
      );
    }

}
