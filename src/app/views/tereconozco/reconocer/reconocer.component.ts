import { Component, OnInit, ViewChild } from '@angular/core';
import { ReconozcoService } from 'src/app/providers/reconozco.service';
import { Valor } from 'src/app/interface/reconozco';
import { ModalDirective } from 'angular-bootstrap-md';

declare var Croppie: any;

@Component({
  selector: 'app-reconocer',
  templateUrl: './reconocer.component.html',
  styleUrls: ['../tereconozco.component.scss']
})
export class ReconocerComponent implements OnInit {
  @ViewChild('basicModal') demoBasic: ModalDirective;
  selectedModalidad = '0';
  selectedType = '0';
  myImage = undefined;
  croppie: any;
  uploadCrop: any;

  constructor(public rs: ReconozcoService) {
    this.rs.getAllValores();
  }

  ngOnInit() {
    this.croppie = document.getElementById('croppie');
    this.uploadCrop = new Croppie(this.croppie, {
      enableExif: true,
      viewport: {
          width: 500,
          height: 500,
          type: 'square'
      },
      boundary: {
          width: 500,
          height: 500
      }
    });
  }

  openCrop($event: any) {
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
    this.uploadCrop.result('base64', 'viewport', 'png').then( (blob) => {
      this.myImage = blob;
    });

    this.demoBasic.hide();
  }

  validateShown(_valor: Valor) {
    if (parseInt(this.selectedType, 0) === _valor.estado_gru && parseInt(this.selectedModalidad, 0) === _valor.estado_staff) {
      return true;
    }

    return false;
  }

}
