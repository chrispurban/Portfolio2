import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidekick',
  templateUrl: './sidekick.component.html',
  styleUrls: ['./sidekick.component.scss']
})

export class SidekickComponent implements OnInit {

  constructor(
    public auth:AuthService,
    private route:ActivatedRoute
  ){}

  ngOnInit():void{
    // console.log(this.route.params); // can you get the button to do a refresh if already there?
  }

}
