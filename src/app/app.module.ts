//base modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

//UI modules
import { MaterialModule } from './app-material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgPipesModule } from 'ngx-pipes';
import { AutosizeModule } from 'ngx-autosize';

//components
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { SidekickComponent } from './pages/sidekick/sidekick.component';
import { LoginComponent } from './pages/login/login.component';
import { TasklistComponent } from './pages/tasklist/tasklist.component';
import { TaskdetailComponent } from './pages/taskdetail/taskdetail.component';
import { TaskentryComponent } from './pages/taskentry/taskentry.component';

//services
import { TaskService } from './services/task.service';
import { AuthService } from './services/auth.service';
import { InterceptService } from './services/intercept.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    TasklistComponent,
    TaskdetailComponent,
    SidekickComponent,
    TaskentryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    NgPipesModule,
    AutosizeModule
  ],
  providers: [
    TaskService,
    AuthService,
    InterceptService
  ],
  entryComponents: [
    TaskentryComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
