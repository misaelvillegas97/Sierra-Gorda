import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PortalService } from 'src/app/providers/portal.service';
import { Category } from 'src/app/interface/portal-interface';

@Component({
  selector: 'app-lista-videos',
  templateUrl: './lista-videos.component.html',
  styleUrls: ['./lista-videos.component.scss']
})
export class ListaVideosComponent implements OnInit, OnDestroy {

  titleCategoria = 'Titulo_categoria';
  categoria: Category;
  private sub: any;

  constructor( public ps: PortalService, private route: ActivatedRoute ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe( params => {
      this.titleCategoria = params.idCategoria; // (+) converts string 'id' to a number
      if (this.ps.categoryList === undefined) {
        this.ps.getCategorias().finally(
          () => {
            this.categoria = this.ps.getCategoryByName(this.titleCategoria);
            this.ps.getVideosByCategory(this.categoria.id);
            console.log(this.categoria)
          }
        );
      }
    });
  }

  ngOnDestroy(): void {
    console.log(this.sub);
    this.sub.unsubscribe();
    console.log(this.sub);
  }

}
