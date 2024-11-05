import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  private socket = io.connect('http://192.168.209.40:4000'); // Reemplaza con la IP de tu backend

  sendMessage(message: string) {
    console.log("send message: ", message);
    this.socket.emit('chat message', message);
  }

  getMessages = () => {
    this.socket.on('chat message', (message) => {
      this.message$.next(message);
    });

    return this.message$.asObservable();
  }
}