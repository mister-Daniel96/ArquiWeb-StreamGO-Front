import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contenido } from 'src/app/models/contenido';
import { ContenidoService } from 'src/app/services/contenido.service';
import { ListadeReproduccionService } from 'src/app/services/listade-reproduccion.service';

@Component({
  selector: 'app-favorites-movies-client',
  templateUrl: './favorites-movies-client.component.html',
  styleUrls: ['./favorites-movies-client.component.css'],
})
export class FavoritesMoviesClientComponent implements OnInit {
  peliculasFavoritas: Contenido[] = [];
  idParent: number = 0;
  constructor(
    private cS: ContenidoService,
    private route: ActivatedRoute,
    private lrS: ListadeReproduccionService
  ) {}
  ngOnInit(): void {
    this.route.parent?.params.subscribe((data) => {
      this.idParent = data['id'];
    });

    this.cS.getContenidoFavorito(this.idParent).subscribe((data) => {
      this.peliculasFavoritas = data;
    });
  }

  eliminar(idContenido: number) {
    //uso este metodo porque asi le dare una orden ya que suscribe es asincrono
    this.lrS
      .deleteContenidoDeLista(this.idParent, idContenido)
      .subscribe((data) => {
        this.cS.list().subscribe((data) => {
          this.cS.setList(data);

          setTimeout(() => {
            this.cS.getContenidoFavorito(this.idParent).subscribe((data) => {
              this.peliculasFavoritas = data;
              console.log(this.peliculasFavoritas);
            });
          }, 0);
        });
      });
   
   
  }
}
