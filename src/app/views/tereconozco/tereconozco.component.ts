import { Component, OnInit } from '@angular/core';
import { ReconozcoService } from 'src/app/providers/reconozco.service';

@Component({
  selector: 'app-tereconozco',
  templateUrl: './tereconozco.component.html',
  styleUrls: ['./tereconozco.component.scss']
})
export class TereconozcoComponent implements OnInit {

  constructor(public rs: ReconozcoService) {
    this.rs.getAllReconocimientos();
  }

  ngOnInit() {
  }

}
