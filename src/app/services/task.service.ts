import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Task } from '../classes/task';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private http: HttpClient
  ) { }

  getTask(taskID?:any): Observable<any> {
    if (taskID){
      console.log("Fetching task " + taskID + "...");
      return this.http.get<Task>(environment.baseurl + 'api/tasks/' + taskID);
    }
    else {
      console.log("Fetching all tasks...");
      return this.http.get<Task[]>(environment.baseurl + 'api/tasks');
    }
  }

  create(data?:any): Observable<any> {
    console.warn("Creating task...");
    return this.http.post<Task>(environment.baseurl + 'api/tasks', data);
  }

  modify(taskID?:any, data?:any){
    console.warn("Modifying task " + taskID + "...");
    return this.http.put(environment.baseurl + 'api/tasks/' + taskID, data);
  }

  delete(taskID?:any) {
    if (taskID){
      console.warn("Deleting task " + taskID + "...")
      return this.http.delete(environment.baseurl + 'api/tasks/' + taskID)
    }
  }

}
