import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contenido } from 'src/app/models/contenido';
import { ContenidoService } from 'src/app/services/contenido.service';

@Component({
  selector: 'app-view-movies-client',
  templateUrl: './view-movies-client.component.html',
  styleUrls: ['./view-movies-client.component.css']
})
export class ViewMoviesClientComponent {
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
