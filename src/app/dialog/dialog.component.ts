import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from './../services/admin.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})

export class DialogComponent implements OnInit {
  form: FormGroup;
  rolesArr = [
    { value: 'manager', viewValue: 'manager' },
    { value: 'employee', viewValue: 'employee' },
    { value: 'employee-2', viewValue: 'employee-2' },
  ];
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>, private admin: AdminService, private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.form = this.fb.group({
        role: [null, Validators.required]
      });
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }
  changeRole() {
    console.log(this.data);
    const id = this.data['_id'];
    const role = this.form.value.role;
    const data = { id, role };
    this.admin.changeRole(data).subscribe((result) => {
      console.log(result);
    });
  }
}
export interface DialogData {
  animal: string;
  name: string;
}
