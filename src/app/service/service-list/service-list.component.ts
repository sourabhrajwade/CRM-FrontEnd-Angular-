import { LeadComponent } from './../../lead/lead.component';
import { ServiceComponent } from './../service/service.component';
import { AuthService } from './../../auth/auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CrmService } from './../../services/crm.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css'],
})
export class ServiceListComponent implements OnInit {
  serviceData: MatTableDataSource<any>;
  searchKey: string;
  name: string;
  id: any;
  data: any[] = [];
  dataSel: any = {};
  leadMail: string;
  displayColumn: string[] = [
    'title',
    'categories',
    'status',
    'assignmed_to',
    'description',
    'action',
  ];
  constructor(
    private crm: CrmService,
    public dialog: MatDialog,
    private auth: AuthService
  ) {}
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) pagination: MatPaginator;
  ngOnInit(): void {
    this.crm.getServices().subscribe((result) => {
      const arr = result['services'];
      this.data.push(arr);
      this.serviceData = new MatTableDataSource(arr);
      this.serviceData.sort = this.sort;
      this.serviceData.paginator = this.pagination;
      this.serviceData.filterPredicate = (data, filter) => {
        return this.displayColumn.some((ele) => {
          return (
            ele !== 'action' && data[ele].toLowerCase().indexOf(filter) !== -1
          );
        });
      };
    });
  }
  onDelete(e) {
    this.leadMail = e.email;
    this.crm.deleteLead(this.leadMail).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  onSearch() {
    this.searchKey = '';
    this.applySearch();
  }
  applySearch() {
    this.serviceData.filter = this.searchKey.trim().toLowerCase();
  }
  create(): void {
    const dialogRef = this.dialog.open(ServiceComponent, {
      width: '30vw',
      height: '60vh',
      data: null
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');

    });

  }
  change(e) {
    console.log(e);
  }
  edit(ele) {
    this.dataSel  = ele;
    const dialogRef = this.dialog.open(ServiceComponent, {
      width: '30vw',
      height: '60vh',
      data: this.dataSel

    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });

  }
  openDialog(): void {
    const dialogRef = this.dialog.open(ServiceComponent, {
      width: '30vw',
      height: '70vh',

    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');

    });
  }
}
