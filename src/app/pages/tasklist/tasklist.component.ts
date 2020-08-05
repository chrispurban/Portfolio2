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

  taskDetail(task){
    let sheet = this.bottomSheet.open(TaskdetailComponent, {data:task}); // open in popup
    sheet.afterDismissed().subscribe((result)=>{
      if(result){
        result.target = this.tasks.findIndex((x)=>x._id==result.value._id); // what we're relisting
        if(result.delete){delete this.tasks[result.target]}
        else{this.tasks[result.target] = result.value}
      };
    });
  }

  taskEntry(){
    let sheet = this.bottomSheet.open(TaskentryComponent); // open in popup
    sheet.afterDismissed().subscribe(
      (result)=>{
        if(result){this.tasks.push(workflow(result))};
      }
    );
  }

}
