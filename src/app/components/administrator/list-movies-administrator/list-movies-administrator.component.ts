import { Component, OnInit } from '@angular/core';
import { Contenido } from 'src/app/models/contenido';
import { ContenidoService } from 'src/app/services/contenido.service';

@Component({
  selector: 'app-list-movies-administrator',
  templateUrl: './list-movies-administrator.component.html',
  styleUrls: ['./list-movies-administrator.component.css'],
})
export class ListMoviesAdministratorComponent implements OnInit {

  listaContenidos:Contenido[]=[];
  constructor(private cS: ContenidoService) {}

  ngOnInit(): void {
    this.cS.list().subscribe((data) => {
      this.listaContenidos = data; //paso todos los datos a la data
    });
   
  }
}
