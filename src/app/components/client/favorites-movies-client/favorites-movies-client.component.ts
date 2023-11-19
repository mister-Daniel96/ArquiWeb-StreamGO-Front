import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contenido } from 'src/app/models/contenido';
import { ContenidoService } from 'src/app/services/contenido.service';

@Component({
  selector: 'app-favorites-movies-client',
  templateUrl: './favorites-movies-client.component.html',
  styleUrls: ['./favorites-movies-client.component.css'],
})
export class FavoritesMoviesClientComponent implements OnInit {
  peliculasFavoritas: Contenido[] = [];
  idParent: number = 0;
  constructor(private cS: ContenidoService, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.parent?.params.subscribe((data) => {
      this.idParent = data['id'];
    });

    this.cS.getContenidoFavorito(this.idParent).subscribe((data) => {
      this.peliculasFavoritas = data;
      console.log(this.peliculasFavoritas)
    });
  }
}
