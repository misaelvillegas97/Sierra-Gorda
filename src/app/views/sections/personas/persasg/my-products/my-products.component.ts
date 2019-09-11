import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { LoginService } from 'src/app/providers/login.service';
import { UploadStructure } from 'src/app/interface/persa';
import { PersaService } from 'src/app/providers/persa.service';
import { GoogleAnalyticsService } from 'src/app/providers/google-analytics.service';

declare var Croppie: any;
declare var $: any;

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.scss']
})
export class MyProductsComponent implements OnInit, OnDestroy {
  @ViewChild('basicModal') demoBasic: ModalDirective;
  myImage = null;
  croppie: any;
  uploadCrop: any;
  selectedInput = 0;

  newProduct = {
    newProductCategory: 0,
    name: '',
    desc: '',
    quantity: 0,
    price: 0,
    upload_1: '',
    upload_1_b64: '',
    upload_2: '',
    upload_2_b64: '',
    upload_3: '',
    upload_3_b64: '',
    upload_4: '',
    upload_4_b64: '',
  };

  sub: any;

  constructor(private ls: LoginService, private ps: PersaService, private ga: GoogleAnalyticsService) { }

  ngOnInit() {
    this.croppie = document.getElementById('croppie');
    this.uploadCrop = new Croppie(this.croppie, {
      enableExif: true,
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

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  cropImage(_idUpload: number, $event: any) {
    this.selectedInput = _idUpload;
    const input = $event.srcElement;
    let _ = this;
    this.myImage = null;

    if (input.files && input.files[0]) {
      const reader = new FileReader();

      // tslint:disable-next-line: only-arrow-functions
      reader.onload = function(e) {
        _.uploadCrop.bind({
          // tslint:disable-next-line: no-string-literal
          url: e.target['result']
        });
      };
      reader.readAsDataURL(input.files[0]);

    }
    this.demoBasic.show();
  }

  seeResults() {
    this.uploadCrop.result('base64', 'viewport', 'png').then((blob) => {
      // this.myImage = blob;
      switch (this.selectedInput) {
        case 1:
          this.newProduct.upload_1_b64 = blob;
          break;
        case 2:
          this.newProduct.upload_2_b64 = blob;
          break;
        case 3:
          this.newProduct.upload_3_b64 = blob;
          break;
        case 4: this.newProduct.upload_4_b64 = blob;
      }
    });

    this.demoBasic.hide();
  }

  getLength(x: string) {
    return x.length ? x.length : 0;
  }

  publicar(f: Formulario) {
    console.table(f);
    const ARTICLE: UploadStructure = {
      id_usuario: this.ls.userLogged.id_usuario,
      id_categoria: parseInt(f.new_product_category, 0),
      nombre: f.txt_name,
      descripcion: f.txt_desc,
      valor: f.txt_price,
      image1: f.upload_1_b64.substr(22),
      image2: f.upload_2_b64.substr(22),
      image3: f.upload_3_b64.substr(22),
      image4: f.upload_4_b64.substr(22),
      cantidad: f.txt_quantity,
      formato: 'png'
    };

    this.ga.onPersaPublicar(f.txt_name);

    this.sub = this.ps.publicar(ARTICLE).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }
}

interface Formulario {
  new_product_category: string;
  txt_name: string;
  txt_desc: string;
  txt_quantity: number;
  txt_price: number;
  upload_1_b64: string;
  upload_1: string;
  upload_2_b64: string;
  upload_2: string;
  upload_3_b64: string;
  upload_3: string;
  upload_4_b64: string;
  upload_4: string;
}
