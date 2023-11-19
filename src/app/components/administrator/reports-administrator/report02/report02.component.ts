import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { SupportService } from 'src/app/services/support.service';

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
  barChartType: ChartType = 'line';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private sS: SupportService) {}
  ngOnInit(): void {
    this.sS.getQuantitySupportMesDTO().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.month);
      this.barChartData = [
        {
          data: data.map((item) => item.quantitySupports),
          label: 'cantidad de incidencias',
        },
      ];
    });
  }
}
