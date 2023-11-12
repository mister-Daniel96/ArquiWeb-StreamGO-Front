import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Contenido } from 'src/app/models/contenido';
import { ContenidoService } from 'src/app/services/contenido.service';
import { ResenaService } from 'src/app/services/resena.service';
@Component({
  selector: 'app-view-movies-client',
  templateUrl: './view-movies-client.component.html',
  styleUrls: ['./view-movies-client.component.css'],
})
export class ViewMoviesClientComponent {
  id: number = 0;
  idParent: number = 0;
  movie: Contenido = new Contenido();

  //=================================================

  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns: string[] = ['name_usuario', 'text_resena', 'date_resena'];

  constructor(
    private route: ActivatedRoute,
    private cS: ContenidoService,
    private rS: ResenaService
  ) {}

  ngOnInit(): void {
    this.route.parent?.params.subscribe((data) => {
      this.idParent = data['id'];
    });
    this.route.params.subscribe((data) => {
      this.id = data['id'];
    });

    this.cS.listId(this.id).subscribe((data) => {
      this.movie = data;
    });

    this.rS.listResenasDeContenido(this.id).subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
}
