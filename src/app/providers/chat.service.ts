import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { HttpClient } from '@angular/common/http';
import { ResponseAllChats, Chat, ResponseChatById, Messages } from '../interface/interface';

const URL = 'http://c3wsapi.cl:2200/sg/';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  chatList: Chat[] = [];
  messagesList: Messages[] = [];

  constructor(private ls: LoginService, private http: HttpClient) { }

  async getAllChats() {
    let respuesta = 0;
    if ( this.ls.isLoggedIn() ) {
      await this.http.get( URL + 'chat/getlistachatsinlim/' + atob(localStorage.getItem('sg-userID')) )
      .toPromise()
      .then(
        (res: ResponseAllChats) => {
          // console.table(res.chats);
          this.chatList = res.chats;

          this.chatList.sort( (a, b) => {
            if (a.fecha_ult_mensaje > b.fecha_ult_mensaje) {
              return 1;
            }
            if (a.fecha_ult_mensaje < b.fecha_ult_mensaje) {
              return -1;
            }
            // a must be equal to b
            return 0;
          });
          respuesta = 1;
          return;
        }
      ).catch(
        err => {
          switch (err.status) {
            case 0:
              alert('0 - Error trying to connect WebService <<http://c3wsapi.cl>> | Obtener chats');
              break;
            case 404:
              alert('404 - Page doesn\'t exist <<http://c3wsapi.cl>> | Obtener chats');
              break;
            case 500:
              alert('500 - Error on code <<http://c3wsapi.cl>> | Obtener chats');
              break;
          }
          respuesta = -1;
          return;
        }
      );
    }

    return respuesta;
  }

  async getMessagesByChat(_chatID: number) {
    let respuesta = -1;
    if ( this.ls.isLoggedIn() ) {
      await this.http.get(URL + 'chat/getlistamensajesinlim/' + _chatID + '/' + atob(localStorage.getItem('sg-userID'))  )
      .toPromise()
      .then(
        (res: ResponseChatById) => {
          if (res.err) {
            respuesta = 0;
            return;
          }

          this.messagesList = [];
          // tslint:disable-next-line: prefer-for-of
          for (let i = 0; i < res.data.length; i++) {
            const mensaje = res.data[i];
            // console.log(mensaje);
            this.messagesList.push(mensaje);
          }

          respuesta = 1;
          return;
        }
      ).catch(
        err => {
          switch (err.status) {
            case 0:
              alert('0 - Error trying to connect WebService <<http://c3wsapi.cl>> | Obtener mensajes');
              break;
            case 404:
              alert('404 - Page doesn\'t exist <<http://c3wsapi.cl>> | Obtener mensajes');
              break;
            case 500:
              alert('500 - Error on code <<http://c3wsapi.cl>> | Obtener mensajes');
              break;
          }
          respuesta = 0;
          return;
        }
      );

    }
    return respuesta;
  }
}
