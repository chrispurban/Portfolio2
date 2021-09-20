import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { ViewService } from '../../services/view.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({selector:'app-side', templateUrl:'./side.component.html', styleUrls:['./side.component.scss']})
export class SideComponent implements OnInit {

  homepage=true;

  constructor(
    public auth:AuthService,
    public view:ViewService,
    public router:Router
  ){
    router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((result:NavigationEnd) => {
        this.homepage=result.urlAfterRedirects=='/projects'
      })
    ;
  }

  ngOnInit():void{}

  @ViewChild('outlet') outlet;
  loaded(component){
    this.outlet = component;
  }

}
