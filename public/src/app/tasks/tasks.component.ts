import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'; // add Input to imports

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})

export class TasksComponent implements OnInit {
  @Input() tasks: []; // @Input decorator indicates that data is from the parent
  @Output() fetchTask = new EventEmitter(); // Sends queried task data to parent
  // <--- Constructors --->
  constructor() { }

  ngOnInit() {

  }

  // <--- Methods --->

  // <--- Event-Based Methods --->
  // onclick -> show
  showTask(id: string) {
    this.fetchTask.emit(id);
  }
}
