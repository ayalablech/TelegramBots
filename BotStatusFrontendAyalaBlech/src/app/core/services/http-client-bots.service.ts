import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Bots } from 'app/core/components/Bots/Bots';
import { Observable } from 'rxjs/internal/Observable';
const baseUrl = "http://localhost:3000/";

@Injectable({
  providedIn: 'root'
})
export class HttpClientBotsService {

  constructor(private http: HttpClient) { }

  getBotsFromServer() {
    console.log("getBotsFromServer");
    return this.http.get<any[]>(baseUrl+'statusBots');
  }
  // postUpdateBots(tasksToSave: Bots[]): Observable<boolean> {
  //   return this.http.post("/api/Tasks", tasksToSave).map(res => {
  //     return
  //     true;
  //   }).catch(err => { return Observable.throw(err); });
  // }

}
