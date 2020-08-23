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
    'name',
    'email',
    'phone',
    'description',
    'action',
  ];

  constructor(private crmService: CrmService, public dialog: MatDialog) {}
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) pagination: MatPaginator;
  ngOnInit(): void {
    this.crmService.getContact().subscribe((result) => {
      // console.log(result);
      const arr = result['contacts'];
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

    this.dataSel  = ele;
    const dialogRef = this.dialog.open(ContactComponent, {
      width: '30vw',
      height: '70vh',
      data: this.dataSel

    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });

  }
  onSearch() {
    this.searchKey = '';
    this.applySearch();
  }
  applySearch() {
    this.leadData.filter = this.searchKey.trim().toLowerCase();
  }
  create(){
    const dialogRef = this.dialog.open(ContactComponent, {
      width: '30vw',
      height: '70vh',
      data: null
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');

    });

  }
  openDialog(): void {
    const dialogRef = this.dialog.open(ContactComponent, {
      width: '30vw',
      height: '70vh',

    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');

    });
  }
}
