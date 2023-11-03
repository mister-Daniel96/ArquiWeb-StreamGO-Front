import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Support } from '../models/support';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class SupportService {
  url = `${base_url}/supports`;
  listaCambio = new Subject<Support[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Support[]>(this.url);
  }
  insert(support: Support) {
    return this.http.post(this.url, support);
  }

  setList(nuevaLista: Support[]) {
    return this.listaCambio.next(nuevaLista);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);//ruta
  }
  listId(id: number) {
    return this.http.get<Support>(`${this.url}/${id}`);//ruta
  }
  update(support: Support) {
    //es lo mismo que el insert pero con put
    return this.http.put(this.url, support);
  }
}
