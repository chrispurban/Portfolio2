import { Component, OnInit, Inject } from '@angular/core';
import { Task, workflow } from '../../classes/task';
import { TaskService } from '../../services/task.service';
import { ViewChild, ElementRef } from '@angular/core';

import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-taskdetail',
  templateUrl: './taskdetail.component.html',
  styleUrls: ['./taskdetail.component.scss']
})

export class TaskdetailComponent implements OnInit {

  @ViewChild('issue') issue;
  @ViewChild('subject') subject;

  thinking;
  task:any;
  deletionPrompt = false;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) private input:any,
    private taskService:TaskService,
    private popup:MatBottomSheetRef<TaskdetailComponent>
  ){}

  ngOnInit():void{
    this.task = Object.assign([], workflow(this.input));
  }

  update(transition?){
    this.thinking = true;
    let changes = {toKeep:{}, toSend:{}} // queue of what to save

    if(transition){
      changes.toKeep = {
        code:workflow(this.task.state.phase + transition).code,
        time:new Date().toISOString()
      }
      Object.assign(changes.toSend, {$push:{history:changes.toKeep}})
    }
    if(this.issue.dirty){Object.assign(changes.toSend, {issue:this.task.issue})};
    if(this.subject.dirty){Object.assign(changes.toSend, {subject:this.task.subject})};
      // look into a foreach from form to eliminate viewchild

    if(Object.keys(changes.toSend).length > 0){ // one of the above changes were made
      this.taskService
      .modify(this.task._id, changes.toSend)
      .subscribe(value => {
        if(transition){
          this.task.history.push(changes.toKeep); // modifying history to change group column
          this.task = workflow(this.task);
        }
        this.popup.dismiss({value:this.task}); // pass back to main list
      });
    }
    else{this.popup.dismiss();} // no changes were made
  }

  delete(){
    if(this.deletionPrompt){
      this.taskService
        .delete(this.task._id)
        .subscribe(value => this.popup.dismiss({value:this.task, delete:true}));
    }
    else{this.deletionPrompt = true;}
  }

}
