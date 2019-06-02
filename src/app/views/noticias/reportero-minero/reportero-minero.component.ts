import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-reportero-minero',
  templateUrl: './reportero-minero.component.html',
  styleUrls: ['./reportero-minero.component.scss']
})
export class ReporteroMineroComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    AppComponent.prototype.subirScroll();
  }

}
