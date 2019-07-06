import { Component, OnInit, Output, EventEmitter, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { ProfileService } from '../../../providers/profile.service';
import { UsuarioBuscar } from 'src/app/interface/interface';

declare var $: any;
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, OnDestroy {
  errorMessage = '';
  errorMessageDisplayed = false;

  noUsers = 'No se han encontrado trabajadores llamados';
  noUsersDisplayed = false;

  findedUsers: UsuarioBuscar[] = [];

  @ViewChild('cargoSelect') cargo: ElementRef;
  @ViewChild('lugarSelect') lugar: ElementRef;
  @ViewChild('gerenciaSelect') gerencia: ElementRef;

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

  constructor( public ps: ProfileService ) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.deleteSearchMessages();
  }

  toggleOptions() {
    $('.inner').slideToggle( 1000, () => {
    });
  }

  // Global configuration
  clickedInside($event: Event) {
    $event.preventDefault();
    $event.stopPropagation();  // <- esto detendrá la propagación
  }

  async search(nombre: string) {
    if (nombre.trim().length < 4) {
      this.errorMessage = '* El parámetro de búsqueda no puede ser menor a 3 caracteres';
      this.errorMessageDisplayed = true;
      return false;
    }
    this.errorMessageDisplayed = false;
    this.findedUsers = [];
    this.findedUsers = await this.ps.search(
      nombre.trim(),
      this.cargo.nativeElement.value.toString(),
      this.lugar.nativeElement.value.toString(),
      this.gerencia.nativeElement.value.toString());
    if (this.findedUsers.length === 0) {
      this.noUsers = 'No se han encontrado trabajadores llamados ' + nombre;
      this.noUsersDisplayed = true;
    }
  }

  deleteSearchMessages() {
    this.noUsersDisplayed = false;
    this.errorMessageDisplayed = false;

    this.findedUsers = [];
  }

}
