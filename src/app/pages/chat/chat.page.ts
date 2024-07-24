import { Component, OnDestroy, OnInit } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit, OnDestroy {
  message: string = "";
  userName: string = "Default User";
  messages: any[] = [];
  group: any;
  groupId: number | null = null;
  private messagesSubscription: Subscription | undefined;

  constructor(
    private socketService: SocketService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.groupId = params['groupId'] ? Number(params['groupId']) : null;
      if (this.groupId !== null) {
        this.loadGroup(this.groupId);
        this.socketService.joinGroup(this.groupId);
      }
    });


    this.messagesSubscription = this.socketService.messages$.subscribe((messages: any[]) => {
      this.messages = messages.filter(msg => msg.groupId === this.groupId);
      this.cdr.detectChanges();
    });
  }

  async loadGroup(groupId: number) {
    this.group = await this.authService.getGroupById(groupId);
  }

  sendMessage() {
    if (this.message && this.message.trim() && this.groupId !== null) {
      this.socketService.sendMessage(this.message, this.groupId);
      this.message = ''; // Limpiar el input después de enviar
    }
  }

  ngOnDestroy() {
    if (this.groupId !== null) {
      this.socketService.leaveGroup(this.groupId);
    }
    if (this.messagesSubscription) {
      this.messagesSubscription.unsubscribe();
    }
  }
}