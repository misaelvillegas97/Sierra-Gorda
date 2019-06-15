import { Component, OnInit } from '@angular/core';
import { DesafioService } from 'src/app/providers/desafio.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['../desafio-austeridad.component.scss']
})
export class InfoComponent implements OnInit {

  constructor(public ds: DesafioService) {
    this.ds.getAllEncargados();
  }

  ngOnInit() {
  }

}
