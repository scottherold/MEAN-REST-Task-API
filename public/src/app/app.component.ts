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
  tasks = []; // for list of tasks
  task: any; // for individual task
  tasksFetched: boolean;
  taskClicked: boolean; // for dynamic page task area

  // <--- Methods --->
  // ngOnInit will run when the component is initialized, after the constructor method
  ngOnInit() {
    this.tasksFetched = false;
    this.setTitle("Tasks API"); // Sets Page title
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
      
      // Sets the tasks variable in the component to the data.
      // This must be mapped to the key for the objects in the JSON sent from your API controller
      this.tasksFetched = true;
      this.tasks = data['tasks'];
    });
  }

  // invokes getTask() from https.service.ts
  getTaskFromService(id: string) {
    // Calls the method from the imported HttpService as an observable
    let observable = this._httpService.getTask(id);

    // Subscribes to the observable in the component instead of the service!
    observable.subscribe(task => {

      // Sets the task variable in the component to the data
      this.task = task;
      this.taskClicked = true;
    });
  }

  // <--- Event-Based Methods --->
  // onclick -> all
  getTasks(): void {
    this.getTasksFromService(); // API call to get all tasks on click
  }

  // onclick -> show
  getTask(id: string) : void {
    this.getTaskFromService(id);
  }

  // <--- Child-Specific Listeners --->
  // Hides task
  hideTask() { 
    this.taskClicked = false;
  }

  // Checks to see if list of tasks is present
  ifTasks() {
    if(this.tasksFetched) {
      this.getTasks();
    }
  }
}
