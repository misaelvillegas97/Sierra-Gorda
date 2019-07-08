import { Component, OnInit } from '@angular/core';
import { BrandingService } from 'src/app/providers/branding.service';
import { GoogleAnalyticsService } from 'src/app/providers/google-analytics.service';

@Component({
  selector: 'app-branding',
  templateUrl: './branding.component.html',
  styleUrls: ['./branding.component.scss']
})
export class BrandingComponent implements OnInit {

  selected: number;

  constructor( public fs: BrandingService, public ga: GoogleAnalyticsService ) {
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
