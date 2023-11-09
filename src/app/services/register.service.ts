import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario';

const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  url: string = `${base_url}/usuarios`;

  listaCambio = new Subject<Usuario[]>();
  constructor(private http: HttpClient) {}


  list(){
    return this.http.get<Usuario[]>(this.url);
  }
  insert(usuario: Usuario) {
    return this.http.post(this.url, usuario);
  }

  setList(listaNueva:Usuario[]){
    return this.listaCambio.next(listaNueva);
  }
  getList(){
    return this.listaCambio.asObservable();
  }

  /**
   * @Definicion
   * Para un insert se hace un   insert-list-set
   */
}
