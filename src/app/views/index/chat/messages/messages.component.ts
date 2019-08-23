import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ChatService } from 'src/app/providers/chat.service';
import { Chat } from 'src/app/interface/interface';
import { GoogleAnalyticsService } from 'src/app/providers/google-analytics.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit, OnDestroy {
  interval;
  selectedChat: Chat;
  isFavorites: boolean;
  isRecent: boolean;
  categoryText;

  searching: boolean;
  buscarText: string;

  // tslint:disable-next-line: no-output-on-prefix
  @Output() public onSelectChat = new EventEmitter<Chat>();
  // tslint:disable-next-line: no-output-on-prefix
  @Output() public onQuit = new EventEmitter<boolean>();

  chatList: Chat[];
  chatFavourite: Chat[];

  constructor( public cs: ChatService, private ga: GoogleAnalyticsService ) {
    this.isFavorites = false;
    this.isRecent = true;
    this.categoryText = 'Recientes';

    this.searching = false;
    this.buscarText = '';

    this.loadChats()
        .finally(
          () => {
            this.setColor();
          }
        );
    this.interval = setInterval(
      async () => {
        await this.loadChats()
        .finally(
          () => {
            this.setColor();
          }
        );
      }, 5000
    );
  }

  ngOnInit() {
    if (this.selectedChat) {
      // this.onSelectChat.emit(this.selectedChat);
      this.selectedChat = undefined;
    }
  }

  ngOnDestroy() {
    if (this.selectedChat) {
      // this.onSelectChat.emit(this.selectedChat);
      this.selectedChat = undefined;
    }
    this.cs.messagesList = undefined;
    this.cs.chatList = undefined;
    this.chatList = undefined;
    clearInterval(this.interval);
  }

  async loadChats() {
    await this.cs.getAllChats()
      .then(
        (res) => {
          if (res === 1) {
            this.chatList = this.cs.chatList;
            // console.log(this.chatList);
          }
        }
      );
  }

  chatSelect(chat: Chat) {
    this.selectedChat = chat;
    this.onSelectChat.emit(chat);
  }

  setFavorites() {
    this.isFavorites = true;
    this.isRecent = false;
    this.categoryText = 'Favoritos';
  }

  setRecent() {
    this.isFavorites = false;
    this.isRecent = true;
    this.categoryText = 'Recientes';
  }

  setColor() {
    if (this.selectedChat) {
      if (this.cs.messagesList) {
        if (this.cs.messagesList.length !== 0) {
          setTimeout(() => {
            document.getElementById(`user-${this.selectedChat.destinatario.id_usuario}`).classList.add('active');
          }, 0);
        }
      }
    }
  }

  search() {
    if (this.selectedChat) {
      this.onSelectChat.emit(this.selectedChat);
      this.selectedChat = undefined;
    }
    if (this.buscarText.trim().length < 3) {

      this.cs.chatList = undefined;
      this.searching = false;

      clearInterval(this.interval);
      this.loadChats();

      this.interval = setInterval(
        async () => {
          await this.loadChats()
          .finally(
            () => {
              this.setColor();
            }
          );
        }, 5000
      );
      return;
    }
    clearInterval(this.interval);
    // console.log(this.interval);

    this.searching = true;
    this.cs.chatList = undefined;
    this.ga.onChatSearch(this.buscarText);
    this.cs.buscar(this.buscarText);
  }

  clearSearch(_text?: boolean) {
    if (this.selectedChat) {
      this.onSelectChat.emit(this.selectedChat);
      this.selectedChat = undefined;
    }
    if (_text) { this.buscarText = ''; }
    this.searching = false;
    this.cs.chatList = undefined;
    this.cs.messagesList = undefined;

    clearInterval(this.interval);
    this.loadChats();
    this.interval = setInterval(
        async () => {
          await this.loadChats()
          .finally(
            () => {
              this.setColor();
            }
          );
        }, 5000
      );
  }
}
