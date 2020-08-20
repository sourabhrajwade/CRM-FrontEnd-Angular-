import { ContactComponent } from './../contact/contact.component';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { CrmService } from './../services/crm.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit {
  leadData: MatTableDataSource<any>;
  searchKey: string;
  animal: string;
  name: string;
  dataTransf: any[] = [];
  dataSel: any = {};
  displayColumn: string[] = [
    'email',
    'mobile',
    'description',
    'companyName',
    'action',
  ];

  constructor(private crmService: CrmService, public dialog: MatDialog) {}
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) pagination: MatPaginator;
  ngOnInit(): void {
    this.crmService.getLeadsCount().subscribe((result) => {
      const arr = result['leads'];
      this.dataTransf.push(arr);
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
    this.dataSel  = ele;
    this.openDialog();
  }
  onSearch() {
    this.searchKey = '';
    this.applySearch();
  }
  applySearch() {
    this.leadData.filter = this.searchKey.trim().toLowerCase();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(ContactComponent, {
      width: '60vw',
      height: '80vh',
      data: this.dataSel

    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}
