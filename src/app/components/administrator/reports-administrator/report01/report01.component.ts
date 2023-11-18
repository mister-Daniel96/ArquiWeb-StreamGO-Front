import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { ChartOptions, ChartDataset } from 'chart.js';
import { ContenidoService } from 'src/app/services/contenido.service';

@Component({
  selector: 'app-report01',
  templateUrl: './report01.component.html',
  styleUrls: ['./report01.component.css'],
})
export class Report01Component implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'doughnut';
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

  constructor(private cS: ContenidoService) {}
  ngOnInit(): void {
    this.cS.getCountResenasContenido().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.titleContenido);
      this.barChartData = [
        {
          data: data.map((item) => item.quantityResenas),
          label: 'Cantidad de reseñas',
        },
      ];
    });
  }

 
}
