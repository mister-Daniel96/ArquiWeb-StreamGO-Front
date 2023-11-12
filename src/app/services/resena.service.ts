import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Resena } from '../models/resena';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResenaDTO } from '../models/resenaDTO';

const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class ResenaService {
  url = `${base_url}/resenas`;
  listaCambio = new Subject<Resena[]>();

  listaDTO=new Subject<ResenaDTO[]>();//agregado
  constructor(private http: HttpClient) {}

  list() {
    let token=sessionStorage.getItem('token')
    return this.http.get<Resena[]>(this.url,{
      headers:new HttpHeaders()
      .set('Authorization',`Bearer ${token}`)
      .set('Content-Type','application/json')
    });
  }
  insert(resena:Resena){
    let token=sessionStorage.getItem('token')
    return this.http.post(this.url,resena,
      {
        headers:new HttpHeaders()
        .set('Authorization',`Bearer ${token}`)
        .set('Content-Type','application/json')
      }
      )
  }

  setList(listaNueva: Resena[]) {
    return this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }

  listResenasDeContenido(id: number) {
    let token= sessionStorage.getItem('token'); //aunqeu sea de tipo any igual funciona any[]
    return this.http.get<ResenaDTO[]>(//no es exactamente igual al model, este es un query
      `${this.url}/resenasdeContenido?idcontenido=${id}`,
      {
        headers:new HttpHeaders()
        .set('Authorization',`Bearer ${token}`)
        .set('Content-Type','application/json')
      }
      
    )
    
  }
 /*  getListaDTO(){
      return this.listaDTO.asObservable();
  }
   */
}
