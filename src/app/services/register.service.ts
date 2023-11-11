import { Subject, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario';
import { TypeUsers } from '../models/typeUser';

const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  //PARA USUARIOS
  url: string = `${base_url}/usuarios/registerUser`;
  listaCambio = new Subject<Usuario[]>();
  //PARA ROLES
  urlRole: string = `${base_url}/typeUsers/registerRole`;
  listaCambioRoles = new Subject<TypeUsers[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Usuario[]>(this.url);
  }
  insert(usuario: Usuario) {
    return this.http.post(this.url, usuario);
  }

  setList(listaNueva: Usuario[]) {
    return this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  //PARA LOS ROLES
  /*
  listRoles() {
    return this.http.get<TypeUsers[]>(this.urlRole);
  }
  insertRoles(role: TypeUsers) {
    return this.http.post(this.urlRole, role);
  }
  setListRole(listaNueva: TypeUsers[]) {
    return this.listaCambioRoles.next(listaNueva);
  }
  getListRole() {
    return this.listaCambioRoles.asObservable();
  }
  
   * @Definicion
   * Para un insert se hace un   insert-list-set
   
  */
}
