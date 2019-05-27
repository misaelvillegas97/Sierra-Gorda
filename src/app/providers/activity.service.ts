import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseNumberActivityByMonth, Activity, ResponseInterestAssistance } from '../interface/interface';
import { LoginService } from './login.service';

const URL = 'http://c3wsapi.cl:2200/sg/actividades/';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  actividadesList: Activity[] = [];
  activitiesPerMonth: number[];
  activityPerDay: number;
  fechap = new Date('12-4-2012');

  constructor(private http: HttpClient, private ls: LoginService) {
    // this.getactivitiesPerMonthByMonth(4, 2019);
  }

  async getActivitiesNumberByMonth(month: number, year: number) {
    this.actividadesList = [];
    this.activitiesPerMonth = [];
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
              if (this.ls.isLoggedIn()) {
                this.http.get( URL + 'getinteresasistencia/' + actividadDetalle.id + '/' + atob(localStorage.getItem('sg-userID')))
                .toPromise()
                .then(
                  (res: ResponseInterestAssistance) => {
                    if (res.err) {
                      return;
                    }
                    actividadDetalle.interes_asistencia = res.actividad;
                    return;
                  }
                );
              }
            }
          }
        })
        .catch(
          err => {
            switch (err.status) {
              case 0:
                //alert('0 - Error trying to connect WebService <<http://c3wsapi.cl>> | Obtener actividades');
                break;
              case 404:
                //alert('404 - Page doesn\'t exist <<http://c3wsapi.cl>> | Obtener actividades');
                break;
              case 500:
                //alert('500 - Error on code <<http://c3wsapi.cl>> | Obtener actividades');
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

  insertInterestAssistance(_id: number, _type: number) {
    // Type 1: Interest
    // Type 2: Assistance

    const DATA: object = {
      id_usuario: atob(localStorage.getItem('sg-userID')),
      id_actividad: _id,
      tipo: _type
    };

    this.http.post( URL + 'agregarinteresasistencia/', DATA )
      .toPromise()
      .then(
        (res) => {
          console.log(res);
        }
      );
  }
}
