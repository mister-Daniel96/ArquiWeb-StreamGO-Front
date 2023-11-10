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

  dataSource: MatTableDataSource<Resena> = new MatTableDataSource<Resena>();
  displayedColumns: string[] = ['textResena', 'dateResena'];

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
    
    this.movieId = +this.route.snapshot.params['id'];
    this.cS.listId(this.movieId).subscribe((data) => {
      this.movie = data;
    });
    this.obtenerComentariosDePelicula(this.movieId);
    const urlInsegura = this.movie.urlContenido // Reemplaza esto con tu URL

    // Marca la URL como segura
    this.urlSegura = this.sanitizer.bypassSecurityTrustResourceUrl(urlInsegura);
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
