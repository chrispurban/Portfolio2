import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Task } from '../classes/task';

import { baseurl } from '../../assets/config';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private http: HttpClient
  ) { }

  getTask(taskID?:any): Observable<any> {
    if (taskID){
      console.log("fetching task " + taskID);
      return this.http.get<Task>(baseurl + 'tasks/' + taskID);
    }
    else {
      console.log("fetching all tasks");
      return this.http.get<Task[]>(baseurl + 'tasks');
    }
  }

  newTask(data?:any): Observable<any> {
    return this.http.post<Task>(baseurl + 'tasks', data);
    console.log("task has been created");
  }

  setTask(taskID?:any, data?:any){
    console.log("task has been modified");
  }

  delTask(taskID?:any) {
    if (taskID){console.log("deleting task " + taskID)}
    else {console.log("deleting all tasks")}
  }
}
