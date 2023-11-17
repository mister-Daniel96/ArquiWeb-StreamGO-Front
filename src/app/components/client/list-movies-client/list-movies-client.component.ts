import {  AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contenido } from 'src/app/models/contenido';
import { ContenidoService } from 'src/app/services/contenido.service';

declare var Swiper: any;
@Component({
  selector: 'app-list-movies-client',
  templateUrl: './list-movies-client.component.html',
  styleUrls: ['./list-movies-client.component.css'],
})
export class ListMoviesClientComponent  implements AfterViewInit{

  listaContenidos: Contenido[] = [];
  idParent: number = 0;
  //
  filterValue = '';
  constructor(private cS: ContenidoService, private route: ActivatedRoute) {}
  ngAfterViewInit(): void {
    const mySwiper = new Swiper('.swiper', {
      /*     slidesPerView: 3,
      spaceBetween: 10, */
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      loop: true,
    });
  }
  ngOnInit(): void {
    this.route.parent?.params.subscribe((data) => {
      this.idParent = data['id'];
    });

    this.cS.list().subscribe((data) => {
      this.listaContenidos = data; //paso todos los datos a la data
    });

    this.cS.getList().subscribe((data) => {
      this.listaContenidos = data; //paso todos los datos a la data
    });
  }

  eliminar(id: number) {
    this.cS.delete(id).subscribe((data) => {
      this.cS.list().subscribe((data) => {
        this.cS.setList(data);
      });
    });
  }

  filter() {
    if (this.filterValue === '') {
      this.cS.list().subscribe((data) => {
        this.listaContenidos = data;
      });
    } else {
      this.listaContenidos = this.listaContenidos.filter(
        (contenido: Contenido) => {
          return contenido.titleContenido
            .toLowerCase()
            .startsWith(this.filterValue.toLowerCase());
        }
      );
    }
  }
  resetFilter() {
    this.filterValue = '';
    this.cS.list().subscribe((data) => {
      this.listaContenidos = data;
    });
  }
}
