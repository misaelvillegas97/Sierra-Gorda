import { Component, OnInit } from '@angular/core';
import { DesafioService } from 'src/app/providers/desafio.service';
import { GoogleAnalyticsService } from 'src/app/providers/google-analytics.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['../desafio-austeridad.component.scss']
})
export class InfoComponent implements OnInit {

  constructor(public ds: DesafioService, public ga: GoogleAnalyticsService) {
    this.ds.getAllEncargados();
  }

  ngOnInit() {
  }

}
