import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseNumberActivityByMonth, Activity } from '../interface/interface';

const URL = 'http://c3wsapi.cl:2200/sg/actividades/';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  actividadesList: Activity[] = [];
  activitiesNumber: number[];
  fechap = new Date('12-4-2012');

  constructor(private http: HttpClient) {
    // this.getActivitiesNumberByMonth(4, 2019);
  }

  async getActivitiesNumberByMonth(month: number, year: number) {
    await this.http.get(URL + `getdiasconactividades/${
      year
      }/${
      month.toString().length !== 1 ? month : '0' + month.toString()
      }`)
      .toPromise()
      .then(
        (res: ResponseNumberActivityByMonth) => {
          this.activitiesNumber = [];

          this.activitiesNumber = res.dias;
        }
      );
    return this.activitiesNumber;
  }

  getActivitiesById(_id: number): Activity {
    let selectedActivity: Activity;

    selectedActivity = this.actividadesList.find(
      actividad => actividad.id === _id
    );

    return selectedActivity;
  }

  getActivityByDate() {

  }
}
