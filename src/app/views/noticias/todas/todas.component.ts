import { Component, OnInit } from '@angular/core';
import { NoticiasService } from 'src/app/providers/noticias.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-todas',
  templateUrl: './todas.component.html',
  styleUrls: ['../noticias.component.scss']
})
export class TodasComponent implements OnInit {

  total: number;
  actualPage: number;
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
    this.total = 0;
    this.loadData();
  }

  loadData() {
    this.ns.getCount(1).then(
      (contador: number) => {
        this.total = contador;
      }
    );
    this.getPage(1);
  }

  getPage($page?: number) {
    window.scrollTo(0, 0);
    if ( !$page ) { $page = 1; }
    this.actualPage = $page;

    this.ns.getNoticias(16, $page, 1);
  }

  ngOnInit() {
    AppComponent.prototype.subirScroll();
  }

}
