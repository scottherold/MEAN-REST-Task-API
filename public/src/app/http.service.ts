import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // allows for HTTP request -- needs to be used in service as well as module

@Injectable()
export class HttpService {
  // Depedency injection to use HttpClient
  constructor(private _http: HttpClient) { }

  // <--- Methods --->
  // All tasks
  getTasks() {
    // all as observable to be used in the component
    return this._http.get('/tasks');
  };

  // Task By ID
  getTask(id: string) {
    // show as observable to be used in the component
    return this._http.get(`/tasks/${id}`);
  };

  // Create new task
  addTask(newTask) {
    return this._http.post('/tasks', newTask);
  };

  // Update task
  updateTask(task) {
    return this._http.put(`/tasks/${task._id}`, task);
  }

  // Delete tasks
  deleteTask(id: string) {
    return this._http.delete(`/tasks/${id}`);
  }
}

