import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ListaDeReproduccion } from '../models/listadereproduccion';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class ListaDeReproduccionService {
  url = `${base_url}/ListaDeReproduccion`;
  listaCambio = new Subject<ListaDeReproduccion[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<ListaDeReproduccion[]>(this.url);
  }
  insert(listadereproduccion: ListaDeReproduccion) {
    return this.http.post(this.url, listadereproduccion);
  }
  update(listadereproduccion: ListaDeReproduccion) {
    return this.http.put(this.url, listadereproduccion);
  }
  listId(id: number) {
    return this.http.get<ListaDeReproduccion>(`${this.url}/${id}`);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  setList(listaNueva:ListaDeReproduccion[]){
    return this.listaCambio.next(listaNueva);
  }
  getList(){
    return this.listaCambio.asObservable();
  }
}
