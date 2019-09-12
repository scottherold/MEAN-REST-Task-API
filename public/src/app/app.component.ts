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
  newTask: any; // for create form submission
  updateForm: boolean; // for displaying the update form

  // <--- Methods --->
  // ngOnInit will run when the component is initialized, after the constructor method
  ngOnInit() {
    this.tasksFetched = false;
    this.updateForm = false;
    this.setTitle("Tasks API"); // Sets Page title
    this.newTask = {title: "", description: ""}; // to see the data being sent to the DB
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
      this.tasksFetched = true;
      this.tasks = data['tasks'];
    });
  }

  // invokes deleteTask() from https.service.ts
  deleteTaskFromService(id: string) {
    // Calls the method from the imported HttpService as an observable
    let observable = this._httpService.deleteTask(id);

    // Subscribes to the observable in the component instead of the service!
    observable.subscribe(result => {
      console.log(result); // verifies if data is deleted
      // If tasks are displayed, refresh
      if(this.tasksFetched === true) {
        this.getTasksFromService()
      };
      this.updateForm = false;
      this.taskClicked = false;
    });
  }

  // invokes getTask() from https.service.ts
  getTaskFromService(id: string) {
    // Calls the method from the imported HttpService as an observable
    let observable = this._httpService.getTask(id);

    // Subscribes to the observable in the component instead of the service!
    observable.subscribe(task => {
      console.log("Got the task!", task);

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

  // onclick -> delete
  deleteTask(id: string) : void {
    this.deleteTaskFromService(id);
  }

  // Create Form submission
  createTask() {
    // Calls the method from the importated HttpService as an observable
    let observable = this._httpService.addTask(this.newTask);

    // Subscribes to the observable in the component instead of the service!
    observable.subscribe(data => {
      console.log("Got data from post back", data);
      // If tasks are displayed, refresh
      if(this.tasksFetched === true) {
        this.getTasksFromService()
      };
      this.newTask = {title: "", description: ""}; // form reset
    })
  }

  // Update Form submission
  updateTask() {
    // Calls the method from the importated HttpService as an observable
    let observable = this._httpService.updateTask(this.task);
    // Subscribes to the observable in the component instead of the service!
    observable.subscribe(task => {
      if(this.tasksFetched === true) {
        this.getTasksFromService()
      };
    })
    this.getTaskFromService(this.task._id); // Queries DB for newly updated task
    this.updateForm = false; // hide update form
    this.taskClicked = true; // shows task
  }

  // Hides clicked task
  hideTask() {
    this.taskClicked = false;
  }

  // Shows the update form
  showUpdateForm() {
    this.taskClicked = false;
    this.updateForm = true;
  }

  // Hides the update form
  hideUpdateForm() {
    this.taskClicked = true;
    this.updateForm = false;
  }
}
