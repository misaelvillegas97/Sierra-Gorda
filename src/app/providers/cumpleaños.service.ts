import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CumpleañosService {

  constructor(private http: HttpClient) {
    this.getAllBirth();
  }

  getAllBirth() {
    this.http.get('http://c3wsapi.cl:2200/sg/usuario/usuario_mesdia/04/18')
      .toPromise()
      .then(
        res => {
          console.log(res);
        }
      );
  }
}
