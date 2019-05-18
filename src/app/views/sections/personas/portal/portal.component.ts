import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { fader, slider, fadeAnimation } from '../../../../../router-animations';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss'],
  animations: [ // <-- add your animations here
    // fader
    // slider
    fadeAnimation
  ]
})
export class PortalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

}
