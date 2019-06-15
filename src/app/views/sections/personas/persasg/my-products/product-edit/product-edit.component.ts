import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { PersaService } from 'src/app/providers/persa.service';
import { ActivatedRoute } from '@angular/router';
import { ProductDetail, UploadStructure } from 'src/app/interface/persa';
import { LoginService } from 'src/app/providers/login.service';

declare var Croppie: any;
declare var $: any;

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit, OnDestroy {
  @ViewChild('editModal') editModal: ModalDirective;
  myImage = null;
  croppie: any;
  uploadCrop: any;
  selectedInput = 0;
  _id = 0;

  private sub: any;
  private sub2: any;

  producto: ProductDetail;

  editProduct = {
    editProductCategory: "1",
    name: '',
    desc: '',
    quantity: 0,
    price: 0,
    upload_5: '',
    upload_5_b64: undefined,
    upload_6: '',
    upload_6_b64: undefined,
    upload_7: '',
    upload_7_b64: undefined,
    upload_8: '',
    upload_8_b64: undefined,
  };

  constructor( public ps: PersaService, private route: ActivatedRoute, private ls: LoginService ) {
    this.sub = this.route.params.subscribe( params => {
      this._id = parseInt(params.idProducto, 0); // (+) converts string 'id' to a number
      this.ps.selectedItem = undefined;
      this.ps.getProductById(this._id).finally(
        () => {
          this.producto = this.ps.selectedItem;

          this.editProduct.name = this.producto.nombre;
          this.editProduct.desc = this.producto.descripcion;
          this.editProduct.quantity = this.producto.cantidad_disponible;
          this.editProduct.price = this.producto.valor;
          this.editProduct.editProductCategory = this.producto.categoria + '';
          this.editProduct.upload_5_b64 = this.producto.imagenes[0].url;
          this.editProduct.upload_6_b64 = this.producto.imagenes[1] ? this.producto.imagenes[1].url : undefined;
          this.editProduct.upload_7_b64 = this.producto.imagenes[2] ? this.producto.imagenes[2].url : undefined;
          this.editProduct.upload_8_b64 = this.producto.imagenes[3] ? this.producto.imagenes[3].url : undefined;
        }
      );
    });
  }

  ngOnInit() {
    this.croppie = document.getElementById('croppie2');
    this.uploadCrop = new Croppie(this.croppie, {
      // enableExif: true,
      viewport: {
          width: 325,
          height: 208,
          type: 'square'
      },
      boundary: {
          width: 450,
          height: 300
      }
    });
  }

  ngOnDestroy(): void {
    this.ps.selectedItem = undefined;
    if (this.sub) { this.sub.unsubscribe(); }
    if (this.sub2) { this.sub2.unsubscribe(); }
  }

  cropImage(_idUpload: number, $event: any) {
    this.selectedInput = _idUpload;
    const input = $event.srcElement;
    let _ = this;
    this.myImage = null;

    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = function(e) {
        _.uploadCrop.bind({
          url: e.target['result']
        });
      };
      reader.readAsDataURL(input.files[0]);

    }
    this.editModal.show();
  }

  seeResults() {
    this.uploadCrop.result('base64').then( (res) => {
      // this.myImage = blob;
      switch (this.selectedInput) {
        case 1: this.editProduct.upload_5_b64 = res;
                break;
        case 2: this.editProduct.upload_6_b64 = res;
                break;
        case 3: this.editProduct.upload_7_b64 = res;
                break;
        case 4: this.editProduct.upload_8_b64 = res;
      }
    });

    this.editModal.hide();
  }

  getLength(x: string) {
    return x.length ? x.length : 0;
  }

  editProducto( f: Formulario ) {
    // console.table(f);
    const ARTICLE: UploadStructure = {
      id_producto: this._id,
      id_categoria: parseInt(f.edit_product_category, 0),
      nombre: f.edit_name,
      descripcion: f.edit_desc,
      valor: f.edit_price,
      image1: f.upload_5_b64 !== this.producto.imagenes[0].url ? f.upload_5_b64.substr(22) : undefined,
      image2: f.upload_6_b64 !== this.producto.imagenes[1].url ? f.upload_6_b64.substr(22) : undefined,
      image3: f.upload_7_b64 !== this.producto.imagenes[2].url ? f.upload_7_b64.substr(22) : undefined,
      image4: f.upload_8_b64 !== this.producto.imagenes[3].url ? f.upload_8_b64.substr(22) : undefined,
      cantidad: f.edit_quantity,
      formato: 'png'
    };

    // console.table(ARTICLE);

    this.sub2 = this.ps.editar(ARTICLE).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }

}

interface Formulario {
  edit_product_category: string;
  edit_name: string;
  edit_desc: string;
  edit_quantity: number;
  edit_price: number;
  upload_5_b64: string;
  upload_5: string;
  upload_6_b64: string;
  upload_6: string;
  upload_7_b64: string;
  upload_7: string;
  upload_8_b64: string;
  upload_8: string;
}
