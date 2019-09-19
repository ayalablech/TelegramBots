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
  ngrok:string;
  BotsList: Bots[] = [];
  status: string = "free";
  urlTelegram="https://api.telegram.org/bot";
  setwebhookText="/setwebhook";
  ngOnInit() {
    this.getStatusBots();
    setInterval(() => {
      this.getStatusBots();
    }, 5000);
    //this.setwebhook();
  }
  setwebhook() {
    let baseUrl =this.ngrok;// 'https://4d159501.ngrok.io';
    let body = {
      url: ''
  };
  // 971589216:AAHQJLqupRRbOZIPca7jshDG14lruDuuCEk
    body.url = baseUrl + "/bot1";
    this.http.post(this.urlTelegram+"928667979:AAEP8_CI8VoBNztgYIG4XEn-widGgC1_XZY"+this.setwebhookText, body).subscribe(res => {
      console.log(res);
    }
    );
    
    // 905645858:AAF28irI6qOE9mJruKxh2TYQicTyzPToZnA
    // 950181979:AAGmYSR6qCxDTHrrpJJbwPF8pSkr-RtoyHM
    body.url = baseUrl + "/bot2";
    this.http.post(this.urlTelegram+"973561188:AAEDTtwRztLAl-OF0h63FsvmYEav9SCnn6w"+this.setwebhookText, body).subscribe(res => {
      console.log(res);
    }
    );
    // "908397134:AAENS-7dXgNqjlCGld7O1duyJ72X5-bmTt0"
    // 927809141:AAGDWFXkjlyC8llh7T4dhQnIGXgK9vKxFvA
    
    body.url = baseUrl + "/bot3";
    this.http.post(this.urlTelegram+"731971563:AAGuof-_HrlvqYN-TlfUXcWOO-l3_HqQ1NM"+this.setwebhookText, body).subscribe(res => {
      console.log(res);
    }
    );
  }
  // let body={};

  //   'url':'fdfdf'
  // };
  // this.http.post("",boy);

  getStatusBots() {
    this.httpClientBots.getBotsFromServer().subscribe(
      bots =>
        this.BotsList = bots,
      err => {
        console.log(err);
      });
  }

  // updateStatusBots() {
  //   this.httpClientBots.postUpdateBots().subscribe(
  //     bots =>
  //       this.BotsList =
  //       bots, err => {
  //         console.log(err);
  //       });
  // }
}
