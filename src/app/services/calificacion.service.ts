import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Calificacion } from '../models/calificacion';
const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class CalificacionService {

  private url = `${base_url}/calificacion`;
  private listaCambio = new Subject<Calificacion[]>();
  constructor(private http: HttpClient) { }
  list() {
    return this.http.get<Calificacion[]>(this.url);
  }
  insert(c: Calificacion) {
    return this.http.post(this.url, c);
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
  promediocalificaciondecontenido(id:number){
    return this.http.get<any[]>(`${this.url}/promedioCalificaciones?idcontenido=${id}`);
  }
}
