import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { NoticiasService } from 'src/app/providers/noticias.service';
import { ActivatedRoute } from '@angular/router';
import { NoticiaDetalle, Comentario } from 'src/app/interface/noticia';
import { AppComponent } from 'src/app/app.component';
import { LoginService } from 'src/app/providers/login.service';

@Component({
  selector: 'app-ver-noticia',
  templateUrl: './ver-noticia.component.html',
  styleUrls: ['./ver-noticia.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class VerNoticiaComponent implements OnInit, AfterViewInit {

  noticia: NoticiaDetalle = undefined;
  private sub: any;
  megusta: boolean;

  // Comentario
  comentario: string;

  constructor( public ns: NoticiasService, private route: ActivatedRoute, private ls: LoginService ) {
    this.comentario = '';

    this.sub = this.route.params.subscribe( params => {
      const _id = parseInt(params.id, 0);
      this.ns.getNoticiaById(_id)
      .then(
        (res: NoticiaDetalle) => {
          console.log(res);
          this.noticia = res;
          this.ns.getLike(this.noticia.id_noticia)
            .then(
              res => {
                this.megusta = res;
              }
            );
        }
      );


    });
  }

  sendComment(_comentario: string) {
    const COMMENT: Comentario = {
      comentario: _comentario,
      id_comentario_usuario_noticia: 0,
      fecha: new Date(),
      usuario: {
        nombre: this.ls.userLogged.primer_nombre_usuario,
        apellido: this.ls.userLogged.apellido_pat_usuario,
        id: this.ls.userLogged.id_usuario,
        url_img_perfil: this.ls.userLogged.img_perfil_usuario
      }
    };
    this.comentario = '';
    this.noticia.comentario.push(COMMENT);
    this.ns.sendComment(COMMENT, this.noticia.id_noticia);
  }

  sendLike() {
    this.megusta = true;
    this.noticia.cantidad_megusta++;
    this.ns.sendLike(this.noticia.id_noticia);
  }

  ngOnInit() {}

  ngAfterViewInit() {
    AppComponent.prototype.subirScroll();
  }

}
