import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-list-users-administrator',
  templateUrl: './list-users-administrator.component.html',
  styleUrls: ['./list-users-administrator.component.css'],
})
export class ListUsersAdministratorComponent implements OnInit {
  dataSourceAdmin: MatTableDataSource<Usuario> = new MatTableDataSource();
  dataSourceClient: MatTableDataSource<Usuario> = new MatTableDataSource();
  displayedColumns: string[] = [
    'codigo',
    'nombre',
    'contrasena',
    'correo',
    'activado',
    'accion01',
  ];
  @ViewChild(MatPaginator) paginatorClient!: MatPaginator;
  /**
   *   @ViewChild('paginatorAdmin') paginatorClient!: MatPaginator;
   *    = Dentro del html del paginator ponemos el identificador  #paginatorAdmin
   *    = lo digo por si vamos a usar mas de un paginator y podamos identificar cada uno
   *    = caso contrario solo va a funcionar uno, cada uno tiene un identificador
   */

  constructor(private uS: UsuarioService) {}
  ngOnInit(): void {
    //Para el Administrador
    this.uS.listAdmin().subscribe((data) => {
      this.dataSourceAdmin = new MatTableDataSource(data);
    });
     this.uS.getList().subscribe((data) => {
      this.dataSourceAdmin = new MatTableDataSource(data);
    }); 

    //para los clientes
    this.uS.listClient().subscribe((data) => {
      this.dataSourceClient = new MatTableDataSource(data);
      this.dataSourceClient.paginator = this.paginatorClient;
    });
    this.uS.getList().subscribe((data) => {
      this.dataSourceClient = new MatTableDataSource(data);
      this.dataSourceClient.paginator = this.paginatorClient;
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

  filter(en: any) {
    this.dataSourceClient.filter = en.target.value.trim()
    this.dataSourceClient.filterPredicate = (data: Usuario, filter: string) => {
      return data.nameUsuario.includes(filter);
    };
  }
}
