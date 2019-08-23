import { Component, OnInit, Input, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ChatService } from 'src/app/providers/chat.service';
import { Chat, Messages } from 'src/app/interface/interface';
import * as moment from 'moment';
import { NgModel, NgForm } from '@angular/forms';
import { LoginService } from 'src/app/providers/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-singlechat',
  templateUrl: './singlechat.component.html',
  styleUrls: ['./singlechat.component.scss']
})
export class SinglechatComponent implements OnInit, OnDestroy {
  @Input() data: Chat;
  @ViewChild('chatInput') chatInput: NgModel;
  messagesList: Messages[] = [];
  today = new Date();
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
  interval;

  constructor(public cs: ChatService, private ls: LoginService, private route: Router) { }

  ngOnInit() {
    this.cs.messagesList = undefined;
    this.messagesList = [];
    this.loadMessages();
    this.interval = setInterval(
      async () => {
        await this.loadMessages();
      }, 5000
    );
    this.mensaje = '';
    this.cs.postView(this.data.id).finally(
      () => {
        if (this.cs.messagesList.length !== 0) {
          setTimeout(() => {
            document.getElementById(`user-${this.data.destinatario.id_usuario}`).classList.add('active');
          }, 0);
        }
      }
    );
  }

  setFavorito(_data: Chat) {
    if (!this.data.favorito) {
      this.cs.setFavourite(this.data.destinatario.id_usuario, 0).then(
        res => {
          _data.favorito = true;
          this.data.favorito = true;
        }
      );
    } else {
      this.cs.setFavourite(this.data.destinatario.id_usuario, 1).then(
        res => {
          _data.favorito = false;
          this.data.favorito = false;
        }
      );
    }
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  addEmoji($event: any) {
    console.log($event.emoji.native);
    this.mensaje += $event.emoji.native;
  }

  sendMessage(f: { chatInput: string }) {
    const objM: Messages = {
      id: null,
      fecha: new Date(),
      texto: this.encode(this.mensaje),
      visto: 0,
      id_remitente: this.ls.userLogged.id_usuario,
      id_destinatario: this.data.destinatario.id_usuario
    };

    this.messagesList.push(objM);
    setTimeout(() => {
      this.updateScroll();
    }, 50);
    this.cs.postMessageChat(this.data.destinatario.id_usuario, this.mensaje)
      .finally(
        () => {
          this.loadMessages();
        }
        );
    this.mensaje = '';
  }

  async loadMessages() {
    await this.cs.getMessagesByChat( this.data.destinatario.id_usuario ).then(
      () => {
        this.messagesList = this.cs.messagesList;
    }).finally(
      () => {
        setTimeout(() => {
          this.updateScroll();
        }, 0);
      }
    );
  }

  isSender(_id: number): boolean {
    if ( _id === parseInt(atob(localStorage.getItem('sg-userID').toString()), 0) ) {
      return true;
    }
    return false;
  }

  decode(_text: string): string {
    const decodified = decodeURIComponent(escape(atob(decodeURIComponent(escape(atob(decodeURIComponent(escape(atob(_text)))))))));
    return decodified;
  }

  encode(_text: string): string {
    const codified = btoa(unescape(encodeURIComponent(btoa(unescape(encodeURIComponent(btoa(unescape(encodeURIComponent(_text)))))))));
    return codified;
  }

  calculardiferencia(_fecha: Date): string {
    const fechaInicial = moment(_fecha);
    const fechaFinal = moment(this.today);
    const diferencia = fechaFinal.diff(fechaInicial, 'minutes');
    let returnedValue;

    if ( diferencia <= 5 ) {
      returnedValue = 'Hace un momento';
    } else {
      if ( diferencia <= 60 ) {
        returnedValue = 'Hace ' + diferencia + ' minutos';
      } else {
        if ( (diferencia / 60) < 24  ) {
          returnedValue = 'Hace ' + (diferencia / 60) + ' horas';
        } else {
          returnedValue =
            _fecha.getHours() + ':' + _fecha.getMinutes() + ' - ' + _fecha.getDate() + ' de ' + this.months[_fecha.getMonth()];
        }
      }
    }
    return returnedValue;
  }

  updateScroll() {
    // tslint:disable-next-line: prefer-const
    let element = document.getElementById('messagesDiv');
    element.scrollTop = element.scrollHeight;
  }

  abrirEnChat() {
    this.route.navigateByUrl('/refresh', { skipLocationChange: true }).then(
      () => {
        this.route.navigateByUrl('/');
        this.route.navigate(['/chat/'], { queryParams: { usr: this.data.destinatario.id_usuario}});
      }
    );

    // [routerLink]="['/chat']"
    // [queryParams]="{usr: data.destinatario.id_usuario}"
  }

}
