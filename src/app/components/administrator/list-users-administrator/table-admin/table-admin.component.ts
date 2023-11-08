import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-table-admin',
  templateUrl: './table-admin.component.html',
  styleUrls: ['./table-admin.component.css'],
})
export class TableAdminComponent  implements OnInit{
  dataSource:MatTableDataSource<Usuario>=new MatTableDataSource();
  displayedColumns: string[] = [
    'codigo',
    'nombre',
    'contrasena',
    'correo',
    'activado',
    'accion01',
  ];
  id:number=0;
  constructor(private uS:UsuarioService, private route:ActivatedRoute){

  }
  ngOnInit(): void {

    this.route.parent?.params.subscribe((data) => {
      this.id = data['id'];
    });

    this.uS.listAdmin().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data);
    })
    this.uS.getList().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data);
    })
  }
  eliminar(id: number) {
    this.uS.delete(id).subscribe((data) => {
      this.uS.list().subscribe((data) => {
        this.uS.setList(data);
      });
    });
  }
}
