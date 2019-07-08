import { Component, OnInit } from '@angular/core';
import { GoogleAnalyticsService } from 'src/app/providers/google-analytics.service';

@Component({
  selector: 'app-formularios-sg',
  templateUrl: './formularios-sg.component.html',
  styleUrls: ['./formularios-sg.component.scss']
})
export class FormulariosSgComponent implements OnInit {

  constructor(public ga: GoogleAnalyticsService) { }

  ngOnInit() {
  }

}
