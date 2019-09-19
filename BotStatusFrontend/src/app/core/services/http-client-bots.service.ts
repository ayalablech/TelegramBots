import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = "http://localhost:3000/monitor/";

@Injectable({
  providedIn: 'root'
})
export class HttpClientBotsService {

  constructor(private http: HttpClient) { }

  getBotsFromServer() {
    console.log("getBotsFromServer");
    return this.http.get<any[]>(baseUrl+'statusBots');
  }
}
