import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Resena } from '../models/resena';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class ResenaService {
  url = `${base_url}/resenas`;
  listaCambio = new Subject<Resena[]>();
  constructor(private http: HttpClient) {}

  list() {
    let token=sessionStorage.getItem('token')
    return this.http.get<Resena[]>(this.url,{
      headers:new HttpHeaders()
      .set('Authorization',`Bearer ${token}`)
      .set('Content-Type','application/json')
    });
  }

  setList(listaNueva: Resena[]) {
    return this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }

  listResenasDeContenido(id: number) {
    let token= sessionStorage.getItem('token');
    return this.http.get<any[]>(//no es exactamente igual al model, este es un query
      `${this.url}/resenasdeContenido?idContenido=${id}`,
      {
        headers:new HttpHeaders()
        .set('Authorization',`Bearer ${token}`)
        .set('Content-Type','application/json')
      }
    );
  }
}
