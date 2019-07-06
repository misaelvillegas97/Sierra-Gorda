import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Chat } from 'src/app/interface/interface';
import { ChatModuleService } from 'src/app/providers/chat-module.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['../chat-view.component.scss']
})
export class ChatListComponent implements OnInit {
  @Input() list: Chat;

  // tslint:disable-next-line: no-output-on-prefix
  @Output() public onChatSelected = new EventEmitter<Chat>();
  user = parseInt(atob(localStorage.getItem('sg-userID')), 0);

  constructor( public cs: ChatModuleService ) { }

  ngOnInit() {
  }

  loadChat() {
    this.onChatSelected.emit(this.list);
  }

  decodeMessage(_text: string): string {
    const decodified = decodeURIComponent(escape(atob(decodeURIComponent(escape(atob(decodeURIComponent(escape(atob(_text)))))))));
    return decodified;
  }

}
