import { Component, OnInit } from '@angular/core';
import { CumpleañosService } from 'src/app/providers/cumpleaños.service';

declare var $: any;
declare var jsCalendar: any;

declare var MasterSlider: any;

const dayname = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miercoles',
  'Jueves',
  'Viernes',
  'Sabado'
];

@Component({
  selector: 'app-cumpleanios',
  templateUrl: './cumpleanios.component.html',
  styleUrls: ['./cumpleanios.component.scss']
})
export class CumpleaniosComponent implements OnInit {
  dayselected: number;
  daynameselected: string;
  monthselected: string;
  activeCalendar: any;
  months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

  constructor(public cs: CumpleañosService) {
    this.dayselected = new Date().getDate();
    this.monthselected = this.months[new Date().getMonth()];
    this.daynameselected = dayname[new Date().getDay()];
    this.jsCalendarSettings();
    this.cs.getAllBirth(3);
    this.getDiasCumple((new Date().getMonth() + 1), (new Date().getFullYear()));
  }

  ngOnInit() {
    this.jsCalendarLoader();
  }

  jsCalendarSettings() {
    jsCalendar.prototype.colorfulSelect = function(dates: any[], color: any) {
      if (typeof dates === 'undefined') {
        return this;
      }

      if (!(dates instanceof Array)) {
        dates = [dates];
      }

      this._colorful_saveDates(dates, color);
      this._selectDates(dates);

      if (!this._colorful_patched) {
        this._colorful_patched = this.refresh;
        this.refresh = function (date) {
          this._colorful_patched(date);
          this._colorful_update();
          return this;
        };
      }

      this.refresh();

      return this;
    };

    jsCalendar.prototype._colorful_saveDates = function(dates, color) {
      dates = dates.slice();

      for (let i = 0; i < dates.length; i++) {
        dates[i] = this._parseDate(dates[i]);
        dates[i].setHours(0, 0, 0, 0);
        dates[i] = dates[i].getTime();
      }

      if (typeof this._colorful_colors === 'undefined') {
        this._colorful_colors = {};
      }

      for (let i = dates.length - 1; i >= 0; i--) {
        this._colorful_colors[dates[i]] = color;
      }
    };

    jsCalendar.prototype._colorful_update = function() {
      // tslint:disable-next-line: prefer-const
      let month = this._getVisibleMonth(this._date);

      let timestamp;
      for (let i = month.days.length - 1; i >= 0; i--) {
        timestamp = month.days[i].getTime();
        if (this._selected.indexOf(timestamp) >= 0 && this._colorful_colors.hasOwnProperty(timestamp)) {
          this._elements.bodyCols[i].className = 'jsCalendar-selected' + ' ' + this._colorful_colors[timestamp];
        }
      }
    };
  }

  jsCalendarLoader() {
    const element = document.getElementById('cumple-calendar');
    // Create the calendar
    this.activeCalendar = jsCalendar.new(element, new Date(), {
      language: 'es',
      firstDayOfTheWeek: 2,
      monthFormat: 'MONTH',
      navigator: true
    });

    // this.getCumple((new Date().getMonth() + 1), new Date().getFullYear());

    // Update view
    this.activeCalendar.onDateClick(( event: any, _date: Date ) => {
      this.dayselected = _date.getDate();
      this.daynameselected = dayname[_date.getDay()];
      this.monthselected = this.months[_date.getMonth()];
      this.cs.getAllBirth(3, _date);
      // this.loadDayActivity(_date);
    });

    // Update month
    this.activeCalendar.onMonthChange(( event: any, _date: Date ) => {
      this.getDiasCumple( _date.getMonth() + 1, _date.getFullYear() );
      console.log(_date.getMonth() + 1);
    });
  }

  async getDiasCumple(month: number, year: number) {
    await this.cs.getCumpleDays(month)
      .then(
        (dias: number[]) => {
          // tslint:disable-next-line: prefer-const
          for (let dia of dias) {
            this.activeCalendar.colorfulSelect(dia + '/' + month + '/' + year, 'jsCalendar-colorful-yellow');
          }
          // this.selectedActivity = this.as.getActivityByDate(new Date());
        }
      );
  }

  loadDayActivity(_date: Date) {
    // this.selectedActivity = this.as.getActivityByDate(_date);
  }

}
