import { Component, OnInit } from '@angular/core';
import { MDBModalService, MDBModalRef } from 'angular-bootstrap-md';
import { PersaModalComponent } from 'src/app/modals/persa-modal/persa-modal.component';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-persasg',
  templateUrl: './persasg.component.html',
  styleUrls: ['./persasg.component.scss']
})
export class PersasgComponent implements OnInit {
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

  openModal(articulo: any) {
    let data = {};

    data = {
      article: articulo
    }

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
