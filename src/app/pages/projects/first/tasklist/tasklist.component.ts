import { Component, OnInit } from '@angular/core';
import { Task, workflow } from '../../../../classes/task';
import { TaskService } from '../../../../services/task.service';
import { MatBottomSheetRef, MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';

import { TaskentryComponent } from '../taskentry/taskentry.component';
import { TaskdetailComponent } from '../taskdetail/taskdetail.component';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.scss']
})

export class TasklistComponent implements OnInit {

    UI_now = new Date().toISOString();
    tasks:Task[];
    errorMessage: string;
    content="";

  constructor(
    private taskService:TaskService,
    private bottomSheet:MatBottomSheet,
  ) { }

  ngOnInit(): void {
    this.taskService
      .read().subscribe(
        value => {this.tasks = value.map(workflow)},
        error => this.errorMessage = <any>error
      );
    for(let i=0; i<30; i++){
      this.content = this.content.concat("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque blandit tortor et tristique sagittis. Maecenas consequat nunc vel augue tincidunt, vel blandit neque maximus. Curabitur tristique ipsum et mollis tincidunt. Praesent ut risus sit amet nulla sodales auctor. In hendrerit enim nec ex interdum, nec tincidunt eros varius. Vestibulum convallis laoreet felis quis gravida. Vivamus eu mattis tortor, quis dignissim tortor. Vivamus non vestibulum lorem. Donec diam turpis, sagittis nec tincidunt quis, congue in est. Quisque malesuada tellus at sem malesuada, interdum consectetur orci posuere. Proin sodales bibendum ligula, at varius dui semper nec. Nullam venenatis dui eget turpis sollicitudin, at malesuada tortor tempus. Proin facilisis sed dui quis ultrices. Curabitur placerat venenatis mi quis consectetur. Nunc pharetra euismod vehicula. ")
    }
  }

  taskDetail(task){
    this.bottomSheet
      .open(TaskdetailComponent, {data:task}) // open in popup
      .afterDismissed().subscribe((result)=>{
        if(result){
          result.target = this.tasks.findIndex((x)=>x._id==result.value._id); // what's relisted
          if(result.delete){this.tasks.splice(result.target, 1);}
          else{this.tasks[result.target] = result.value}
        };
      });
  }

  taskEntry(){
    this.bottomSheet
      .open(TaskentryComponent) // open in popup
      .afterDismissed().subscribe((result)=>{
        if(result){this.tasks.push(workflow(result))}; // add to current list
      });
  }

}
