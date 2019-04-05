import { Component, OnInit, Output, EventEmitter } from '@angular/core';

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

}
