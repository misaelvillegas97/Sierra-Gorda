import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  nombreUsuario = 'Emilio';
  apellidoUsuario = 'Cárdenas Fuentes';

  constructor() { }

  ngOnInit() {
  }

}
