import { first } from 'rxjs/operators';
import { CrmService } from './../services/crm.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './../auth/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private crm: CrmService,
    private dialogRef: MatDialogRef<ContactComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.contactForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      phone: [
        null,
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
      description: [
        null,
        Validators.compose([Validators.required, Validators.minLength(15)]),
      ],
    });
  }
  ngOnInit(): void {
    // console.log('dialog data', this.data);
    this.contactForm.setValue({
      name: this.data.name,
      email: this.data.email,
      phone: this.data.phone,
      description: this.data.description,
    });
  }
  onSubmit() {
    if (this.contactForm.valid) {
      if (this.data === null) {
        console.log('New contact Create');
        this.onCreate();
      } else {
        console.log('Edit contact');
        this.onEdit();
      }
    } else {
      this.contactForm.reset();
      this.onClose();
      // this.notificationService.success(':: Submitted successfully');
    }

  }
  onCreate() {
    this.crm
      .createContact(this.contactForm.value)
      .pipe(first())
      .subscribe(
        (data) => {
          this.onClose();
          console.log(data);
        },
        (err) => {
          this.clear();
          console.log(err);
        }
      );
  }
  setvalue() {
    this.contactForm.setValue({
      name: this.data.name,
      email: this.data.email,
      phone: this.data.phone,
      description: this.data.description,
    });
  }
  onEdit() {
    this.setvalue();
    this.crm.updateContact(this.contactForm.value).subscribe(
      (result) => {
        console.log(result);
      },
      (err) => {
        console.log(err);
        this.clear();
      }
    );
  }
  clear() {
    this.contactForm.reset();
  }
  onClose() {
    this.contactForm.reset();
    this.dialogRef.close();
  }
  close() {
    this.dialogRef.close();
  }
}
