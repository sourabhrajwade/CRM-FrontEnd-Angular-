import { CrmService } from './../../services/crm.service';
import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';

@Component({
  selector: 'app-sales-traffic-chart',
  templateUrl: './sales-traffic-chart.component.html',
  styleUrls: ['./sales-traffic-chart.component.css']
})
export class SalesTrafficChartComponent implements OnInit {
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] ;
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(private crm: CrmService) { }

  ngOnInit() {
    this.crm.getSummary().subscribe((d) => {
      console.log(d[0].status);
      this.pieChartData = Object.values(d[0].status);
      this.pieChartLabels = Object.keys(d[0].status);
      console.log('Services', this.pieChartLabels);
      console.log('ServicesKeys', this.pieChartData);
    });
  }

}
