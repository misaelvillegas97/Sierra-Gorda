import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ChatService } from 'src/app/providers/chat.service';
import { Chat } from 'src/app/interface/interface';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  // tslint:disable-next-line: no-output-on-prefix
  @Output() public onSelectChat = new EventEmitter<Chat>();
  // tslint:disable-next-line: no-output-on-prefix
  @Output() public onQuit = new EventEmitter<boolean>();

  chatList: Chat[];

  constructor( public cs: ChatService ) {
    this.loadChats();
  }

  ngOnInit() {
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

  chatSelect(id: Chat) {
    this.onSelectChat.emit(id);
  }
}
