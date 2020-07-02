import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { TasklistComponent } from './pages/tasklist/tasklist.component';
import { TaskdetailComponent } from './pages/taskdetail/taskdetail.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'home', component: HomeComponent},
  {path: 'tasks', component: TasklistComponent},
  {path: 'tasks/:id', component: TaskdetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
