import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; // allows for HTTP requests
import { HttpService } from './http.service'; // imports HttpService class from your created http.server.ts file

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule // Module that allows HTTP requests
  ],
  providers: [HttpService], // include HttpService from imported module
  bootstrap: [AppComponent]
})
export class AppModule { }
