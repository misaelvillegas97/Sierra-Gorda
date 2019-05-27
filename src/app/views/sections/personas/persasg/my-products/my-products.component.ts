import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';

declare var Croppie: any;
declare var $: any;

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.scss']
})
export class MyProductsComponent implements OnInit {
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

  constructor() { }

  ngOnInit() {
    this.croppie = document.getElementById('croppie');
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
        })
      };
      reader.readAsDataURL(input.files[0]);

    }
    this.demoBasic.show();
  }

  seeResults() {
    this.uploadCrop.result('base64').then( (blob) => {
      // this.myImage = blob;
      switch (this.selectedInput) {
        case 1: this.newProduct.upload_1_b64 = blob;
                break;
        case 2: this.newProduct.upload_2_b64 = blob;
                break;
        case 3: this.newProduct.upload_3_b64 = blob;
                break;
        case 4: this.newProduct.upload_4_b64 = blob;
      }
    });

    this.demoBasic.hide();
  }

  getLength(x: string) {
    return x.length ? x.length : 0;
  }

}
