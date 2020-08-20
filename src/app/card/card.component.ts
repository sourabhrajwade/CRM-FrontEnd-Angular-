import { ContactComponent } from './../contact/contact.component';
import { Component, OnInit, Input } from '@angular/core';
import {MatDialogConfig, MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() title: string;
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  addContact() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';
    this.dialog.open(ContactComponent, dialogConfig);
  }


}
