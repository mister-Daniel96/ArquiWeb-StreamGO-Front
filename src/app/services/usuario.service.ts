import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  url = `${base_url}/usuarios`;
  listaCambio = new Subject<Usuario[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Usuario[]>(this.url);
  }
  listClient(){
    return this.http.get<Usuario[]>(`${this.url}/usuariosroluser`);
  }
  insert(usuario: Usuario) {
    return this.http.post(this.url, usuario);
  }
  update(usuario: Usuario) {
    return this.http.put(this.url, usuario);
  }
  listId(id: number) {
    return this.http.get<Usuario>(`${this.url}/${id}`);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  setList(listaNueva:Usuario[]){
    return this.listaCambio.next(listaNueva);
  }
  getList(){
    return this.listaCambio.asObservable();
  }
}
