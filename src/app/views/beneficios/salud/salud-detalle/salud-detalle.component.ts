import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BeneficiosService } from 'src/app/providers/beneficios.service';
import { ActivatedRoute } from '@angular/router';
import { BeneficioDetalle } from 'src/app/interface/beneficios';

@Component({
  selector: 'app-salud-detalle',
  templateUrl: './salud-detalle.component.html',
  styleUrls: ['../../beneficios.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SaludDetalleComponent implements OnInit {
  idBeneficio: number;
  beneficio: BeneficioDetalle;
  private sub: any;

  constructor(public bs: BeneficiosService, private route: ActivatedRoute) {
    this.sub = this.route.params.subscribe(params => {
      this.idBeneficio = parseInt(params.nombre, 0);
      this.bs
        .getBeneficioPorId(this.idBeneficio)
        .then((beneficio: BeneficioDetalle) => {
          this.beneficio = beneficio;
          return;
        });
    });
  }

  ngOnInit() {}
}
