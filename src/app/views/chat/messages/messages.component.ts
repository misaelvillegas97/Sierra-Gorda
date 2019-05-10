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
  @Output() public onSelectChat = new EventEmitter<number>();
  // tslint:disable-next-line: no-output-on-prefix
  @Output() public onQuit = new EventEmitter<boolean>();

  chatList: Chat[];

  constructor( public cs: ChatService ) {
    this.cs.getAllChats()
      .then(
        (res) => {
          console.log(res);
        }
      );
  }

  ngOnInit() {
  }

  chatSelect(id: number) {
    this.onSelectChat.emit(id);
  }
}
