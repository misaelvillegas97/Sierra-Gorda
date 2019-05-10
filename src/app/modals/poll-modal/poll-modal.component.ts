import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Poll } from 'src/app/interface/interface';

@Component({
  selector: 'app-poll-modal',
  templateUrl: './poll-modal.component.html',
  styleUrls: ['./poll-modal.component.scss']
})
export class PollModalComponent implements OnInit {

  poll: Poll;

  constructor( public modalRef: MDBModalRef ) { }

  ngOnInit() {
    console.table(this.poll);
  }

}
