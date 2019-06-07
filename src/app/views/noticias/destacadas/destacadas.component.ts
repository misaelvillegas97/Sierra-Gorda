import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { NoticiasService } from 'src/app/providers/noticias.service';

@Component({
  selector: 'app-destacadas',
  templateUrl: './destacadas.component.html',
  styleUrls: ['../noticias.component.scss']
})
export class DestacadasComponent implements OnInit {

  constructor( public ns: NoticiasService ) {
    this.ns.getNoticias(16, 1, 2);
  }

  ngOnInit() {
    AppComponent.prototype.subirScroll();
  }

}
