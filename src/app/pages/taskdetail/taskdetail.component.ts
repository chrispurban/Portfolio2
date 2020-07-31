import { Component, OnInit } from '@angular/core';
import { Task, workflow } from '../../classes/task';
import { TaskService } from '../../services/task.service';
import { ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-taskdetail',
  templateUrl: './taskdetail.component.html',
  styleUrls: ['./taskdetail.component.scss']
})

export class TaskdetailComponent implements OnInit {

  @ViewChild('issue') issue;
  @ViewChild('subject') subject;

  task:any;
  errMess:string;
  wf = workflow;

  constructor(
    private taskService:TaskService,
    private route:ActivatedRoute
  ){}

  ngOnInit(): void {
    this.reload();
  }

  reload(){
    this.task = null;
    this.taskService
      .getTask(this.route.snapshot.params.id)
      .subscribe(
        value => {this.task = workflow(value)},
        error => this.errMess = <any>error
      );
  }

  update(x?){
    let changes = {}
      if(this.issue.dirty){Object.assign(changes, {issue:this.task.issue})};
      if(this.subject.dirty){Object.assign(changes, {subject:this.task.subject})};
      if(x){Object.assign(changes, x)}
    if(Object.keys(changes).length > 0){
      this.taskService
      .modTask(this.task._id, changes)
      .subscribe(value => value);
    }
  }

  transition(x){
    this.update({
      $push:{
        history:{
          code:workflow(this.task.state.phase + x).code,
          time:new Date().toISOString()
        }
      }
    })
  }

}
