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
  selector: 'app-lead',
  templateUrl: './lead.component.html',
  styleUrls: ['./lead.component.css'],
})
export class LeadComponent implements OnInit {
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
    public dialogRef: MatDialogRef<LeadComponent>,
    private fb: FormBuilder,
    private crm: CrmService,

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
  }
  onClear() {
    this.form.reset();
    // this.notificationService.success(':: Submitted successfully');
  }
  onSubmit() {
    if (this.form.valid) {

        console.log(this.form.value);
        const data = this.form.value;
        this.crm.createLead(data).subscribe(
          (result) => {
            console.log(result);
            this.onClear();
          },
          (err) => {
            this.onClose();
          }
        );
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
