import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-comiteparitario',
  templateUrl: './comiteparitario.component.html',
  styleUrls: ['../seguridad.component.scss']
})
export class ComiteparitarioComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    AppComponent.prototype.subirScroll();
  }

}
