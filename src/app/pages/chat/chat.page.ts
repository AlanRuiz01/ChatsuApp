import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  message: string = "";
  messages: string[] = [];
  group: any;
  constructor(private socketService: SocketService , private route: ActivatedRoute) { }

  ngOnInit() {

    this.socketService.getMessage().subscribe((message: string) => {
      this.messages.push(message);
    });

    this.route.queryParams.subscribe(params => {
      if (params['group']) {
        this.group = JSON.parse(params['group']);
      }
    });
    
  }
  sendMessage() {
    this.socketService.sendMessage(this.message);
    this.message = '';
  }
}
