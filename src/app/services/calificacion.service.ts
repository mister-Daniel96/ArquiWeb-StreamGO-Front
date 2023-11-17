import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PromedioCalificacionDTO } from '../models/PromedioCalificacionDTO';

const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class CalificacionService {
  url = `${base_url}/calificacion`;
  constructor(private http: HttpClient) {}

  getPromedioCalificacion(id:number) {
    let token = sessionStorage.getItem('token');
    return this.http.get<PromedioCalificacionDTO[]>(`${this.url}/promedioCalificaciones?idcontenido=${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
}
