import { Subject } from 'rxjs';
import { CrmService } from './../../services/crm.service';
import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-product-sales-chart',
  templateUrl: './product-sales-chart.component.html',
  styleUrls: ['./product-sales-chart.component.css'],
})
export class ProductSalesChartComponent implements OnInit {
  public radarChartOptions: ChartOptions = {
    responsive: true,
  };
  arrService: number[] = [];
  public radarChartLabels: Label[] = [];
  public radarChartData: ChartDataSets[];
  public radarChartType: ChartType = 'radar';

  constructor(private crm: CrmService) {}

  ngOnInit() {
    this.crm.getSummary().subscribe((d) => {
      console.log(d[2].status);
      this.arrService = Object.values(d[2].status);
      console.log('Services', this.arrService);

      this.radarChartData = [
        { data: this.arrService, label: 'Service Status' },
      ];
      this.radarChartLabels = Object.keys(d[2].status);
    });
  }
}
