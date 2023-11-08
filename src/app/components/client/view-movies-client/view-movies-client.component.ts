import { Resena } from './../../../models/resena';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contenido } from 'src/app/models/contenido';
import { ContenidoService } from 'src/app/services/contenido.service';
import { MatTableDataSource } from '@angular/material/table';
import { ResenaService } from 'src/app/services/resena.service';

@Component({
  selector: 'app-view-movies-client',
  templateUrl: './view-movies-client.component.html',
  styleUrls: ['./view-movies-client.component.css']
})
export class ViewMoviesClientComponent {

  dataSource: MatTableDataSource<Resena> = new MatTableDataSource<Resena>();
  displayedColumns: string[] = ['textResena', 'dateResena'];

  movieId: number = 0;
  movie: Contenido = new Contenido();

  constructor(
    private route: ActivatedRoute,
    private cS: ContenidoService,
    private rS: ResenaService,
  ) {}

  ngOnInit(): void {
    
    this.movieId = +this.route.snapshot.params['id'];
    this.cS.listId(this.movieId).subscribe((data) => {
      this.movie = data;
    });
    this.obtenerComentariosDePelicula(this.movieId);
  }
  
  //Kurt gaaaaaaa
  obtenerComentariosDePelicula(movieId: number) {
    this.rS.list().subscribe((Resena) => {
      // Filtrar los comentarios relacionados con la película actual
      const resenasdecontenido = Resena.filter(
        (Resena) => Resena.contenido.idContenido === movieId
      );
      // Asignar los comentarios a la fuente de datos de la tabla
      this.dataSource.data = resenasdecontenido;
    });
  }
}
