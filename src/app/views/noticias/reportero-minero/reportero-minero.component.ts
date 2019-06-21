import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { NoticiasService } from 'src/app/providers/noticias.service';

@Component({
  selector: 'app-reportero-minero',
  templateUrl: './reportero-minero.component.html',
  styleUrls: ['../noticias.component.scss']
})
export class ReporteroMineroComponent implements OnInit {

  months = [
    'Ene',
    'Feb',
    'Mar',
    'Abr',
    'May',
    'Jun',
    'Jul',
    'Ago',
    'Sep',
    'Oct',
    'Nob',
    'Dic',
  ];

  constructor( public ns: NoticiasService ) {
    this.ns.getNoticias(16, 1, 3);
  }

  ngOnInit() {
    AppComponent.prototype.subirScroll();
  }

}
