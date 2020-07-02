import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {



  constructor() { }
}

// new creations

// collapse getTasks() and getTask(var) to getTask(var) that just grabs all when passed empty
// something about passing in an object with properties, then does "if property" similar to ngif
/*

  newTask(stuff){return true;}
  setTask(id, stuff){return true;}
  getTask(id?:any){
    if(id){return true;}//grab with id;
    else{return true;}//grab everything
  }
  delTask(id?:any){
    if(id){return true;}//kill with id
    else{return true;}//kill everything
  }
  */
