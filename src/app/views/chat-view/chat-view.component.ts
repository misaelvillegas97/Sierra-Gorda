import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatModuleService } from 'src/app/providers/chat-module.service';
import { Chat, Messages } from 'src/app/interface/interface';
import { LoginService } from 'src/app/providers/login.service';

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.scss']
})
export class ChatViewComponent implements OnInit, OnDestroy {
  chat: Chat;
  displayInfo: boolean;
  userid = parseInt(atob(localStorage.getItem('sg-userID').toString()), 0);

  isFavorites: boolean;
  isRecent: boolean;

  mensaje = '';

  I18n = {
    search: 'Buscar',
    emojilist: 'Lista de emojis',
    notfound: 'No encontrado',
    clear: 'Limpiar',
    categories: {
      search: 'Resultados',
      recent: 'Frecuentemente usados',
      people: 'Sonrisas & Personas',
      nature: 'Animales & Naturaleza',
      foods: 'Comida & Bebidas',
      activity: 'Actividades',
      places: 'Viajes & Lugares',
      objects: 'Objetos',
      symbols: 'Simbolos',
      flags: 'Banderas',
      custom: 'Custom',
    },
    skintones: {
      1: 'Default Skin Tone',
      2: 'Light Skin Tone',
      3: 'Medium-Light Skin Tone',
      4: 'Medium Skin Tone',
      5: 'Medium-Dark Skin Tone',
      6: 'Dark Skin Tone',
    },
  };

  months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Nobiembre',
    'Diciembre',
  ];

  // Emoji config
  toggle_emoji: boolean = false;

  constructor( public cs: ChatModuleService, private ls: LoginService) {
    this.isFavorites = false;
    this.isRecent = true;
    this.cs.getAllChats();
  }

  ngOnInit() {
    this.chat = undefined;
    this.cs.messagesList = undefined;
    this.displayInfo = false;
  }

  ngOnDestroy() {
    this.cs.messagesList = undefined;
    this.displayInfo = false;
    this.chat = undefined;
  }

  loadChat($chat: Chat) {
    if ($chat === this.chat) {
      this.chat = undefined;
      this.displayInfo = false;
      this.cs.messagesList = undefined;
    } else {
      this.chat = $chat;
      this.cs.messagesList = undefined;
      this.displayInfo = false;
      this.getMessages($chat);
    }
  }

  getMessages($chat) {
    this.cs.getMessagesByChat($chat.destinatario.id_usuario)
    .finally(
      () => {
        setTimeout(() => {
          this.updateScroll();
        }, 0);
      });
  }

  sendMessage(f: { txt_message: string }) {
    const objM: Messages = {
      id: null,
      fecha: new Date(),
      texto: btoa(btoa(btoa(this.mensaje))),
      visto: 0,
      id_remitente: this.ls.userLogged.id_usuario,
      id_destinatario: this.chat.destinatario.id_usuario
    };

    this.cs.messagesList.push(objM);
    setTimeout(() => {
      this.updateScroll();
    }, 50);
    this.cs.postMessageChat(this.chat.destinatario.id_usuario, this.mensaje)
      .finally(
        () => {
          this.loadMessages();
        }
        );
    this.mensaje = '';
  }

  async loadMessages() {
    await this.cs.getMessagesByChat( this.chat.destinatario.id_usuario )
      .finally(
      () => {
        setTimeout(() => {
          this.updateScroll();
        }, 0);
      }
    );
  }

  updateScroll() {
    // tslint:disable-next-line: prefer-const
    let element = document.getElementById('content-box');
    element.scrollTop = element.scrollHeight;
  }

  decodeMessage(_text: string): string {
    return atob(atob(atob(_text)));
  }

  addEmoji($event: any) {
    console.log($event.emoji.native);
    this.mensaje += $event.emoji.native;
  }

  setFavorites() {
    this.isFavorites = true;
    this.isRecent = false;
  }

  setRecent() {
    this.isFavorites = false;
    this.isRecent = true;
  }

}
