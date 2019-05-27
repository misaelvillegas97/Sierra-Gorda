import { Component, OnInit } from '@angular/core';
import { PersaModalComponent } from 'src/app/modals/persa-modal/persa-modal.component';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {

  loading: boolean;

  modalRef: MDBModalRef;
  modalOptions = {};

  constructor( private modalService: MDBModalService ) {
    this.loading = true;
  }

  ngOnInit() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }


  setLoading() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 1000);
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

}
