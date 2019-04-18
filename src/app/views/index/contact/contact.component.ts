import { Component, OnInit, Output, EventEmitter } from '@angular/core';

declare var $: any;
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  search = '';
  searchDisplayed = false;

  errorMessage = '';
  errorMessageDisplayed = false;

  CARGOS = [
    'Gerencia',
    'Superintendencia',
    'Cargo'
  ];

  LUGARES = [
    'Sierra Gorda',
    'Oficina Central'
  ];
  response = [];

// tslint:disable-next-line: no-output-on-prefix
  @Output() onQuit = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  search_user( name: string ) {
    console.log(name);
    if (name.length < 3) {
      this.errorMessage = 'El parámetro de búsqueda no puede ser menor a 3 caracteres.';
      this.errorMessageDisplayed = true;
    }
  }

  toggleOptions() {
    $('.inner').slideToggle( 1000, function() {
    });
  }

  // Global configuration
  clickedInside($event: Event) {
    $event.preventDefault();
    $event.stopPropagation();  // <- esto detendrá la propagación
    console.log('Se clickeó dentro del container');
  }

}
