import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contenido } from 'src/app/models/contenido';
import { ContenidoService } from 'src/app/services/contenido.service';

@Component({
  selector: 'app-list-movies-client',
  templateUrl: './list-movies-client.component.html',
  styleUrls: ['./list-movies-client.component.css']
})
export class ListMoviesClientComponent implements OnInit{
  
  listaContenidos:Contenido[]=[];
  idParent:number=0;
  constructor(private cS: ContenidoService, private route:ActivatedRoute) {}

  ngOnInit(): void {
    this.route.parent?.params.subscribe(data=>{
      this.idParent=data['id']
    })
    this.cS.list().subscribe((data) => {
      this.listaContenidos = data; //paso todos los datos a la data
    });
   
    this.cS.getList().subscribe((data) => {
      this.listaContenidos = data; //paso todos los datos a la data
    });
   
  }
  
}
