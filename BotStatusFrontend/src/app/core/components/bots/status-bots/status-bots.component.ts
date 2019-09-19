import { Component, OnInit } from '@angular/core';
import { HttpClientBotsService } from '../../../services/http-client-bots.service';
import { Bots } from '../Bots';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-status-bots',
  templateUrl: './status-bots.component.html',
  styleUrls: ['./status-bots.component.css']
})
export class StatusBotsComponent implements OnInit {

  constructor(private httpClientBots: HttpClientBotsService, private http: HttpClient) { }
  BotsList: Bots[] = [];
  status: string = "free";
  ngOnInit() {
    this.getStatusBots();
    setInterval(() => {
      this.getStatusBots();
    }, 5000);
  }
 

  getStatusBots() {
    this.httpClientBots.getBotsFromServer().subscribe(
      bots =>
        this.BotsList = bots,
      err => {
        console.log(err);
      });
  }

}
