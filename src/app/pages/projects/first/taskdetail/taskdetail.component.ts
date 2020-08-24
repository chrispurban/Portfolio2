import { Component, OnInit, Inject, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Task, workflow } from '../../../../classes/task';
import { TaskService } from '../../../../services/task.service';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-taskdetail',
  templateUrl: './taskdetail.component.html',
  styleUrls: ['./taskdetail.component.scss']
})

export class TaskdetailComponent implements OnInit {

  @ViewChild('issue') issue;
  @ViewChild('subject') subject;
  @ViewChild('notes') notes;
  @ViewChild('deadline') deadline;

  thinking;
  task;
  deletionPrompt = false;
  editingNotes = false;
  onLink = false;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) private input:any,
    private popup:MatBottomSheetRef<TaskdetailComponent>,
    private renderer:Renderer2,
    private element:ElementRef,
    private taskService:TaskService
  ){}

  ngOnInit():void{
    this.task = Object.assign([], workflow(this.input))
    if(!this.task.notes){this.editingNotes = true}
  }


// database mechanisms /////////////////////////////////////////////////////////////////////

  update(transition?){
    this.thinking = true;
    let changes = {toKeep:{}, toSend:{}} // queue of what to save

    if(transition){
      changes.toKeep = {
        code:workflow(this.task.state.phase + transition).code,
        time:new Date().toISOString()
      }
      Object.assign(changes.toSend,{$push:{history:changes.toKeep}})
    }
    if(this.issue.dirty){Object.assign(changes.toSend,{issue:this.task.issue})};
    if(this.subject.dirty){Object.assign(changes.toSend,{subject:this.task.subject})};
    if(this.notes.dirty){Object.assign(changes.toSend,{notes:this.task.notes})};
    if(this.deadline.dirty){Object.assign(changes.toSend,{deadline:this.task.deadline})};
    /*
    look into a foreach from form to eliminate repeat viewchild
    formItems.forEach(formItem=>{if(formItem.dirty){Object.assign(changes.toSend,{type:taskItem})}})
    */

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
    else{this.deletionPrompt = true;} // minor error if you try to delete multiple w/o refreshing
  }


// UI mechanisms /////////////////////////////////////////////////////////////

  listener(){};

  ngAfterViewInit(){ // protect the notes from switching to edit mode while clicking hyperlinks
    this.element.nativeElement.querySelectorAll('.linkified').forEach(link => {
      this.listener = this.renderer.listen(link, "mouseenter", event => this.onLink = true);
      this.listener = this.renderer.listen(link, "mouseleave", event => this.onLink = false);
    });
  }

  toggleNotes(){if(!this.onLink){this.editingNotes = true}}

  ngOnDestroy(){this.listener()}

}
