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
  @Output() onSelectPoll = new EventEmitter<number>();

// tslint:disable-next-line: no-output-on-prefix
  @Output() onQuit = new EventEmitter<boolean>();

  polls = [
    {
      id: 1,
      nombre: 'Nicolás Pérez',
    },
    {
      id: 2,
      nombre: 'Catalina Díaz',
    },
    {
      id: 3,
      nombre: 'María José Valenzuela',
    },
    {
      id: 4,
      nombre: 'Luis Alarcón',
    },
    {
      id: 5,
      nombre: 'Pedro García',
    }
  ];

  pollList: Poll[];

  constructor(public ps: PollService) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.ps.getAllEncuestas()
      .then(
        polls => {
          this.pollList = polls;
          console.table(polls);
        }
      );
  }

  pollSelect( id: any ) {
    this.onSelectPoll.emit( id );
  }

}
