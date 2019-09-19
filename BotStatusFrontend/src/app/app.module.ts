import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule } from "@angular/forms"

import { StatusBotsComponent } from 'app/core/components/Bots/status-bots/status-bots.component';
import { HttpClientBotsService } from 'app/core/services/http-client-bots.service';

@NgModule({
  declarations: [
    AppComponent,
    StatusBotsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [
    HttpClientBotsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
