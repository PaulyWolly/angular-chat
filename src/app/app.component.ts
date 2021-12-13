import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Pusher from 'pusher-js';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  username = 'username';
  message: string = 'message';
  title = 'angular-chat';
  messages = <any[]>([]);

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit() {
    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;

    const pusher = new Pusher('616eacdcfa7fc32e1553', {
      cluster: 'us2'
    });

    const channel = pusher.subscribe('chat');
    channel.bind('message', (data: any) => {
      this.messages.push(data);
    });

    $('button').click(function(){
      $('input[type="text"]').val('');
   });

  }

  submit(): void {
    this.http.post('http://localhost:8000/api/messages', {
      username: this.username,
      message: this.message
    }).subscribe(() => {
      $('.form-control').val("");

      $('input[type="text"]').val("");
      this.message = ""

    });
  }


}

