import { Component, OnInit } from '@angular/core';
import { GoogleAnalyticsService } from 'src/app/providers/google-analytics.service';

@Component({
  selector: 'app-propiedad',
  templateUrl: './propiedad.component.html',
  styleUrls: ['./propiedad.component.scss']
})
export class PropiedadComponent implements OnInit {

  constructor(public ga: GoogleAnalyticsService) { }

  ngOnInit() {
  }

}
