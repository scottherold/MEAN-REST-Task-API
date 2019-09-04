import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service'; // imports HttpService module
import { Title } from '@angular/platform-browser'; // form setting the title

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
// OnImit is an interface that called right after the constructor method
export class AppComponent implements OnInit{
  // <--- Constructors --->
  constructor(private _httpService: HttpService, private titleService: Title) { }

  // <--- Variables --->
  tasks = [];

  // <--- Methods --->
  // ngOnInit will run when the component is initialized, after the constructor method
  ngOnInit() {
    this.setTitle("Tasks API"); // Sets Page title
    this.getTasksFromService(); // API call for all on page load
  }
  
  // Sets the title
  setTitle( newTitle: string ) {
    this.titleService.setTitle ( newTitle );
  }

  // invokes getTasks() from http.service.ts
  getTasksFromService() {
    // Calls the method from the importated HttpService as an observable
    let observable = this._httpService.getTasks();

    // Subscribes to the observable in the component instead of the service!
    observable.subscribe(data => {
      console.log("Got our tasks!", data)
      
      // Sets the tasks variable in the component to the data.
      // This must be mapped to the key for the objects in the JSON sent from your API controller
      this.tasks = data['tasks'];
    });
  }
}
