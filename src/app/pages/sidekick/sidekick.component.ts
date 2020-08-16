import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidekick',
  templateUrl: './sidekick.component.html',
  styleUrls: ['./sidekick.component.scss']
})

export class SidekickComponent implements OnInit {

tasks;

  constructor(public auth:AuthService){}

  ngOnInit():void{}

  @ViewChild('outlet') outlet;
  loaded(component){this.outlet = component;}
  
}
