import { Component, OnInit } from '@angular/core';
import { BrandingService } from 'src/app/providers/branding.service';

@Component({
  selector: 'app-branding',
  templateUrl: './branding.component.html',
  styleUrls: ['./branding.component.scss']
})
export class BrandingComponent implements OnInit {

  selected: number;

  constructor( public fs: BrandingService ) {
    this.selected = -1;
    this.fs.getAllBranding();
    this.fs.getAllCategories();
  }

  ngOnInit() {
  }

  selectCategoria(_i: number) {
    this.selected = _i;
  }

}
