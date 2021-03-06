import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { PollService } from 'src/app/providers/poll.service';

@Component({
  selector: 'app-singlepoll',
  templateUrl: './singlepoll.component.html',
  styleUrls: ['./singlepoll.component.scss']
})
export class SinglepollComponent implements OnInit {

  @Input() data: number;

// tslint:disable-next-line: no-output-on-prefix
  @Output() onQuit = new EventEmitter<boolean>();

  constructor() {

  }

  ngOnInit() {
  }

}
