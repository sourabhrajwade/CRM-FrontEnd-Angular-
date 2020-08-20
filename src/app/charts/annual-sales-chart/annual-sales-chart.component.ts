import { SalesService } from './../services/sales.service';
import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-annual-sales-chart',
  templateUrl: './annual-sales-chart.component.html',
  styleUrls: ['./annual-sales-chart.component.css']
})
export class AnnualSalesChartComponent implements OnInit {

  public salesChartData: ChartDataSets[] = [
    { data: [], label: 'Total Sales' },
  ];
  public salesChartLabels: Label[] = [];
  public salesChartOptions: ChartOptions = {
    responsive: true,
  };
  public salesChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  salesData;
  public salesChartLegend = true;
  public salesChartType: ChartType = 'line';
  public salesChartPlugins = [];

  constructor(private salesService: SalesService) { }

  ngOnInit() {
    this.salesData = this.salesService.getSalesByMonth();
    this.salesData.forEach(li => {
      this.salesChartData[0].data.push(li.revenue);
      this.salesChartLabels.push(li.month);
    });
  }

}
