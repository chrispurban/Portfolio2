import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { TasklistComponent } from './pages/tasklist/tasklist.component';
import { TaskdetailComponent } from './pages/taskdetail/taskdetail.component';
import { SidekickComponent } from './pages/sidekick/sidekick.component';

import { TaskService } from './services/task.service';

import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    TasklistComponent,
    TaskdetailComponent,
    SidekickComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatProgressSpinnerModule
  ],
  providers: [
    TaskService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
