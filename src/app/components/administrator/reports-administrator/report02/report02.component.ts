
import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { ChartOptions, ChartDataset } from 'chart.js';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-report02',
  templateUrl: './report02.component.html',
  styleUrls: ['./report02.component.css'],
})
export class Report02Component implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  tipos: { value: string; viewValue: string }[] = [
    { value: 'bar', viewValue: 'bar' },
    { value: 'bubble', viewValue: 'bubble' },
    { value: 'doughnut', viewValue: 'doughnut' },
    { value: 'line', viewValue: 'line' },
    { value: 'pie', viewValue: 'pie' },
    { value: 'scatter', viewValue: 'scatter' },
  ];

  constructor(private uS: UsuarioService) {}
  ngOnInit(): void {
    this.uS.getCantidadUsuariosActivos().subscribe((data) => {
      this.barChartLabels = data.map((item) => "Clientes");
      this.barChartData = [
        {
          data: data.map((item) => item.cantidad_usuarios_activos),
          label: 'Cantidad de clientes activos',
        },
        {
          data: data.map((item) => item.cantidad_usuarios_inactivos),
          label: 'Cantidad de clientes inactivos',
        },
      ];
    });
  }

 
}