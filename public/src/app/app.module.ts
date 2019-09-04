import { BrowserModule, Title } from '@angular/platform-browser'; // 
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; // allows for HTTP requests
import { HttpService } from './http.service'; // imports HttpService class from your created http.server.ts file

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule // Module that allows HTTP requests
  ],
  providers: [HttpService, Title], // For Component use
  bootstrap: [AppComponent]
})
export class AppModule { }
