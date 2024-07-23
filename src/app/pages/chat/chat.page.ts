import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  message: string = "";
  userName: string = "Default User";
  messages: any[] = [];
  group: any;
  constructor(private socketService: SocketService , private route: ActivatedRoute , private supabaseService: AuthService) { }

 async ngOnInit() {

  const userProfile = await this.supabaseService.getCurrentUser();
  this.userName = userProfile.username;


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
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    this.socketService.sendMessage(this.message , this.userName , timestamp);
    this.message = '';
  }
}
