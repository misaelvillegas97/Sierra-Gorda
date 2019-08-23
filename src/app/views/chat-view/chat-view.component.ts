import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatModuleService } from 'src/app/providers/chat-module.service';
import { Chat, Messages } from 'src/app/interface/interface';
import { LoginService } from 'src/app/providers/login.service';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { GoogleAnalyticsService } from 'src/app/providers/google-analytics.service';

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

  constructor( public cs: ChatModuleService, private ls: LoginService, private route: ActivatedRoute, private ga: GoogleAnalyticsService) {
    this.isFavorites = false;
    this.isRecent = true;
    this.cs.getAllChats();

    // Valida si hay usuario por url
    this.route.queryParams
    .pipe(
      filter(params => params.usr)
    ).subscribe(params => {
      let userId = parseInt(params.usr, 0);
      this.ls.getUserById(userId).then(
        res => {
          const $chat: Chat = {
            destinatario: res,
            id: undefined,
            cont_novisto: 0,
            favorito: false
          };

          this.chat = $chat;
        }
      );
      document.getElementById('html').classList.remove('noscroll');
      this.getMessages(userId);
    });
  }

  ngOnInit() {
    // this.chat = undefined;
    // this.cs.messagesList = undefined;
    this.displayInfo = false;
  }

  ngOnDestroy() {
    this.cs.messagesList = undefined;
    this.displayInfo = false;
    this.chat = undefined;
  }

  buscarChat(_text: string) {
    if (_text.trim().length === 0) {
      this.cs.getAllChats();
      return;
    }
    this.ga.onChatSearch(_text);
    this.cs.buscar(_text);
  }

  clearSearch($event: any) {
    this.cs.getAllChats();
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
      this.getMessages($chat.destinatario.id_usuario);
    }
  }

  getMessages($id_usuario) {
    this.cs.getMessagesByChat($id_usuario)
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
      texto: this.encodeMessage(this.mensaje),
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
          this.ga.onChatSendMessage();
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
    const decodified = decodeURIComponent(escape(atob(decodeURIComponent(escape(atob(decodeURIComponent(escape(atob(_text)))))))));
    return decodified;
  }

  encodeMessage(_text: string): string {
    const codified = btoa(unescape(encodeURIComponent(btoa(unescape(encodeURIComponent(btoa(unescape(encodeURIComponent(_text)))))))));
    return codified;
  }

  addEmoji($event: any) {
    // console.log($event.emoji.native);
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

  setFavorito(_data: Chat) {
    if (!this.chat.favorito) {
      this.cs.setFavourite(this.chat.destinatario.id_usuario, 0).then(
        res => {
          _data.favorito = true;
          this.chat.favorito = true;
        }
      );
    } else {
      this.cs.setFavourite(this.chat.destinatario.id_usuario, 1).then(
        res => {
          _data.favorito = false;
          this.chat.favorito = false;
        }
      );
    }
  }

  archivarchat(){
    this.cs.archivarChat(this.chat.id);
    this.cs.chatList = this.cs.chatList.filter(chat =>chat.id !== this.chat.id);
    this.chat = undefined;
    this.cs.messagesList = undefined;
  }
}
