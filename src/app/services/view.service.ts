import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ViewService {

  height;
  blurb:String = "hello!"

  constructor(){this.resize()}

  resize(){
    this.height = window.innerHeight;
  }

}
