import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Calificacion } from '../models/calificacion';
import { PromedioCalificacionesDTO } from '../models/PromedioCalificacionesDTO';
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

  promediocalificaciondecontenido(id: number) {
    let token= sessionStorage.getItem('token'); //aunqeu sea de tipo any igual funciona any[]
    return this.http.get<PromedioCalificacionesDTO[]>(//no es exactamente igual al model, este es un query
      `${this.url}/promedioCalificaciones?idcontenido=${id}}`,
      {
        headers:new HttpHeaders()
        .set('Authorization',`Bearer ${token}`)
        .set('Content-Type','application/json')
      }
      
    )
    
  }
}
