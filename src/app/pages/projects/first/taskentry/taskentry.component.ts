import { Component, OnInit, Inject} from '@angular/core';
import { Task, workflow } from '../../../../classes/task';
import { TaskService } from '../../../../services/task.service';
//import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-taskentry',
  templateUrl: './taskentry.component.html',
  styleUrls: ['./taskentry.component.scss']
})

export class TaskentryComponent implements OnInit {

  thinkingUI = false;
  task = {subject:'', issue:'', notes:'', deadline:'', history:[]};
  errMess:string;
  today = new Date();

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data:any,
    private popup:MatBottomSheetRef<TaskentryComponent>,
    private taskService:TaskService
  ){}

  ngOnInit():void{}

  onSubmit(){
    this.thinkingUI = true;
    this.task.history.push({
      id:workflow(0).id, // send to first stage
      time:new Date().toISOString() // current time
    });
    this.taskService
      .create(this.task).subscribe(
        value => {this.popup.dismiss(value)},
        error => this.errMess = <any>error
      );
    }

}
