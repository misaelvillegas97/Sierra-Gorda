import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseNumberActivityByMonth, Activity } from '../interface/interface';

const URL = 'http://c3wsapi.cl:2200/sg/actividades/';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  actividadesList: Activity[] = [];
  activitiesPerMonth: number[];
  activityPerDay: number;
  fechap = new Date('12-4-2012');

  constructor(private http: HttpClient) {
    // this.getactivitiesPerMonthByMonth(4, 2019);
  }

  async getActivitiesNumberByMonth(month: number, year: number) {
    await this.http.get(URL + `getdiasconactividadeslist/${
      year
      }/${
      month.toString().length !== 1 ? month : '0' + month.toString()
      }`)
      .toPromise()
      .then(
        (res: ResponseNumberActivityByMonth) => {
          this.activitiesPerMonth = [];

          // tslint:disable-next-line: prefer-const
          for (let actividad of res.actividades) {
            this.activitiesPerMonth.push(actividad.dia);
            this.activityPerDay = actividad.cantidad_eventos;

            // tslint:disable-next-line: prefer-const
            for (let actividadDetalle of actividad.evento ) {
              actividadDetalle.fecha_actividad = new Date(actividadDetalle.fecha_actividad);
              this.actividadesList.push(actividadDetalle);
            }
          }
        })
        .catch(
          err => {
            switch (err.status) {
              case 0:
                alert('0 - Error trying to connect WebService <<http://c3wsapi.cl>> | Obtener actividades');
                break;
              case 404:
                alert('404 - Page doesn\'t exist <<http://c3wsapi.cl>> | Obtener actividades');
                break;
              case 500:
                alert('500 - Error on code <<http://c3wsapi.cl>> | Obtener actividades');
                break;
            }
            return [];
          }
        );
    return this.activitiesPerMonth;
  }

  getActivitiesById(_id: number): Activity {
    let selectedActivity: Activity;

    selectedActivity = this.actividadesList.find(
      actividad => actividad.id === _id
    );

    return selectedActivity;
  }

  getActivityByDate(_date: Date) {
    let selectedActivity: Activity[];

    selectedActivity = this.actividadesList.filter(
      actividad => actividad.fecha_actividad.getDate() === _date.getDate()
    );

    return selectedActivity;
  }
}
