import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../http.service'; // imports HttpService module

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {
  @Output() taskAdded = new EventEmitter(); // Tells parent data to re-run the tasks GET API query
  
  // <--- Constructors --->
  constructor(private _httpService: HttpService) { }

  // <--- Variables --->
  newTask: any; // for create form submission

  ngOnInit() {
    this.newTask = {title: "", description: ""}; // to see the data being sent to the DB
  }

  // <--- Methods --->

  // <-- Event-Based Methods -->
  // Create Form submission
  createTask() {
    // Calls the method from the importated HttpService as an observable
    let observable = this._httpService.addTask(this.newTask);

    // Subscribes to the observable in the component instead of the service!
    observable.subscribe(data => {
      
    })
    this.newTask = {title: "", description: ""}; // form reset
    this.taskAdded.emit(); // Tells parent task has been added
  }
}
