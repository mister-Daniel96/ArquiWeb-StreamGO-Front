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
    'pendiente',
    'accion01',
  ];

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
}
