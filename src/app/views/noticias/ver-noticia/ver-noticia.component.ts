import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { NoticiasService } from 'src/app/providers/noticias.service';
import { ActivatedRoute } from '@angular/router';
import { NoticiaDetalle } from 'src/app/interface/noticia';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-ver-noticia',
  templateUrl: './ver-noticia.component.html',
  styleUrls: ['./ver-noticia.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class VerNoticiaComponent implements OnInit, AfterViewInit {

  noticia: NoticiaDetalle = undefined;
  private sub: any;

  // Comentario
  comentario: string;

  constructor( public ns: NoticiasService, private route: ActivatedRoute ) {
    this.comentario = '';

    this.sub = this.route.params.subscribe( params => {
      const _id = parseInt(params.id, 0);
      this.ns.getNoticiaById(_id)
      .then(
        (res: NoticiaDetalle) => {
          console.log(res);
          this.noticia = res;
        }
      );
    });
  }

  ngOnInit() {}

  ngAfterViewInit() {
    AppComponent.prototype.subirScroll();
  }

}
