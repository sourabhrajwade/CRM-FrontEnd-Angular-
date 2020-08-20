import { AuthService } from './../auth/auth.service';
import { CrmService } from './../services/crm.service';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  FormsModule,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-lead-edit',
  templateUrl: './lead-edit.component.html',
  styleUrls: ['./lead-edit.component.css'],
})
export class LeadEditComponent implements OnInit {
  form: FormGroup;
  id: any;
  departmentarray = [
    { value: 'is', viewValue: 'Information Services' },
    { value: 'cs', viewValue: 'Computer Services' },
    { value: 'ns', viewValue: 'Network Services' },
    { value: 'hs', viewValue: 'Hardware Services' },
  ];
  statusArr = [
    { value: 'new', viewValue: 'New' },
    { value: 'contacted', viewValue: 'Contacted' },
    { value: 'cancelled', viewValue: 'Cancelled' },
    { value: 'confirmed', viewValue: 'Confirmed' },
  ];
  priorityArr = [
    { value: 'low', viewValue: 'Low' },
    { value: 'medium', viewValue: 'Medium' },
    { value: 'high', viewValue: 'High' },
    { value: 'urgent', viewValue: 'Urgent' },
  ];
  sourceArr = [
    { value: 'email', viewValue: 'Email' },
    { value: 'phone', viewValue: 'Phone' },
  ];

  constructor(
    public dialogRef: MatDialogRef<LeadEditComponent>,
    private fb: FormBuilder,
    private crm: CrmService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      fullname: ['', Validators.required],
      email: ['', Validators.email],
      mobile: ['', [Validators.required, Validators.minLength(8)]],
      city: [''],
      gender: ['male'],
      department: ['is'],
      status: ['new'],
      priority: ['low'],
      source: ['email'],
      doneby: [''],
      description: [''],
      companyname: [''],
      assignedTo: [''],
    });
  }

  ngOnInit(): void {
    this.form.setValue({
      fullname: this.data.fullname,
      email: this.data.email,
      mobile: this.data.mobile,
      city: this.data.city,
      gender: this.data.gender,
      department: this.data.department,
      status: this.data.status,
      priority: this.data.priority,
      source: this.data.source,
      doneby: this.data.doneby,
      description: this.data.description,
      companyname: this.data.companyname,
      assignedTo: this.data.assignedTo,
    });
  }
  onClear() {
    this.form.reset();
    // this.notificationService.success(':: Submitted successfully');
  }
  setvalue() {
    this.form.setValue({
      fullname: this.data.fullname,
      email: this.data.email,
      mobile: this.data.mobile,
      city: this.data.city,
      gender: this.data.gender,
      department: this.data.department,
      status: this.data.status,
      priority: this.data.priority,
      source: this.data.source,
      doneby: this.data.doneby,
      description: this.data.description,
      companyname: this.data.companyname,
      assignedTo: this.data.assignedTo,
    });
  }
  onSubmit() {
    if (this.form.valid) {
      this.setvalue();
      this.crm.updateLeads(this.form.value).subscribe((r) => {
        console.log(r);
        this.onClose();
      });
    } else {
      // this.crm.updateEmployee(this.form.value);
      this.form.reset();
      this.onClose();
      // this.notificationService.success(':: Submitted successfully');
    }
  }
  onClose() {
    this.form.reset();
    this.dialogRef.close();
  }
}
