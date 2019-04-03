import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  @Output() public onSelectChat = new EventEmitter<number>();
  @Output() public onQuit = new EventEmitter<boolean>();

  faker = [
    {
      id: 1,
      nombre: 'Nicolás Pérez',
      empresa: 'Sierra Gorda',
      unread: 0
    },
    {
      id: 2,
      nombre: 'Catalina Díaz',
      empresa: 'Sierra Gorda',
      unread: 5
    },
    {
      id: 3,
      nombre: 'María José Valenzuela',
      empresa: 'Sierra Gorda',
      unread: 12
    },
    {
      id: 4,
      nombre: 'Luis Alarcón',
      empresa: 'Sierra Gorda',
      unread: 11
    },
    {
      id: 5,
      nombre: 'Pedro García',
      empresa: 'Sierra Gorda',
      unread: 0
    },
    {
      id: 6,
      nombre: 'Nicolás Pérez',
      empresa: 'Sierra Gorda',
      unread: 0
    },
    {
      id: 7,
      nombre: 'Catalina Díaz',
      empresa: 'Sierra Gorda',
      unread: 5
    },
    {
      id: 8,
      nombre: 'María José Valenzuela',
      empresa: 'Sierra Gorda',
      unread: 12
    },
    {
      id: 9,
      nombre: 'Luis Alarcón',
      empresa: 'Sierra Gorda',
      unread: 11
    },
    {
      id: 10,
      nombre: 'Pedro García',
      empresa: 'Sierra Gorda',
      unread: 0
    },
  ]

  constructor() { }

  ngOnInit() {
  }

  chatSelect(id: number) {
    // console.log(id);
    this.onSelectChat.emit(id);
  }

  toggle_chat(state: boolean) {
    this.onQuit.emit(false);
    return false;
  }
}
