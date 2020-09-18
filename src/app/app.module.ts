//base modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

//UI modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './app-material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutosizeModule } from 'ngx-autosize';
//import { NgPipesModule } from 'ngx-pipes';
// import { LinkifiyModule } from 'linkifyjs'

//components
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { SideComponent } from './pages/side/side.component';

  import { TasklistComponent } from './pages/projects/first/tasklist/tasklist.component';
  import { TaskdetailComponent } from './pages/projects/first/taskdetail/taskdetail.component';
  import { TaskentryComponent } from './pages/projects/first/taskentry/taskentry.component';

//services
import { TaskService } from './services/task.service';
import { AuthService } from './services/auth.service';
import { ViewService } from './services/view.service';
import { InterceptService } from './services/intercept.service';

//pipes
import { WorkflowPipe } from './pipes/workflow.pipe';
import { LinkifyPipe } from './pipes/linkify.pipe';
import { TimerPipe } from './pipes/timer.pipe';

//directives
import { FocusDirective } from './directives/focus.directive';

@NgModule({
  declarations: [
    AppComponent,
    SideComponent,
    HomeComponent,
    TasklistComponent,
    TaskdetailComponent,
    TaskentryComponent,
    WorkflowPipe,
    LinkifyPipe,
    FocusDirective,
    TimerPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
//    NgPipesModule,
    AutosizeModule
//    LinkifiyModule
  ],
  providers: [
    TaskService,
    AuthService,
    ViewService,
    InterceptService
  ],
  entryComponents: [
    TaskentryComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
