import { BrowserModule, Title } from '@angular/platform-browser'; // 
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; // allows for HTTP requests
import { HttpService } from './http.service'; // imports HttpService class from your created http.server.ts file
import { FormsModule } from '@angular/forms'; // imports Forms module to use HTTP forms

import { AppComponent } from './app.component';
import { TaskComponent } from './task/task.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { TasksComponent } from './tasks/tasks.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    NewTaskComponent,
    TasksComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // Module that allows HTTP requests
    FormsModule // HTTP request using form data
  ],
  providers: [HttpService, Title], // For Component use
  bootstrap: [AppComponent]
})
export class AppModule { }
