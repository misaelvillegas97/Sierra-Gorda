import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lista-videos',
  templateUrl: './lista-videos.component.html',
  styleUrls: ['./lista-videos.component.scss']
})
export class ListaVideosComponent implements OnInit {

  titleCategoria = 'Titulo_categoria';
  private sub: any;

  constructor( private route: ActivatedRoute ) { }

  ngOnInit() {

    this.sub = this.route.params.subscribe( params => {
      this.titleCategoria = params.idCategoria; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
   });

  }

}
