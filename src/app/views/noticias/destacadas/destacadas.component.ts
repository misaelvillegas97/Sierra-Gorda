import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-destacadas',
  templateUrl: './destacadas.component.html',
  styleUrls: ['./destacadas.component.scss']
})
export class DestacadasComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    AppComponent.prototype.subirScroll();
  }

}
