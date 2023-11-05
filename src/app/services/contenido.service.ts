import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contenido } from '../models/contenido';

const base_url=environment.base;
@Injectable({
  providedIn: 'root'
})
export class ContenidoService {

  url=`${base_url}/contenidos`

  listaCambio=new Subject<Contenido[]>();
  constructor(private http:HttpClient) { }

  list(){
    return this.http.get<Contenido[]>(this.url);
  }
  insert(contenido:Contenido){
    return this.http.post(this.url,contenido);
  }
  setList(listaNueva:Contenido[]){
    return this.listaCambio.next(listaNueva);
  }
  getList(){
    return this.listaCambio.asObservable();
  }
  delete(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }
  listId(id:number){
    return this.http.get(`${this.url}/${id}`);
  }
  update(contenido:Contenido){
return this.http.put(this.url,contenido);
  }
}
