import { Component, OnInit } from '@angular/core';

declare var jsCalendar: any;
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    this.jsCalendarLoader();
  }

  jsCalendarLoader() {
    let calendar = new jsCalendar();
    var element = document.getElementById('my-calendar');
    // Create the calendar
    jsCalendar.new(element, '01/01/2017', {
      language: 'es',
      firstDayOfTheWeek: 2,
      monthFormat: 'month YYYY'
    });
  }
}
