import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-list-users-administrator',
  templateUrl: './list-users-administrator.component.html',
  styleUrls: ['./list-users-administrator.component.css']
})
export class ListUsersAdministratorComponent implements OnInit {

  //lo cargamos con datos de una lista usuarios de tipo administradores  dataSourceAdministradores
  dataSource:MatTableDataSource<Usuario> =new MatTableDataSource();
  //lo cargamos con datos de una lista usuarios de tipo clientes  dataSourceClientes
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
    constructor( private uS:UsuarioService){

  }
  ngOnInit(): void {
    
    this.uS.list().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data);
    })
  }
}
