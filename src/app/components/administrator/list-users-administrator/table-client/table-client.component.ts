import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-table-client',
  templateUrl: './table-client.component.html',
  styleUrls: ['./table-client.component.css'],
})
export class TableClientComponent implements OnInit {
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource();
  displayedColumns: string[] = [
    'codigo',
    'nombre',
    'contrasena',
    'correo',
    'activado',
    'accion01',
  ];
  id: number = 0;
  @ViewChild(MatPaginator) paginatorClient!: MatPaginator;
  /**
   *   @ViewChild('paginatorAdmin') paginatorClient!: MatPaginator;
   *    = Dentro del html del paginator ponemos el identificador  #paginatorAdmin
   *    = lo digo por si vamos a usar mas de un paginator y podamos identificar cada uno
   *    = caso contrario solo va a funcionar uno, cada uno tiene un identificador
   */

  constructor(private uS: UsuarioService, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.parent?.params.subscribe((data) => {
      this.id = data['id'];
    });
    //para los clientes
    this.uS.listClient().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginatorClient;
    });
    this.uS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginatorClient;
    });

    /* DETALLE ES QUE CUANDO USO listClient o listAdmin  no actualiza automaticamente */
  }

  eliminar(id: number) {
    this.uS.delete(id).subscribe((data) => {
      this.uS.list().subscribe((data) => {
        this.uS.setList(data);
      });
    });
  }
}
