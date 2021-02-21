import { Component, OnInit } from '@angular/core';
import { TaskentryComponent } from '../taskentry/taskentry.component';
import { TaskdetailComponent } from '../taskdetail/taskdetail.component';
import { TaskboardComponent } from '../taskboard/taskboard.component';
import { PolicyComponent } from '../../../policy/policy.component';

import { Board, Task, workflow } from '../../../../classes/task';

import { MatBottomSheetRef, MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { TaskService } from '../../../../services/task.service';
import { AuthService } from '../../../../services/auth.service';
import { ViewService } from '../../../../services/view.service';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.scss']
})

export class TasklistComponent implements OnInit {

    UI_now = new Date().toISOString();
    boards:Board[];
    tasks:Task[];
    errorMessage: string;
    board:Board;

  constructor(
    private taskService:TaskService,
    private bottomSheet:MatBottomSheet,
    private popup:MatDialog,
    public auth:AuthService,
    public view:ViewService
  ) { }

  ngOnInit(): void {
    this.taskService
      .read().subscribe(
        value => {this.tasks = value.map(workflow)},
        error => this.errorMessage = <any>error
      );
    this.taskService
      .getBoards().subscribe(
        value => {this.boards = value},
        error => this.errorMessage = <any>error
      );
  }

  /*
you get the boards based on user account
what to do about no board?
take the first board selected and then do the second query

  */

  showPolicy(){
    let dialogueConfig = new MatDialogConfig();
    dialogueConfig.disableClose = false;
    dialogueConfig.autoFocus = true;
    this.popup.open(PolicyComponent, dialogueConfig);

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

  taskBoard(){
    this.bottomSheet
      .open(TaskboardComponent, {data:this.boards}) // open in popup
      .afterDismissed().subscribe((result)=>{
        if(result){
          console.log(result);
          this.board = result;
          // apply the result towards acquiring all tasks associated
          // find all where their listed board is that one
          // before doing this, check that the owner of the board matches the ones submitting the request
        };
      });
  }

}
