import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  message: string = "";
  messages: string[] = [];
  constructor(private socketService: SocketService) { }

  ngOnInit() {
    this.socketService.getMessage().subscribe((message: string) => {
      this.messages.push(message);
    });
  }
  sendMessage() {
    this.socketService.sendMessage(this.message);
    this.message = '';
  }
}
