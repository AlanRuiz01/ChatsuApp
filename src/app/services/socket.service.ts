import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service'; 
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;
  private messagesSubject = new BehaviorSubject<any[]>([]);
  public messages$ = this.messagesSubject.asObservable();

  constructor(private authService: AuthService) {
    this.socket = io('https://chatsu-server.onrender.com');

    this.socket.on('message', (message) => {
      console.log('Message received:', message);
      this.messagesSubject.next([...this.messagesSubject.getValue(), message]);
    });
  }

  async sendMessage(message: string, groupId: number) {
    const user = await this.authService.getCurrentUser();
    if (user) {
      const userId = user.id;
      const userName = user.username;
      if (userId) {
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        await this.authService.saveMessage(message, userId, groupId); // Guardar en Supabase
        this.socket.emit('sendMessage', { message, userName, timestamp, groupId });
      } else {
      }
    }
  }

  joinGroup(groupId: number) {
    this.socket.emit('joinGroup', groupId);
  }

  leaveGroup(groupId: number) {
    this.socket.emit('leaveGroup', groupId);
  }
  
}
