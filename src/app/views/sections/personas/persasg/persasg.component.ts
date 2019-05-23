import { Component, OnInit, ViewChild } from '@angular/core';
import { MDBModalService, MDBModalRef, ModalDirective } from 'angular-bootstrap-md';
import { PersaModalComponent } from 'src/app/modals/persa-modal/persa-modal.component';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-persasg',
  templateUrl: './persasg.component.html',
  styleUrls: ['./persasg.component.scss']
})
export class PersasgComponent implements OnInit {
  @ViewChild('basicModal') demoBasic: ModalDirective;

  cropperOptions: any;
  croppedImage = null;

  myImage = null;
  scaleValX = 1;
  scaleValY = 1;

  selectBuy: boolean;
  loading: boolean;

  modalRef: MDBModalRef;
  modalOptions = {};

  constructor( private modalService: MDBModalService ) {
    this.selectBuy = true;
    this.loading = true;
  }

  ngOnInit() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  cropImage(_idUpload: number, $event: any) {
    this.demoBasic.show();
    console.log($event);
    const input = $event.srcElement;
    let _ = this;
    this.myImage = null;
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        // _.angularCropper.imageUrl = e.target['result'];
        _.myImage = e.target['result'];
      };

      reader.readAsDataURL(input.files[0]);
  }
    // this.myImage = 'data:image/jpeg;base64,' + $event.srcElement.files[0];
  }

  openModal(articulo: any) {
    let data = {};

    data = {
      article: articulo
    };

    this.modalOptions = {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: 'persaModal-container modal-dialog-centered animated fadeInDown faster',
      containerClass: '',
      animated: true,
      data
    };
    this.modalRef = this.modalService.show(PersaModalComponent, this.modalOptions);
  }

  getSelected(): boolean {
    return this.selectBuy;
  }

  toggleSelected(): void {
    if (!this.selectBuy) {
      this.setLoading();
    }
    this.selectBuy = !this.selectBuy;
  }

  setLoading() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  console(x: NgModel) {
    console.log(x);
    return x.value.lenght;
  }

  getLength(x: string) {
    return x.length ? x.length : 0;
  }

}
