import { Component, OnInit } from '@angular/core';
import { Contenido } from 'src/app/models/contenido';
import { ContenidoService } from 'src/app/services/contenido.service';

@Component({
  selector: 'app-list-movies-client',
  templateUrl: './list-movies-client.component.html',
  styleUrls: ['./list-movies-client.component.css']
})
export class ListMoviesClientComponent implements OnInit{
  
  listaContenidos:Contenido[]=[];
  constructor(private cS: ContenidoService) {}

  ngOnInit(): void {
    this.cS.list().subscribe((data) => {
      this.listaContenidos = data; //paso todos los datos a la data
    });
   
  }
}
