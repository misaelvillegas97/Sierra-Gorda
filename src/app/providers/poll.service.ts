import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Poll, ResponsePolls } from '../interface/interface';
import { LoginService } from './login.service';

const URL = 'https://c3wsapi.cl/sg/';

@Injectable({
  providedIn: 'root'
})
export class PollService {
  pollList: Poll[];

  constructor( private ls: LoginService, private http: HttpClient ) {
  }

  async getAllEncuestas() {
    return await this.http.get(URL + 'encuesta/getencuestasactivas/' + atob(localStorage.getItem('sg-userID')))
      .toPromise()
      .then(
        (res: ResponsePolls) => {
          this.pollList = res.encuestas;
          return this.pollList;
          // console.table(this.pollList);
        }
      )
      .catch(
        err => {
          switch (err.status) {
            case 0:
              //alert('0 - Error trying to connect WebService <<http://c3wsapi.cl>> | Encuestas');
              break;
            case 404:
              //alert('404 - Page doesn\'t exist <<http://c3wsapi.cl>> | Encuestas');
              break;
            case 500:
              //alert('500 - Error on code <<http://c3wsapi.cl>> | Encuestas');
              break;
          }
          return [];
        }
      );
  }
}
