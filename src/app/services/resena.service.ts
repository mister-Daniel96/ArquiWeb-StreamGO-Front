import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Resena } from '../models/resena';
const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class ResenaService {
  private url = `${base_url}/resenas`;
  private listaCambio = new Subject<Resena[]>();
  constructor(private http: HttpClient) { }
  list() {
    return this.http.get<Resena[]>(this.url);
  }
  insert(r: Resena) {
    return this.http.post(this.url, r);
  }
  setList(listaNueva: Resena[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  delete(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }
  listId(id:number){
    return this.http.get<Resena>(`${this.url}/${id}`);
  }
  update(resena:Resena){
    return this.http.put(this.url,resena);
  }
  listresenasdecontenido(id:number){
    return this.http.get<any[]>(`${this.url}/resenasdeContenido?idcontenido=${id}`);
  }
}