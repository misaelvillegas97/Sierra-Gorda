import { Component, OnInit } from '@angular/core';
import { NoticiasService } from 'src/app/providers/noticias.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-todas',
  templateUrl: './todas.component.html',
  styleUrls: ['../noticias.component.scss']
})
export class TodasComponent implements OnInit {

  constructor( public ns: NoticiasService ) {
    this.ns.getNoticias(16, 1, 1);
  }

  ngOnInit() {
    AppComponent.prototype.subirScroll();
  }

}
