import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {

  message: string = '';
  messages: string[] = [];
  username: string = ''; // Nombre de usuario
  isUsernameSet: boolean = false; // Flag para verificar si el nombre de usuario está establecido

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.chatService.getMessages().subscribe((message: string) => {
      this.messages.push(message);
    });
  }

  setUsername() {
    if (this.username.trim()) {
      this.isUsernameSet = true; // Establecer el nombre de usuario
    }
  }

  sendMessage() {
    if (this.message.trim() && this.isUsernameSet) {
      const fullMessage = `${this.username}: ${this.message}`; // Agrega el nombre de usuario
      this.chatService.sendMessage(fullMessage);  // Envía el mensaje completo
      this.message = '';  // Limpia el campo de mensaje después de enviar
    }
  }
}