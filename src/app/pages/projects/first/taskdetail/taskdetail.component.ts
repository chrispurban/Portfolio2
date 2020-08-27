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

  task;
  thinkingUI;
  deletionPrompt = false;
  editingNotes = false;
  hoveringLink = false;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) private input:any,
    private popup:MatBottomSheetRef<TaskdetailComponent>,
    private element:ElementRef, private renderer:Renderer2,
    private taskService:TaskService
  ){}

  ngOnInit():void{
    this.task = Object.assign([], workflow(this.input));
    if(!this.task.notes){this.editingNotes = true};
  }


// database mechanisms /////////////////////////////////////////////////////////////////////

  update(transition?){
    let changes = {}; // queue of what to save

    ["issue", "subject", "notes", "deadline"]
      .forEach(i => {if(this[i].dirty){changes[i] = this.task[i]};});

    if(transition){
      changes['history'] = {
        id:workflow(this.task.state.phase + transition).id,
        time:new Date().toISOString()
      }
    }

    if(Object.keys(changes).length > 0){ // one of the above changes were made
      this.thinkingUI = true;
      this.taskService
        .update(this.task._id, changes).subscribe(value => {
          if(transition){
            this.task.history.push(changes['history']); // change what group it's in
            this.task = workflow(this.task);
          }
          this.popup.dismiss({value:this.task}); // pass back to main list
        });
    }
    else{this.popup.dismiss();}
  }

  delete(){
    if(this.deletionPrompt){
      this.thinkingUI = true;
      this.taskService
        .delete(this.task._id).subscribe(
          value => this.popup.dismiss({value:this.task, delete:true})
        );
    }
    else{this.deletionPrompt = true;}
  }


// UI mechanisms /////////////////////////////////////////////////////////////

  listener(){};

  ngAfterViewInit(){ // protect the notes from switching to edit mode while clicking hyperlinks
    this.element.nativeElement.querySelectorAll('.linkified').forEach(link => {
      this.listener = this.renderer.listen(link, "mouseenter", event => this.hoveringLink = true);
      this.listener = this.renderer.listen(link, "mouseleave", event => this.hoveringLink = false);
    });
  }

  toggleNotes(){if(!this.hoveringLink){this.editingNotes = true}}

  ngOnDestroy(){this.listener()}

}
