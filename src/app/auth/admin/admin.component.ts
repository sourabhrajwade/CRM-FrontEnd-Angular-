import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './../../dialog/dialog.component';
import { AdminService } from './../../services/admin.service';
import { User } from './../model/AuthModel';
import { CrmService } from './../../services/crm.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  users: User[];
  constructor(private crm: CrmService, private admin: AdminService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.crm.getallusers().subscribe((result) => {
      this.users = result['tobeVertifieduser'];
      console.log(this.users);
    });
  }
  delete(u) {
    // console.log(u);
    const id = u._id;
    this.admin.deleteUser(id).subscribe((result) => {
      console.log('User deleted');
    });
  }
  openDialog(u): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '40vw',
      height: '50vh',
      data: u

    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');

    });
  }

}
