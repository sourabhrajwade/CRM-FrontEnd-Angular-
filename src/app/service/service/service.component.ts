import { first } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CrmService } from './../../services/crm.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css'],
})
export class ServiceComponent implements OnInit {
  form: FormGroup;
  categoriesArr = [
    { value: 'phone', viewValue: 'Phone' },
    { value: 'email', viewValue: 'Email' },
    { value: 'facebook', viewValue: 'Facebook' },
  ];
  statusArr = [
    { value: 'created', viewValue: 'created' },
    { value: 'open', viewValue: 'open' },
    { value: 'released', viewValue: 'released' },
    { value: 'cancelled', viewValue: 'cancelled' },
    { value: 'in_process', viewValue: 'in_process' },
    { value: 'completed', viewValue: 'completed' },
  ];
  constructor(
    public dialogRef: MatDialogRef<ServiceComponent>,
    private fb: FormBuilder,
    private crm: CrmService,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      categories: ['Phone', Validators.required],
      status: ['', Validators.required],
      description: [''],
      assigned_to: ['']
    });
  }
  ngOnInit(){
    this.form.patchValue({
      title: this.data.title,
      categories: this.data.categories,
      status: this.data.status,

      description: this.data.description,
      assigned_to: this.data.assigned_to,
    });
  }
  onClear() {
    this.form.reset();
    // this.notificationService.success(':: Submitted successfully');
  }
  onSubmit() {
    if (this.form.valid) {
      if (this.data === null) {
        console.log('New contact Create');
        this.onCreate();
      } else {
        console.log('Edit contact');
        this.onEdit();
      }
    } else {
      this.form.reset();
      this.onClose();
      // this.notificationService.success(':: Submitted successfully');
    }
  }
  onCreate() {
    this.crm
      .createService(this.form.value)
      .pipe(first())
      .subscribe(
        (data) => {
          this.onClose();
          console.log(data);
        },
        (err) => {
          this.onClear();
          console.log(err);
        }
      );
  }
  patchValueF() {
    this.form.patchValue({
      title: this.data.title,
      categories: this.data.categories,
      status: this.data.status,
      description: this.data.description,
      assigned_to: this.data.assigned_to,
    });
  }
  onEdit() {
    this.patchValueF();
    this.crm.updateService(this.form.value).subscribe(
      (result) => {
        console.log(result);
      },
      (err) => {
        console.log(err);
        this.onClear();
      }
    );
  }
  onClose() {
    this.form.reset();
    this.dialogRef.close();
  }
  close() {
    this.dialogRef.close();
  }
}
