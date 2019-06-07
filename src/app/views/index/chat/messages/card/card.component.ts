import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Chat } from 'src/app/interface/interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() chat: Chat;

  constructor() { }

  ngOnInit() {
  }

}
