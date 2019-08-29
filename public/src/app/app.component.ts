import { Component } from '@angular/core';
import { HttpService } from './http.service'; // imports HttpService module

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MEAN';
  // HttpService Constructor
  constructor(private _httpService: HttpService) {
    
  }
}
