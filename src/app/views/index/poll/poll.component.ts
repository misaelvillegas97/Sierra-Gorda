import { Component, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { PollService } from 'src/app/providers/poll.service';
import { Poll } from 'src/app/interface/interface';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss']
})
export class PollComponent implements OnInit, AfterViewInit {

  // tslint:disable-next-line: no-output-on-prefix
  @Output() onSelectPoll = new EventEmitter<Poll>();

  // tslint:disable-next-line: no-output-on-prefix
  @Output() onQuit = new EventEmitter<boolean>();

  pollList: Poll[];

  constructor(public ps: PollService) { }

  ngOnInit() {
    this.ps.getAllEncuestas()
      .then(
        polls => {
          this.pollList = polls;
          // console.table(this.pollList);
          // console.table(this.pollList[0].preguntas);
          // console.table(this.pollList[0].preguntas[0].alternativas);
        }
      );
  }

  ngAfterViewInit(): void {
  }

  pollSelect(poll: Poll) {
    this.onSelectPoll.emit(poll);
  }

}
