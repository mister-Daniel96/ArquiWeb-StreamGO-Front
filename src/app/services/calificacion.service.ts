import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PromedioCalificacionDTO } from '../models/PromedioCalificacionDTO';
import { Calificacion } from '../models/calificacion';

const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class CalificacionService {
  url = `${base_url}/calificacion`;

  listaCambio= new Subject<Calificacion[]>();
  constructor(private http: HttpClient) {}

  getPromedioCalificacion(id:number) {
    let token = sessionStorage.getItem('token');
    return this.http.get<PromedioCalificacionDTO[]>(`${this.url}/promedioCalificaciones?idcontenido=${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  list() {
    let token=sessionStorage.getItem('token')
    return this.http.get<Calificacion[]>(this.url,
      {
        headers:new HttpHeaders()
        .set('Authorization',`Bearer ${token}`)
        .set('Content-Type','application/json')
      }
      );

  }
  insert(c: Calificacion) {
    let token=sessionStorage.getItem('token')
    return this.http.post(this.url, c,
      {
        headers:new HttpHeaders()
        .set('Authorization',`Bearer ${token}`)
        .set('Content-Type','application/json')
      }
      );
  }
  setList(listaNueva: Calificacion[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  delete(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }
  listId(id:number){
    return this.http.get<Calificacion>(`${this.url}/${id}`);
  }
  update(calificacion:Calificacion){
    return this.http.put(this.url,calificacion);
  }
}
