import { Resena } from './../../../models/resena';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contenido } from 'src/app/models/contenido';
import { ContenidoService } from 'src/app/services/contenido.service';
import { MatTableDataSource } from '@angular/material/table';
import { ResenaService } from 'src/app/services/resena.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-view-movies-client',
  templateUrl: './view-movies-client.component.html',
  styleUrls: ['./view-movies-client.component.css']
})
export class ViewMoviesClientComponent {

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  displayedColumns: string[] = ['name_usuario', 'text_resena', 'dateResena'];

  movieId: number = 0;
  movie: Contenido = new Contenido();
  urlSegura: SafeResourceUrl="";

  constructor(
    private route: ActivatedRoute,
    private cS: ContenidoService,
    private rS: ResenaService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    
    this.obtenerPelicula();

    this.obtenerComentariosDePelicula(this.movieId);

    this.limpiarurl();
  }
  
  //Kurt
  obtenerPelicula()
  {
    this.movieId = +this.route.snapshot.params['id'];
    this.cS.listId(this.movieId).subscribe((data) => {
      this.movie = data;
    });
  }
  
  obtenerComentariosDePelicula(movieId: number) {
    
    this.rS.listresenasdecontenido(movieId).subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  limpiarurl()
  {
    const urlInsegura = this.movie.urlContenido

    // Marca la URL como segura
    this.urlSegura = this.sanitizer.bypassSecurityTrustResourceUrl(urlInsegura);
  }
}
