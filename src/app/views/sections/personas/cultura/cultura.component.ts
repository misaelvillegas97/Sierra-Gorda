import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cultura',
  templateUrl: './cultura.component.html',
  styleUrls: ['./cultura.component.scss']
})
export class CulturaComponent implements OnInit {
  valueSelected = '';

  constructor() {}
  
  ngOnInit() {
    this.valueSelected = 'default'
  }

  console(e: any) {
    console.log(e);
  }

}
