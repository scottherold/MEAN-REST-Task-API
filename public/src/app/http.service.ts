import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // allows for HTTP request -- needs to be used in service as well as module

@Injectable({
  providedIn: 'root'
})
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
  }
}

