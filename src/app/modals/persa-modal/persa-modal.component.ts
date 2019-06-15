import { Component, OnInit, OnDestroy } from '@angular/core';
import { PersaService } from 'src/app/providers/persa.service';
import { ProductDetail } from 'src/app/interface/persa';
import { MatSnackBar } from '@angular/material/snack-bar';

declare var MasterSlider: any;

@Component({
  selector: 'app-persa-modal',
  templateUrl: './persa-modal.component.html',
  styleUrls: ['./persa-modal.component.scss']
})
export class PersaModalComponent implements OnInit, OnDestroy {
  idProducto: number;
  producto: ProductDetail;

  constructor(public ps: PersaService, private snackbar: MatSnackBar) {
  }

  ngOnInit() {
    this.ps.getProductById(this.idProducto)
    .finally(
      () => {
        console.log(this.ps.selectedItem);
        setTimeout(() => {
          this.createSlayer();
        }, 10);
      }
    );
  }

  plus (o:any, c: number) {
    let a = parseInt(o, 0);
    return a + c;
  }

  buy(  _cantidad: number) {
    this.ps.comprar(this.idProducto, _cantidad)
    .then(
      res => {
        if (res) {
          _cantidad = 0;
          this.snackbar.open('Se ha realizado correctamente el pedido', null, {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
            panelClass: ['snackbar-login'],
            announcementMessage: 'Mensaje de bienvenida'
          });
        }
      }
    );
  }

  ngOnDestroy() {
    this.ps.selectedItem = undefined;
  }

  createSlayer() {
    const slider = new MasterSlider();

    slider.control('arrows', {
      autohide: false
    });

    slider.setup('persaSlider', {
      width: 420,
      height: 269,
      space: 280,
      mouse: true,
      loop: true,
      autoplay: true,
      speed: 18,
      view: 'fadeWave',
      layout: 'partialview',
      controls: {
        arrows: {
          autohide: false
        },
        bullets: {
          autohide: false
        }
      }
    });
    slider.control('bullets', {
      autohide: false,
      dir: 'H',
      align: 'bottom',
      margin: 10
    });
  }

}
