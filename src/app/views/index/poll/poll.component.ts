import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss']
})
export class PollComponent implements OnInit {

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


  constructor() { }

  ngOnInit() {
  }

  pollSelect( id: any ) {
    this.onSelectPoll.emit( id );
  }

}
