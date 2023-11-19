import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Support } from 'src/app/models/support';
import { SupportService } from 'src/app/services/support.service';

@Component({
  selector: 'app-supports-administrator',
  templateUrl: './supports-administrator.component.html',
  styleUrls: ['./supports-administrator.component.css'],
})
export class SupportsAdministratorComponent implements OnInit {
  dataSource: MatTableDataSource<Support> = new MatTableDataSource();
  displayedColumns: string[] = [
    'codigo',
    'fecha',
    'descripcion',
    'usuario',
    'pendiente'
  ];

  isChecked = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private sS: SupportService) {}
  ngOnInit(): void {
    this.sS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.sS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  togglePendiente(soporte: Support) {
    // Alterna la propiedad 'pendiente' del elemento de soporte seleccionado
    soporte.pendienteSupport = !soporte.pendienteSupport;

    // Actualiza el elemento de soporte en el backend
    this.sS.update(soporte).subscribe(() => {
      // Actualiza la lista en el componente
      /*  this.sS.list().subscribe(data=>{
        this.sS.setList(data);
      }) */
      const listaActualizada = this.dataSource.data.map((item) =>
        item.idSupport === soporte.idSupport ? soporte : item
      );
      this.sS.setList(listaActualizada); //es la mas apropiada porque actualiza al instante
    });
  }
}
