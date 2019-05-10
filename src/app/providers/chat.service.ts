import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { HttpClient } from '@angular/common/http';
import { ResponseAllChats, Chat, ResponseChatById } from '../interface/interface';

const URL = 'http://c3wsapi.cl:2200/sg/';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  chatList: Chat[] = [];

  constructor(private ls: LoginService, private http: HttpClient) { }

  async getAllChats() {
    let respuesta = 0;
    if ( this.ls.isLoggedIn() ) {
      return await this.http.get(URL + 'chat/getlistachatsinlim/' + atob(localStorage.getItem('sg-userID'))   )
      .toPromise()
      .then(
        (res: ResponseAllChats) => {
          console.table();
          this.chatList = res.chat;
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
    if ( this.ls.isLoggedIn() ) {
      await this.http.get(URL + 'chat/getlistamensajesinlim/' + _chatID + '/' + localStorage.getItem('sg-userID') )
      .toPromise()
      .then(
        (res: ResponseChatById) => {
          if (res.err) {
            return [];
          }

          return res.mensajes;
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
          return [];
        }
      );
    }
  }
}
