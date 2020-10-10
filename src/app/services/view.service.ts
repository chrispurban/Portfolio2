import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ViewService {

  height;
  width;
  scale;
  gap = 32;

  blurb:String = "Serving ever more flexible and meaningful systems";

  constructor(){}

  resize(){
    this.height = window.innerHeight;
    this.width = window.innerWidth;
    //console.log(this.height + " x " + this.width);

    if(this.width >= this.height/2){this.scale = this.height/2;}
    else{this.scale = this.width;};
    //console.warn(this.scale);
  }

}
