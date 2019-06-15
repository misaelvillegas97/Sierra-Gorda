import { Component, OnInit } from '@angular/core';
import { Reconocimiento } from 'src/app/interface/reconozco';

@Component({
  selector: 'app-reconocimiento-modal',
  templateUrl: './reconocimiento-modal.component.html',
  styleUrls: ['./reconocimiento-modal.component.scss']
})
export class ReconocimientoModalComponent implements OnInit {

  reconocimiento: Reconocimiento;

  constructor() { }

  ngOnInit() {
  }

}
