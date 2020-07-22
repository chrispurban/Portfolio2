import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { TasklistComponent } from './pages/tasklist/tasklist.component';
import { TaskdetailComponent } from './pages/taskdetail/taskdetail.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptService } from './services/intercept.service';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'home', component: HomeComponent},
  {path: 'tasks', component: TasklistComponent, canActivate: [AuthGuard]},
  {path: 'tasks/:id', component: TaskdetailComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptService,
    multi: true
  }]
})

export class AppRoutingModule { }
