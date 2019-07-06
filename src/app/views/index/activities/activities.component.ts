import { Component, OnInit } from '@angular/core';
import { Activity } from 'src/app/interface/interface';
import { ActivityService } from 'src/app/providers/activity.service';
import { LoginService } from 'src/app/providers/login.service';
import { GoogleAnalyticsService } from 'src/app/providers/google-analytics.service';

declare var $: any;
declare var jsCalendar: any;

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
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {
  // Declarations
  dayselected: number;
  daynameselected: string;
  monthselected: string;
  activeCalendar: any;
  selectedActivity: Activity[] = [];
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
    'Nobiembre',
    'Diciembre',
  ];

  constructor(private as: ActivityService, public ls: LoginService, public ga: GoogleAnalyticsService) {
    this.dayselected = new Date().getDate();
    this.daynameselected = dayname[new Date().getDay()];
    this.jsCalendarSettings();
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
    const element = document.getElementById('my-calendar');
    // Create the calendar
    this.activeCalendar = jsCalendar.new(element, new Date(), {
      language: 'es',
      firstDayOfTheWeek: 2,
      monthFormat: 'MONTH',
      navigator: false
    });

    this.getActivities((new Date().getMonth() + 1), new Date().getFullYear());

    // Update view
    this.activeCalendar.onDateClick((event, _date: Date) => {
      this.dayselected = _date.getDate();
      this.daynameselected = dayname[_date.getDay()];
      this.loadDayActivity(_date);
    });
  }

  async getActivities(month: number, year: number) {
    await this.as.getActivitiesNumberByMonth(month, year)
      .then(
        (dias: number[]) => {
          // tslint:disable-next-line: prefer-const
          for (let dia of dias) {
            this.activeCalendar.colorfulSelect(dia + '/' + month + '/' + year, 'jsCalendar-colorful-orange')
          }
          this.selectedActivity = this.as.getActivityByDate(new Date());
        }
      );
  }

  // tslint:disable-next-line: variable-name
  loadDayActivity(_date: Date) {
    this.selectedActivity = this.as.getActivityByDate(_date);
  }

  async setInterest(id: number) {
    if (this.ls.isLoggedIn()) {
      await this.as.insertInterestAssistance(id, 1);
    }
  }

  async setAssistance(id: number) {
    if (this.ls.isLoggedIn()) {
      await this.as.insertInterestAssistance(id, 2);
    }
  }

  buttonValidator(actividad: Activity, _type: number): boolean {
    if (this.ls.isLoggedIn()) {
      if (actividad.interes_asistencia !== undefined ||
          actividad.interes_asistencia !== null ||
          actividad.interes_asistencia.length === 0) {
        if (actividad.interes_asistencia[_type].meinteresa) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  fillInfoActividad( _actividad: Activity, _type: number): number {
    if (this.ls.isLoggedIn()) {
      if (_actividad.interes_asistencia !== undefined ||
        _actividad.interes_asistencia !== null ||
        _actividad.interes_asistencia.length === 0) {
          return _actividad.interes_asistencia[_type].valor;
        } else {
          return null;
        }
    } else {
      return null;
    }
  }
}
