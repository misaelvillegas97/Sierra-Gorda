import { Component, OnInit, AfterContentInit } from '@angular/core';

@Component({
  selector: 'app-nuestra-empresa',
  templateUrl: './nuestra-empresa.component.html',
  styleUrls: ['./nuestra-empresa.component.scss']
})
export class NuestraEmpresaComponent implements OnInit, AfterContentInit {

  // loaded: boolean;

  constructor() {
    // this.loaded = false;
  }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    // setTimeout(() => {
    //   this.loaded = true;
    // }, 1000);
  }

}
