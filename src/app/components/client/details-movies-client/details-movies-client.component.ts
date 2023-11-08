import { ContenidoService } from './../../../services/contenido.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contenido } from 'src/app/models/contenido';

@Component({
  selector: 'app-details-movies-client',
  templateUrl: './details-movies-client.component.html',
  styleUrls: ['./details-movies-client.component.css'],
})
export class DetailsMoviesClientComponent implements OnInit {
  movieId: number = 0;
  movie: Contenido = new Contenido();
  url: string="";

  constructor(
    private route: ActivatedRoute,
    private cS: ContenidoService,
  ) {}

  ngOnInit(): void {
    
    this.movieId = +this.route.snapshot.params['id'];
    this.cS.listId(this.movieId).subscribe((data) => {
      this.movie = data;
    });
    this.url=this.movie.urlContenido;
    
  }
}