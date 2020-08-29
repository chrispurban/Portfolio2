import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.scss']
})

export class SideComponent implements OnInit {

  tasks;

  constructor(public auth:AuthService){}

  ngOnInit():void{}

  @ViewChild('outlet') outlet;
  loaded(component){this.outlet = component;}

}
