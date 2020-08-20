import { CRMSummary } from './../models/crmsummary';
import { CrmService } from './../services/crm.service';
import { User } from './../auth/model/AuthModel';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css'],
})
export class DashComponent implements OnInit{
  color = 'orange';
  user: any;
  miniCardSummary: CRMSummary[];
  /** Based on the screen size, switch from standard to one column per row */
  cardLayout = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return {
          columns: 1,
          miniCard: { cols: 1, rows: 1 },
          chart: { cols: 4 , rows: 4 },

        };
      }

      return {
        columns: 4,
        miniCard: { cols: 1, rows: 1 },
        chart: { cols: 4, rows: 4},

      };
    })
  );

  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService, private  crmService: CrmService) {}
  ngOnInit() {
    this.user = this.authService.userValue;
    this.crmService.getSummary().subscribe({
      next: summaryData => {
        this.miniCardSummary = summaryData;
      }}
    );
  }

}
