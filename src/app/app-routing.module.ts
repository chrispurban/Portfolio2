import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { TasklistComponent } from './tasklist/tasklist.component';
import { TaskdetailComponent } from './taskdetail/taskdetail.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'tasklist'},
  {path: 'home', component: HomeComponent},
  {path: 'tasklist', component: TasklistComponent},
  {path: 'taskdetail', component: TaskdetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
