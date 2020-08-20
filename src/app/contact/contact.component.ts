

import { first } from 'rxjs/operators';
import { CrmService } from './../services/crm.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './../auth/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  contactForm = this.fb.group({
    name: [null, [Validators.required, Validators.email]],
    email: [
      null,
      Validators.compose([Validators.required, Validators.minLength(6)]),
    ],
    phone: [
      null,
      Validators.compose([Validators.required, Validators.minLength(6)]),
    ],
    description: '',
    checked: [null, Validators.required],
  });
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private crmService: CrmService,
    private dialogRef: MatDialogRef<ContactComponent>
  ) {}
  ngOnInit(): void {}
  onSubmit() {
    this.crmService
      .createContact(this.contactForm.value)
      .pipe(first())
      .subscribe(
        (data) => {
          this.onClose();
          console.log(data);
        },
        (err) => {
          console.log(err);
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
