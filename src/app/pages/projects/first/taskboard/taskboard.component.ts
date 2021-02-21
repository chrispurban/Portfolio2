import { Component, OnInit, Inject } from '@angular/core';

import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-taskboard',
  templateUrl: './taskboard.component.html',
  styleUrls: ['./taskboard.component.scss']
})
export class TaskboardComponent implements OnInit {

  boards=null;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) private input:any,
    private popup:MatBottomSheetRef<TaskboardComponent>
  ) { }

  ngOnInit():void{
    this.boards = Object.assign([], this.input);
  }

  done(board){
    this.popup.dismiss(board);
  }

}
