import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-poll',
  templateUrl: './card-poll.component.html',
  styleUrls: ['./card-poll.component.scss']
})
export class CardPollComponent implements OnInit {

  @Input() poll;

  constructor() { }

  ngOnInit() {
  }

}
