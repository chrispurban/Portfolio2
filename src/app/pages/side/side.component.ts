import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { ViewService } from '../../services/view.service';

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.scss']
})

export class SideComponent implements OnInit {

  constructor(public auth:AuthService, public view:ViewService){}

  ngOnInit():void{
    window.addEventListener('resize', ()=>{this.view.resize()});
  }

  @ViewChild('outlet') outlet;
  loaded(component){this.outlet = component;}

}
