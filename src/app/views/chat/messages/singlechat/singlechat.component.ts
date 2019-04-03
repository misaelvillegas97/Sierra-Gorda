import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-singlechat',
  templateUrl: './singlechat.component.html',
  styleUrls: ['./singlechat.component.scss']
})
export class SinglechatComponent implements OnInit {

  // Emoji config
  toggle_emoji: boolean = false;

  mensajes = [
    {
      author: 'me',
      message: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
      time: '11:10'
    },
    {
      author: 'other',
      message: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
      time: '11:10'
    },
    {
      author: 'me',
      message: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
      time: '11:11'
    },
    {
      author: 'other',
      message: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
      time: '11:11'
    },
    {
      author: 'me',
      message: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
      time: '11:12'
    },
    {
      author: 'other',
      message: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
      time: '11:13'
    },
  ]

  @Input() data: number;

  constructor() { }

  ngOnInit() {
  }

  send_message() {
    console.log('send')
  }

}
