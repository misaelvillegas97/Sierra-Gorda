import { Injectable } from '@angular/core';
import { ResponseAllChats, Messages, Chat, ResponseChatById } from '../interface/interface';
import { LoginService } from './login.service';
import { HttpClient } from '@angular/common/http';

const URL = 'https://c3wsapi.cl/sg/';

@Injectable({
  providedIn: 'root'
})
export class ChatModuleService {

  chatList: Chat[] = [];

  messagesList: Messages[] = [];

  constructor(private ls: LoginService, private http: HttpClient) { }

  async getAllChats() {

    let respuesta = 0;
    if (this.ls.isLoggedIn()) {
      await this.http.get(URL + 'chat/getlistachatsinlim/' + atob(localStorage.getItem('sg-userID')))
        .toPromise()
        .then(
          (res: ResponseAllChats) => {
            // console.table(res.chats);
            this.chatList = res.chats;

            this.chatList.sort((a, b) => {
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
                // alert('0 - Error trying to connect WebService <<http://c3wsapi.cl>> | Obtener chats');
                break;
              case 404:
                // alert('404 - Page doesn\'t exist <<http://c3wsapi.cl>> | Obtener chats');
                break;
              case 500:
                // alert('500 - Error on code <<http://c3wsapi.cl>> | Obtener chats');
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
    if (this.ls.isLoggedIn()) {
      // comentario de prueba

      await this.http.get(URL + 'chat/getlistamensajesinlim/' + _chatID + '/' + atob(localStorage.getItem('sg-userID')))
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
              mensaje.fecha = new Date(mensaje.fecha);
              this.messagesList.push(mensaje);
            }

            this.messagesList.sort((a, b) => {
              if (a.fecha > b.fecha) {
                return 1;
              }
              if (a.fecha < b.fecha) {
                return -1;
              }
              return 0;
            });

            respuesta = 1;
            return;
          }
        ).catch(
          err => {
            switch (err.status) {
              case 0:
                // alert('0 - Error trying to connect WebService <<http://c3wsapi.cl>> | Obtener mensajes');
                break;
              case 404:
                // alert('404 - Page doesn\'t exist <<http://c3wsapi.cl>> | Obtener mensajes');
                break;
              case 500:
                // alert('500 - Error on code <<http://c3wsapi.cl>> | Obtener mensajes');
                break;
            }
            respuesta = 0;
            return;
          }
        );

    }
    return respuesta;
  }

  async postMessageChat(_idRecivier: number, text: string) {
    let respuesta = -1;

    const data = {
      id_remitente: atob(localStorage.getItem('sg-userID')),
      id_destinatario: _idRecivier,
      texto: text
    };

    if (this.ls.isLoggedIn()) {
      await this.http.post(URL + 'chat/insertmensajechat/', data)
        .toPromise()
        .then(
          (res) => {
            console.log('Mensaje Enviado');
            this.getMessagesByChat(_idRecivier);
            respuesta = 1;
          }
        );
    }

    return respuesta;
  }

  async postView(_idChat: number) {

    if (this.ls.isLoggedIn()) {
      await this.http.get(URL + 'chat/actualizarvisto/' + _idChat + '/' + atob(localStorage.getItem('sg-userID')))
        .toPromise()
        .then(
          async (res) => {
            await this.getAllChats();
            console.log(res);
          }
        );
    }

  }

  buscar(_text: string) {
    this.http.get(URL + 'chat/getlistachatfind/' + _text).toPromise()
      .then(
        res => {
          // tslint:disable-next-line: no-string-literal
          this.chatList = res['chats'];
          this.chatList = this.chatList.filter(
            chat => chat.id !== parseInt(localStorage.getItem('sg-userID'), 0)
          );
        }
      );
  }

  async setFavourite(_id: number, _state: number) {
    let response: boolean;
    const DATA = {
      id_usuario: parseInt(atob(localStorage.getItem('sg-userID')), 0),
      id_usuario_favorito: _id
    };

    await this.http.post(URL + 'chat/agregarfavorito', DATA).toPromise()
      .then(
        (res: { err: number; message: string; favorito: boolean }) => {
          if (!res.err) {
            // tslint:disable-next-line: no-string-literal
            response = res.favorito['result'];
          }
        }
      );

    return response;
  }

  archivarChat(_chat: number) {
    this.http
      .get(URL + 'chat/cerrarchatusuario/' + _chat + '/' + parseInt(localStorage.getItem('sg-userID'), 0)).toPromise()
      .then(res => {
        console.log(res);

      });
  }
}
