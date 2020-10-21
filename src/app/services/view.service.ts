import { Injectable } from '@angular/core';
import { Project } from '../classes/project';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ViewService {

  height;
  width;
  scale;
  gap = 32;

  constructor(
    private http:HttpClient
  ){}

  resize(){
    this.height = window.innerHeight;
    this.width = window.innerWidth;
    //console.log(this.height + " x " + this.width);

    if(this.width >= this.height/2){this.scale = this.height/2;}
    else{this.scale = this.width;};
  }
}
