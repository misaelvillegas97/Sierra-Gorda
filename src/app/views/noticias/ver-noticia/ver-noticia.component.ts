import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { NoticiasService } from 'src/app/providers/noticias.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NoticiaDetalle, Comentario, Noticia } from 'src/app/interface/noticia';
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

  constructor( public ns: NoticiasService, private route: ActivatedRoute, private ls: LoginService, private router: Router ) {
    this.comentario = '';

    this.sub = this.route.params.subscribe( params => {
      const _id = parseInt(params.id, 0);
      this.ns.getNoticiaById(_id)
      .then(
        (res: NoticiaDetalle) => {
          // console.log(res);

          if (!this.ns.listaNoticias) {
            this.ns.getNoticias(undefined, undefined, 1);
          }

          this.noticia = res;
          this.ns.getLike(this.noticia.id_noticia)
            .then(
              resp => {
                this.megusta = resp;
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

  siguienteNoticia(): void {
    let noticia: Noticia;
    if ( this.ns.listaNoticias.find(noticiax => noticiax.id === this.noticia.id_noticia )) {
      noticia = this.ns.listaNoticias.find(noticiax => noticiax.id === this.noticia.id_noticia);
      const index = this.ns.listaNoticias.indexOf(noticia);

      if (this.ns.listaNoticias[index + 1]) {
        // this.router.navigate(['/noticia', { id: this.ns.listaNoticias[index + 1].id}]);
        this.router.navigateByUrl('/noticia/' + this.ns.listaNoticias[index + 1].id);
      } else {
        this.router.navigateByUrl('/noticia/' + this.ns.listaNoticias[0].id);
      }
    }
  }

  anteriorNoticia(): void {
    let noticia: Noticia;
    if ( this.ns.listaNoticias.find(noticiax => noticiax.id === this.noticia.id_noticia )) {
      noticia = this.ns.listaNoticias.find(noticiax => noticiax.id === this.noticia.id_noticia);
      const index = this.ns.listaNoticias.indexOf(noticia);

      if (this.ns.listaNoticias[index - 1]) {
        // this.router.navigate(['/noticia', { id: this.ns.listaNoticias[index - 1].id}]);
        this.router.navigateByUrl('/noticia/' + this.ns.listaNoticias[index - 1].id);
      } else {
        this.router.navigateByUrl('/noticia/' + this.ns.listaNoticias[this.ns.listaNoticias.length - 1].id);
      }
    }
  }

  ngOnInit() {}

  ngAfterViewInit() {
    AppComponent.prototype.subirScroll();
  }

}
