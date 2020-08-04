import { Component, OnInit } from '@angular/core';
import { Task, workflow } from '../../classes/task';
import { TaskService } from '../../services/task.service';

import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { TaskentryComponent } from '../taskentry/taskentry.component';
import { TaskdetailComponent } from '../taskdetail/taskdetail.component';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.scss']
})
export class TasklistComponent implements OnInit {

    tasks: Task[];
    errMess: string;
    wf = workflow;

  constructor(
    private taskService:TaskService,
    private bottomSheet:MatBottomSheet
  ) { }

  ngOnInit(): void {
    this.taskService
      .getTask()
      .subscribe(
        value => {this.tasks = value.map(workflow)},
        error => this.errMess = <any>error
      );
  }

  taskDetail(x){
    let sheet = this.bottomSheet.open(TaskdetailComponent, {data:x});
    sheet.afterDismissed().subscribe((hot)=>{
      if(hot){this.tasks[this.tasks.findIndex((icy)=>icy._id==hot._id)] = hot;}
    });
  }

  taskEntry(){
    let sheet = this.bottomSheet.open(TaskentryComponent);
    sheet.afterDismissed().subscribe(
      (hot)=>{
        if(hot){this.tasks.push(workflow(hot))};
      }
    );
  }

}
