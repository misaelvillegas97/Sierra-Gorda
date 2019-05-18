import { Component, OnInit, Input, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ChatService } from 'src/app/providers/chat.service';
import { Chat, Messages } from 'src/app/interface/interface';
import * as moment from 'moment';
import { NgModel, NgForm } from '@angular/forms';
import { LoginService } from 'src/app/providers/login.service';

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

  constructor(public cs: ChatService, private ls: LoginService) { }

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
    this.cs.postView(this.data.id);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  addEmoji($event: any) {
    console.log($event.emoji.native);
    this.mensaje += $event.emoji.native;
  }

  sendMessage(f: { chatInput: string }) {
    let objM: Messages = {
      id: null,
      fecha: new Date(),
      texto: btoa(btoa(btoa(this.mensaje))),
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

  decode(_text: string) {
    return atob(atob(atob(_text)));
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
    // console.log(returnedValue);

    return returnedValue;
  }

  updateScroll(){
    // tslint:disable-next-line: prefer-const
    let element = document.getElementById('messagesDiv');
    element.scrollTop = element.scrollHeight;
}

}
