import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidekick',
  templateUrl: './sidekick.component.html',
  styleUrls: ['./sidekick.component.scss']
})

export class SidekickComponent implements OnInit {

  constructor(public auth:AuthService){}

  ngOnInit():void{}

  @ViewChild('outlet') outlet;
  loaded(component){this.outlet = component;}

}

/////////////////////////////////////////////////////////////////////////////////////

/*
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, NavigationStart, Event as NavigationEvent} from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidekick',
  templateUrl: './sidekick.component.html',
  styleUrls: ['./sidekick.component.scss']
})

export class SidekickComponent implements OnInit {

  location:String;

  constructor(
    public auth:AuthService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.router.events.subscribe((event: NavigationEvent) => {
      if(event instanceof NavigationStart){
        this.location = event.url.replace("/","")
      }
    });
    // manually obtained with console.log(this.router.routerState.snapshot.url);
  }

}

*/
