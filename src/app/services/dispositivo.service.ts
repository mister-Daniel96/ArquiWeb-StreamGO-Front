import { Dispositivo } from './../models/dispositivo';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class DispositivoService {
  url = `${base_url}/dispositivos`;
  listaCambio = new Subject<Dispositivo[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Dispositivo[]>(this.url);
  }
  insert(dispositivo: Dispositivo) {
    return this.http.post(this.url, dispositivo);
  }
  update(dispositivo: Dispositivo) {
    return this.http.put(this.url, dispositivo);
  }
  listId(id: number) {
    return this.http.get<Dispositivo>(`${this.url}/${id}`);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  setList(listaNueva:Dispositivo[]){
    return this.listaCambio.next(listaNueva);
  }
  getList(){
    return this.listaCambio.asObservable();
  }
}
