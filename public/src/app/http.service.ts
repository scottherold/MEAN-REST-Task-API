import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // allows for HTTP request -- needs to be used in service as well as module

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  // Depedency injection to use HttpClient
  constructor(private _http: HttpClient) { 
    // invokes the getTasks() and getTask() method at launch
    this.getTasks();
    this.getTask("5d5d9c92d548190cf1290a43");
  }

  // <--- Methods --->
  // All tasks
  getTasks() {
    // our http response is an observable, store it in the variable tempObservable
    let tempObservable = this._http.get('/tasks');
    // subscribe to our observable and provide the code we would like to do with our data from the response
    tempObservable.subscribe(data => console.log("Got our tasks!", data));
  };

  // Task By ID
  getTask(id: string) {
    // our http response is an observable, store it in the variable tempObservable
    let tempObservable = this._http.get(`/tasks/${id}`);
    // subscribe to our observable and provide the code we would like to do with our data from the response
    tempObservable.subscribe(data => console.log("Got our task!", data));
  }
}

