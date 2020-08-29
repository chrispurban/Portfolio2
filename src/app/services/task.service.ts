import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap} from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from '../classes/task';
import { environment } from '../../environments/environment';

import { AuthService } from './auth.service';

import * as localStorage from 'store2';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    public auth:AuthService,
    private http:HttpClient
  ){}


  create(data:any):Observable<any> { console.warn("Creating task..." + data.subject);
    if(this.auth.loggedIn){
      return this.http.post<Task>(environment.baseurl + 'api/tasks', data);
    }
    else{
      data._id = "guest_" + new Date().toISOString();
      localStorage.add('tasks', data);
      return of(data);
    }
  }

  read():Observable<any>{ console.warn("Reading tasks...");
    if(!localStorage('tasks')){localStorage('tasks', [])}
    return new Observable((obs)=>{
      obs.next([]) // TODO: stop interfering with progress spinner
      this.auth.getUser$().toPromise().then((profile)=>{
        console.log("checking if there is a profile...")
        if(profile){
          console.log("profile located: " + profile.nickname);
          (async()=>{ // TODO: look at triggering download on length <= 0

            await(async()=>{ // TODO: look at cutting this out

              console.log("looking into the local storage...");
              if(localStorage('tasks').length > 0){
                console.log("found local data:");console.warn(localStorage('tasks'));
                for (let task of localStorage('tasks')){
                  console.log("uploading task:");console.log(task.subject);
                  await this.create(task).toPromise().then(()=>{
                    this.delete(task._id).toPromise();
                  })
                }
              }
              else{console.log("storage was empty")}

            })()

            console.log("done uploading local, downloading cloud...")
            this.http.get(environment.baseurl + 'api/tasks/')
            .toPromise().then((result)=>{obs.next(result)})
          })()
        }
        else{
          console.log("there was no profile, loading local storage...")
          obs.next(localStorage('tasks'))
        }
      })
    })
  }

  update(taskID:any, data:any){ console.warn("Updating task " + taskID + "...");
    if(this.auth.loggedIn){
      return this.http.put(environment.baseurl + 'api/tasks/' + taskID, data);
    }
    else{
      localStorage.transact('tasks', (content) => {
        let target = content[localStorage('tasks').findIndex((i)=>i._id==taskID)];
        for(let property in data){
          if(data[property].constructor === Object){target[property].push(data[property]);}
          else{target[property] = data[property];}
        }
      })
      return of(true);
    }
  }

  delete(taskID:any){ console.warn("Deleting task " + taskID + "...");
    if(this.auth.loggedIn && !taskID.includes("guest_")){
      return this.http.delete(environment.baseurl + 'api/tasks/' + taskID)
    }
    else{
      localStorage.transact('tasks', (content) => {
        let target = content[localStorage('tasks').findIndex((i)=>i._id==taskID)];
        content.splice(target, 1);
      });
      console.log("delete completed")
      console.log(localStorage('tasks'))
      return of(true);
    }
  }

}
