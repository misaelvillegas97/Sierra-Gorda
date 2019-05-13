import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ChatService } from 'src/app/providers/chat.service';
import { Chat, Messages } from 'src/app/interface/interface';

@Component({
  selector: 'app-singlechat',
  templateUrl: './singlechat.component.html',
  styleUrls: ['./singlechat.component.scss']
})
export class SinglechatComponent implements OnInit, OnDestroy {
  @Input() data: Chat;
  messagesList: Messages[] = [];

  // Emoji config
  toggle_emoji: boolean = false;
  interval;

  constructor(public cs: ChatService) { }

  ngOnInit() {
    this.cs.messagesList = undefined;
    this.messagesList = [];
    this.loadMessages();
    this.interval = setInterval(
      async () => {
        await this.loadMessages();
      }, 5000
    );
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }


  send_message() {
    console.log('send');
  }

  async loadMessages() {
    await this.cs.getMessagesByChat( this.data.destinatario.id_usuario ).finally(
      () => {
        this.messagesList = this.cs.messagesList;
      }
    );
  }

  isSender(_id: number): boolean {
    if ( _id === parseInt(atob(localStorage.getItem('sg-userID').toString()), 0) ) {
      return true;
    }
    return false;
  }

}
