import { LeadEditComponent } from './../lead-edit/lead-edit.component';
import { AuthService } from './../auth/auth.service';
import { LeadComponent } from './../lead/lead.component';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { CrmService } from './../services/crm.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-lead-table',
  templateUrl: './lead-table.component.html',
  styleUrls: ['./lead-table.component.css'],
})
export class LeadTableComponent implements OnInit {
  leadData: MatTableDataSource<any>;
  searchKey: string;
  animal: string;
  name: string;
  id: any;
  data: any[] = [];
  dataSel: any = {};
  leadMail: string;
  displayColumn: string[] = [
    'fullname',
    'email',
    'mobile',
    'gender',
    'status',
    'action',
    // 'description',
    // 'companyName',
    // 'city',
    // 'department',
    // 'status',
    // 'priority',
    // 'source',
    // 'assignedTo',
    // 'createdDate'
  ];
  constructor(
    private crm: CrmService,
    public dialog: MatDialog,
    private auth: AuthService
  ) {}
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) pagination: MatPaginator;
  ngOnInit(): void {
    this.crm.getLeadsCount().subscribe((result) => {
      const arr = result['leads'];
      this.data.push(arr);
      this.leadData = new MatTableDataSource(arr);
      this.leadData.sort = this.sort;
      this.leadData.paginator = this.pagination;
      this.leadData.filterPredicate = (data, filter) => {
        return this.displayColumn.some((ele) => {
          return (
            ele !== 'action' && data[ele].toLowerCase().indexOf(filter) !== -1
          );
        });
      };
    });
  }
  edit(ele) {
    console.log('hello', ele);
    this.dataSel = ele;
    this.openEditDialog();
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
    this.leadData.filter = this.searchKey.trim().toLowerCase();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(LeadComponent, {
      width: '60vw',
      height: '80vh',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
  openEditDialog(): void {
    const dialogRef = this.dialog.open(LeadEditComponent, {
      width: '60vw',
      height: '80vh',
      data: this.dataSel,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  change(e) {
    console.log(e);
  }
}
