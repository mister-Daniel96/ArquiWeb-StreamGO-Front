import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  list() {let token=sessionStorage.getItem('token')
    return this.http.get<ListaDeReproduccion[]>(this.url ,{
      headers:new HttpHeaders()
      .set('Authorization',`Bearer ${token}`)
      .set('Content-Type','application/json')
    });
  }
  insert(lista: ListaDeReproduccion) {
    let token=sessionStorage.getItem('token')
    return this.http.post(this.url, lista,{
      headers:new HttpHeaders()
      .set('Authorization',`Bearer ${token}`)
      .set('Content-Type','application/json')
    });
  }

  setList(nuevaLista: ListaDeReproduccion[]) {
    return this.listaCambio.next(nuevaLista);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  delete(id: number) {
    let token=sessionStorage.getItem('token')
    return this.http.delete(`${this.url}/${id}`,{
      headers:new HttpHeaders()
      .set('Authorization',`Bearer ${token}`)
      .set('Content-Type','application/json')
    });//ruta
  }
  listId(id: number) {
    let token=sessionStorage.getItem('token')
    return this.http.get<ListaDeReproduccion>(`${this.url}/${id}`,{
      headers:new HttpHeaders()
      .set('Authorization',`Bearer ${token}`)
      .set('Content-Type','application/json')
    });//ruta
  }
  update(lista: ListaDeReproduccion) {
    let token=sessionStorage.getItem('token')
    //es lo mismo que el insert pero con put
    return this.http.put(this.url, lista,{
      headers:new HttpHeaders()
      .set('Authorization',`Bearer ${token}`)
      .set('Content-Type','application/json')
    });
  }
}
