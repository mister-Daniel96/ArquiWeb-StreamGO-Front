import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Support } from '../models/support';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CantidadSupportMesDTO } from '../models/cantidadSupportMesDTO';

const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class SupportService {
  url = `${base_url}/supports`;
  listaCambio = new Subject<Support[]>();
  constructor(private http: HttpClient) {}

  list() {
    let token = sessionStorage.getItem('token');
    return this.http.get<Support[]>(this.url,
      {
        headers:new HttpHeaders()
        .set('Authorization',`Bearer ${token}`)
        .set('Content-Type','application/json')
      }
      );
  }
  insert(support: Support) {
    let token = sessionStorage.getItem('token');
    return this.http.post(this.url, support,
      {
        headers:new HttpHeaders()
        .set('Authorization',`Bearer ${token}`)
        .set('Content-Type','application/json')
      });
  }

  setList(nuevaLista: Support[]) {
    return this.listaCambio.next(nuevaLista);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  delete(id: number) {
    let token = sessionStorage.getItem('token');
    return this.http.delete(`${this.url}/${id}`,
    {
      headers:new HttpHeaders()
      .set('Authorization',`Bearer ${token}`)
      .set('Content-Type','application/json')
    }); //ruta
  }
  listId(id: number) {
    let token = sessionStorage.getItem('token');
    return this.http.get<Support>(`${this.url}/${id}`,
    {
      headers:new HttpHeaders()
      .set('Authorization',`Bearer ${token}`)
      .set('Content-Type','application/json')
    }); //ruta
  }
  update(support: Support) {
    let token = sessionStorage.getItem('token');
    //es lo mismo que el insert pero con put
    return this.http.put(this.url, support,{
      headers:new HttpHeaders()
      .set('Authorization',`Bearer ${token}`)
      .set('Content-Type','application/json')
    });
  }

  getQuantitySupportMesDTO(){

    let token=sessionStorage.getItem('token')
    return this.http.get<CantidadSupportMesDTO[]>(`${this.url}/supportMes`,{
      headers:new HttpHeaders()
      .set('Authorization',`Bearer ${token}`)
      .set('Content-Type','application/json')
    })
  }
}
