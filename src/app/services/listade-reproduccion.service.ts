import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ListaDeReproduccion } from '../models/listaDeReproduccion';

const base_url=environment.base;
@Injectable({
  providedIn: 'root'
})
export class ListadeReproduccionService {

  url=`${base_url}/ListaDeReproduccion`
  listaCambio=new Subject<ListaDeReproduccion[]>();
  constructor(private http:HttpClient) { }

  list() {
    return this.http.get<ListaDeReproduccion[]>(this.url);
  }
  insert(lista: ListaDeReproduccion) {
    return this.http.post(this.url, lista);
  }

  setList(nuevaLista: ListaDeReproduccion[]) {
    return this.listaCambio.next(nuevaLista);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);//ruta
  }
  listId(id: number) {
    return this.http.get<ListaDeReproduccion>(`${this.url}/${id}`);//ruta
  }
  update(lista: ListaDeReproduccion) {
    //es lo mismo que el insert pero con put
    return this.http.put(this.url, lista);
  }
}
