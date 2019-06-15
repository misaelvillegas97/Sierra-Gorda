import { Component, OnInit, AfterContentInit } from '@angular/core';
import { PersaService } from 'src/app/providers/persa.service';
import { Pedido, UserProduct } from 'src/app/interface/persa';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, AfterContentInit {

  constructor(public ps: PersaService) { }

  ngOnInit() {
    this.ps.getProductByUser();
  }

  ngAfterContentInit(): void {
    setTimeout(() => {
      const hIV = document.getElementById('insert-div').clientHeight;
      document.getElementById('product-list').style.maxHeight = hIV + 'px';
    }, 100);
  }

  growDiv(_id: string) {
    const growDiv = document.getElementById(_id);
    if (growDiv.clientHeight !== 40) {
      growDiv.style.height = '40px';
      growDiv.style.marginTop = '20px';
      growDiv.style.borderRadius = '25px';
      growDiv.classList.add('rotate-icon');
      // growDiv.style.overflowY = 'hidden';
      growDiv.querySelector('i[name="go-click"]').classList.remove('rotate-icon');
      // growDiv.querySelector('i[name="go-click"]').setAttribute('style', 'color: white; margin-right: 5px; cursor: pointer;');
    } else {
      const growDiv2 = document.getElementById(_id + '_content');
      growDiv.style.height = (growDiv2.clientHeight + (growDiv.clientHeight + 32)) + 'px';
      growDiv.style.borderRadius = '15px';
      growDiv.style.marginTop = '30px';
      growDiv.querySelector('i[name="go-click"]').classList.add('rotate-icon');
    }
  }

  /**
   * @param {Pedido} _product Pedido para retirar el 'id_compra'
   * @param {number} _state 1.- Pendiente. 2.- Aprobada. 3.- Rechazada
   * @memberof ProductListComponent
  /**
   *
   *
   * @param {UserProduct} _product Producto para restar cantidad de artículos restantes
   * @param {Pedido} _pedido Pedido para retirar el 'id_compra'
   * @param {number} _state 1.- Pendiente. 2.- Aprobada. 3.- Rechazada
   * @memberof ProductListComponent
   */
  vender(_product: UserProduct, _pedido: Pedido, _state: number) {
    this.ps.vender(_pedido.id_compra, _state)
      .then(
        (res) => {
          _product.pedidos.filter( pedido => pedido !== _pedido );
          if ( (_product.cantidad - _pedido.cantidad_comprado) <= 0 ) {
            this.ps.listUserProduct = this.ps.listUserProduct.filter( __product => __product !== _product );
          } else {
            _product.cantidad -= _pedido.cantidad_comprado;
          }
        }
      );
  }

}
