import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from '../classes/task';
import { environment } from '../../environments/environment';

import { AuthService } from './auth.service';

import * as store from 'store2';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    public auth:AuthService,
    private http:HttpClient
  ){}

  // issues:
  // the check for login status occurs before it can actually do it

  create(data:any):Observable<any> {
    console.warn("Creating task..."); // enhance with create from array?
    if(data._id){delete data._id;} // reassign any local id
    if(this.auth.loggedIn){
      return this.http.post<Task>(environment.baseurl + 'api/tasks', data);
    }
    else{
      data._id = new Date().toISOString();
      store.add('tasks', data);
      return of(data);
    }
  }

  read():Observable<any>{
    console.log("Reading tasks...");
    if(this.auth.loggedIn){
      if(store.has('tasks')){ // there is local data which needs to be uploaded
        store('tasks').forEach(i => {
          this.create(i).subscribe(value => {store(false)});
        });
      }
      return this.http.get<Task[]>(environment.baseurl + 'api/tasks');
    }
    else{
      if(!store.has('tasks')){store('tasks', [])}
      return of(store('tasks'));
    }
  }

  update(taskID:any, data:any){
    console.warn("Updating task " + taskID + "...");
    if(this.auth.loggedIn){
      return this.http.put(environment.baseurl + 'api/tasks/' + taskID, data);
    }
    else{
      store.transact('tasks', (content) => {
        let target = content[store('tasks').findIndex((i)=>i._id==taskID)];
        for(let property in data){
          if(data[property].constructor === Object){target[property].push(data[property]);}
          else{target[property] = data[property];}
        }
      })
      return of(true);
    }
  }

  delete(taskID:any){
    console.warn("Deleting task " + taskID + "...");
    if(this.auth.loggedIn){
      return this.http.delete(environment.baseurl + 'api/tasks/' + taskID)
    }
    else{
      store.transact('tasks', (content) => {
        let target = content[store('tasks').findIndex((i)=>i._id==taskID)];
        content.splice(target, 1);
      });
      return of(true);
    }
  }

}
