import { Component, OnInit } from '@angular/core';
import { NoticiasService } from 'src/app/providers/noticias.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss']
})
export class NoticiasComponent implements OnInit {
  seccionAbierta = undefined;

  constructor( public ns: NoticiasService ) {
    this.seccionAbierta = 1;
  }

  ngOnInit() {
    AppComponent.prototype.subirScroll();
  }

}
