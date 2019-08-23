import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { NoticiasService } from 'src/app/providers/noticias.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NoticiaDetalle, Comentario, Noticia, NoticiaID } from 'src/app/interface/noticia';
import { AppComponent } from 'src/app/app.component';
import { LoginService } from 'src/app/providers/login.service';
import { GoogleAnalyticsService } from 'src/app/providers/google-analytics.service';

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

  // Comentario
  comentario: string;

  constructor( public ns: NoticiasService, private route: ActivatedRoute, private ls: LoginService, private router: Router, private ga: GoogleAnalyticsService ) {
    this.comentario = '';
    this.megusta = false;

    this.sub = this.route.params.subscribe( params => {
      const _id = parseInt(params.id, 0);
      this.ns.getNoticiaById(_id)
      .then(
        (res: NoticiaDetalle) => {
          this.ga.onNewsOpen(res.titulo_noticia);
          // console.log(res);

          // if (!this.ns.listaNoticias) {
          //   this.ns.getNoticias(undefined, undefined, 1);
          // }

          if (!this.ns.listaNoticiasID) {
            this.ns.getIdList();
          }

          this.noticia = res;
          if (this.ls.isLoggedIn) {
            this.ns.getLike(this.noticia.id_noticia)
            .then(
              resp => {
                this.megusta = resp;
              }
            );
          }
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
    this.ga.onNewsComment();
    this.ns.sendComment(COMMENT, this.noticia.id_noticia);
  }

  sendLike() {
    this.megusta = true;
    this.noticia.cantidad_megusta++;
    this.ns.sendLike(this.noticia.id_noticia);
    this.ga.onNewsLike();
  }

  siguienteNoticia(): void {
    let noticia: NoticiaID;
    // Valida que la noticia está dentro de las noticias existentes.
    if (this.ns.listaNoticiasID) {
      if ( this.ns.listaNoticiasID.find(noticiax => noticiax.id_noticia === this.noticia.id_noticia )) {
        noticia = this.ns.listaNoticiasID.find(noticiax => noticiax.id_noticia === this.noticia.id_noticia);
        const index = this.ns.listaNoticiasID.indexOf(noticia);
        console.log(index);

        if (this.ns.listaNoticiasID[index + 1]) {
          // this.router.navigate(['/noticia', { id: this.ns.listaNoticias[index + 1].id}]);
          this.router.navigateByUrl('/noticia/' + this.ns.listaNoticiasID[index + 1].id_noticia);
        } else {
          this.router.navigateByUrl('/noticia/' + this.ns.listaNoticiasID[0].id_noticia);
        }
      }
    }
  }

  anteriorNoticia(): void {
    let noticia: NoticiaID;

    if (this.ns.listaNoticiasID) {
      if ( this.ns.listaNoticiasID.find(noticiax => noticiax.id_noticia === this.noticia.id_noticia )) {
        noticia = this.ns.listaNoticiasID.find(noticiax => noticiax.id_noticia === this.noticia.id_noticia);
        const index = this.ns.listaNoticiasID.indexOf(noticia);

        if (this.ns.listaNoticiasID[index - 1]) {
          // this.router.navigate(['/noticia', { id: this.ns.listaNoticias[index - 1].id}]);
          this.router.navigateByUrl('/noticia/' + this.ns.listaNoticiasID[index - 1].id_noticia);
        } else {
          this.router.navigateByUrl('/noticia/' + this.ns.listaNoticiasID[this.ns.listaNoticiasID.length - 1].id_noticia);
        }
      }
    }
  }

  ngOnInit() {}

  ngAfterViewInit() {
    AppComponent.prototype.subirScroll();
  }

}
