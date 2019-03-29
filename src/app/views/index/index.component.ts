import { Component, OnInit } from '@angular/core';

declare var jsCalendar: any;
const dayname = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {


  dayselected: number;
  daynameselected: string;
  monthselected: string;

  constructor() {
    this.dayselected = new Date().getDate();
    this.daynameselected = dayname[(new Date().getDay() - 1)];
  }

  ngOnInit() {
    this.jsCalendarLoader();
  }

  jsCalendarLoader() {
    let calendar = new jsCalendar();
    var element = document.getElementById('my-calendar');
    // Create the calendar
    let activeCalendar = jsCalendar.new(element, '01/01/2017', {
      language: 'es',
      firstDayOfTheWeek: 2,
      monthFormat: 'MONTH',
      navigator: false,


    });

    // ACTUALIZAR FECHA EN VISTA
    activeCalendar.onDateClick(
      (event, date: Date) => {
        this.dayselected = date.getDate();
        this.daynameselected = dayname[date.getDay()-1];
      }
    );
  }
}
