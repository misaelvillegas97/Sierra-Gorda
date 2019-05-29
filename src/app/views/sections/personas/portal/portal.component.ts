import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { fader, slider, fadeAnimation } from '../../../../../router-animations';
import { PortalService } from 'src/app/providers/portal.service';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent implements OnInit {

  constructor( private ps: PortalService ) {
    this.ps.loadDefaultVideo();
  }

  ngOnInit() {
  }

}
