import { Component } from '@angular/core';
import { ViewService } from './services/view.service';

@Component({selector:'app-root', templateUrl:'./app.component.html', styleUrls:['./app.component.scss']})
export class AppComponent {

  title = 'Chris Urban';

  constructor(public view:ViewService){
    view.resize();
    window.addEventListener('resize', ()=>{view.resize()});
  }

}
