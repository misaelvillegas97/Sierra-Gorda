import { Component, OnInit } from '@angular/core';
import { PortalService } from 'src/app/providers/portal.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {

  constructor( public ps: PortalService ) {
    this.ps.getCategorias();
  }

  ngOnInit() {
  }

}
