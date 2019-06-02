import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { BeneficiosService } from 'src/app/providers/beneficios.service';
import { ActivatedRoute } from '@angular/router';
import { BeneficioDetalle } from 'src/app/interface/beneficios';

@Component({
  selector: 'app-convenio-detalle',
  templateUrl: './convenio-detalle.component.html',
  styleUrls: ['../../beneficios.component.scss']
})
export class ConvenioDetalleComponent implements OnInit {
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
    AppComponent.prototype.subirScroll();
  }

  ngOnInit() {}
}
