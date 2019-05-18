import { Component, OnInit } from '@angular/core';

declare let $: any;

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})
export class LinksComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

    //#region Buttons Hover Actions
    onButtonHover(nombreBoton: string, state: boolean): void {
      switch (nombreBoton) {
        case 'Nuestra Compañía':
          if (state) {
            $('#compania').css('background-color', '#FF5000');
            $('#compania').css('box-shadow', 'none');
            $('#compania-1').css('background-color', '#FF5000');
            $('#compania-2').css('background-color', '#FF5000');
            $('#compania-3').css('color', 'white');
            $('#compania-options').addClass('animated');
            $('#compania-options').addClass('fadeIn');
            $('#compania-options').addClass('faster');
            $('#compania-options').css('visibility', 'visible');
          } else {
            $('#compania').removeAttr('style');
            $('#compania-1').removeAttr('style');
            $('#compania-2').removeAttr('style');
            $('#compania-3').removeAttr('style');
            $('#compania-options').removeClass('animated');
            $('#compania-options').removeClass('fadeIn');
            $('#compania-options').removeClass('faster');
            $('#compania-options').removeAttr('style');
          }
          break;

        case 'Personas':
          if (state) {
            $('#personas').css('background-color', '#FFC500');
            $('#personas').css('box-shadow', 'none');
            $('#personas-1').css('background-color', '#FFC500');
            $('#personas-2').css('background-color', '#FFC500');
            $('#personas-3').css('color', 'white');
            $('#personas-options').addClass('animated');
            $('#personas-options').addClass('fadeIn');
            $('#personas-options').addClass('faster');
            $('#personas-options').css('visibility', 'visible');
          } else {
            $('#personas').removeAttr('style');
            $('#personas-1').removeAttr('style');
            $('#personas-2').removeAttr('style');
            $('#personas-3').removeAttr('style');
            $('#personas-options').removeClass('animated');
            $('#personas-options').removeClass('fadeIn');
            $('#personas-options').removeClass('faster');
            $('#personas-options').removeAttr('style');
          }
          break;

        case 'Aplicaciones':
          if (state) {
            $('#aplicaciones').css('background-color', '#00BDC8');
            $('#aplicaciones').css('box-shadow', 'none');
            $('#aplicaciones-1').css('background-color', '#00BDC8');
            $('#aplicaciones-2').css('background-color', '#00BDC8');
            $('#aplicaciones-3').css('color', 'white');
            $('#aplicaciones-options').addClass('animated');
            $('#aplicaciones-options').addClass('fadeIn');
            $('#aplicaciones-options').addClass('faster');
            $('#aplicaciones-options').css('visibility', 'visible');
          } else {
            $('#aplicaciones').removeAttr('style');
            $('#aplicaciones-1').removeAttr('style');
            $('#aplicaciones-2').removeAttr('style');
            $('#aplicaciones-3').removeAttr('style');
            $('#aplicaciones-options').removeClass('animated');
            $('#aplicaciones-options').removeClass('fadeIn');
            $('#aplicaciones-options').removeClass('faster');
            $('#aplicaciones-options').removeAttr('style');
          }
          break;

        case 'Mis Herramientas':
          if (state) {
            $('#herramientas').css('background-color', '#6ABE4A');
            $('#herramientas').css('box-shadow', 'none');
            $('#herramientas-1').css('background-color', '#6ABE4A');
            $('#herramientas-2').css('background-color', '#6ABE4A');
            $('#herramientas-3').css('color', 'white');
            $('#herramientas-options').addClass('animated');
            $('#herramientas-options').addClass('fadeIn');
            $('#herramientas-options').addClass('faster');
            $('#herramientas-options').css('visibility', 'visible');
          } else {
            $('#herramientas').removeAttr('style');
            $('#herramientas-1').removeAttr('style');
            $('#herramientas-2').removeAttr('style');
            $('#herramientas-3').removeAttr('style');
            $('#herramientas-options').removeClass('animated');
            $('#herramientas-options').removeClass('fadeIn');
            $('#herramientas-options').removeClass('faster');
            $('#herramientas-options').removeAttr('style');
          }
          break;
      }
    }
    //#endregion

}
