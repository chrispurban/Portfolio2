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
  headroom = window.innerHeight + "px";

  constructor(public auth:AuthService){}

  ngOnInit():void{
    window.addEventListener('resize', () => {
      this.headroom = window.innerHeight + "px";
    });
  }

  @ViewChild('outlet') outlet;
  loaded(component){this.outlet = component;}

}
