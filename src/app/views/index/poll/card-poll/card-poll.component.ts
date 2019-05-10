import { Component, OnInit, Input } from '@angular/core';
import { Poll } from 'src/app/interface/interface';

@Component({
  selector: 'app-card-poll',
  templateUrl: './card-poll.component.html',
  styleUrls: ['./card-poll.component.scss']
})
export class CardPollComponent implements OnInit {

  @Input() poll: Poll;

  constructor() { }

  ngOnInit() {
  }

}
