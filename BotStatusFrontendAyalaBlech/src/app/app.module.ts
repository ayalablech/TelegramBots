import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule } from "@angular/forms"
// import { ListboxModule } from 'primeng/listbox';

import { StatusBotsComponent } from 'app/core/components/Bots/status-bots/status-bots.component';
import { BotNamePipe } from 'app/core/Pipes/bot-name.pipe';
import { HttpClientBotsService } from 'app/core/services/http-client-bots.service';

@NgModule({
  declarations: [
    AppComponent,
    StatusBotsComponent,
    BotNamePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // should be only in app module
    
  ],
  providers: [
    HttpClientBotsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
