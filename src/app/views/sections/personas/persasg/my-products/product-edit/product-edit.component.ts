import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';

declare var Croppie: any;
declare var $: any;

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  @ViewChild('editModal') editModal: ModalDirective;
  myImage = null;
  croppie: any;
  uploadCrop: any;
  selectedInput = 0;

  editProduct = {
    editProductCategory: 0,
    name: '',
    desc: '',
    quantity: 0,
    price: 0,
    upload_5: '',
    upload_5_b64: '',
    upload_6: '',
    upload_6_b64: '',
    upload_7: '',
    upload_7_b64: '',
    upload_8: '',
    upload_8_b64: '',
  };

  constructor() { }

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

}
