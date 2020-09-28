import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ViewService {

  height;
  gap = 32;

  blurb:String = "hello!";

  constructor(){}

  resize(){
    this.height = window.innerHeight;
    console.log(this.height)
  }

}
