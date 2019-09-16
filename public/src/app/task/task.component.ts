import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'; // add Input to imports
import { HttpService } from '../http.service'; // imports HttpService module

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})

export class TaskComponent implements OnInit {
  @Input() task: any; // @Input decorator indicates that data is from the parent
  @Output() taskToggled = new EventEmitter(); // toggles task in parent
  @Output() taskUpdated = new EventEmitter(); // sends task ID to parent
  @Output() taskDeleted = new EventEmitter(); // Tells parent data to re-run the tasks GET API query

  // <--- Constructors --->
  constructor(private _httpService: HttpService) { }

  // <--- Variables --->
  updateForm: boolean; // for displaying the update form
  showTask: boolean; // for displaying task

  ngOnInit() {
    this.updateForm = false;
    this.showTask = true;
  }

  // <--- Methods --->
  // Update Form submission
  updateTask() {
    // Calls the method from the importated HttpService as an observable
    let observable = this._httpService.updateTask(this.task);
    // Subscribes to the observable in the component instead of the service!
    observable.subscribe(task => {

    });
    this.hideTask(); // Hides task for it to be opened again via the parent
    this.taskUpdated.emit(this.task._id); // Sends task ID to the parent for update
  }

  // invokes deleteTask() from https.service.ts
  deleteTaskFromService(id: string) {
    // Calls the method from the imported HttpService as an observable
    let observable = this._httpService.deleteTask(id);

    // Subscribes to the observable in the component instead of the service!
    observable.subscribe(result => {

    });
    this.hideTask(); // Hides task pane, due to deletion
    this.taskDeleted.emit(); // 
  }

  // <--- Event-Based Methods --->
  // Hides clicked task
  hideTask() { 
    this.taskToggled.emit(); // triggers emit, with no data to toggle hide on parent
  }

  // onClick -> Show update form
  showUpdateForm() {
    this.showTask = false;
    this.updateForm = true;
  }

  // onclick -> Hide update form
  hideUpdateForm() {
    this.showTask = true;
    this.updateForm = false;
  }

  // onclick -> delete
  deleteTask(id: string) : void {
    this.deleteTaskFromService(id);
  }
}
