import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from './../../services/alert.service';
import { Subscription } from 'rxjs';
import { AuthService } from './../auth.service';

import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  checked = false;
  loading = false;
  authStatusSubs: Subscription;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) {}
  ngOnInit() {
    this.signupForm = this.fb.group({
      firstname: this.fb.control('', [Validators.required]),
      lastname: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      passwordConfirm: this.fb.control('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      checked: this.fb.control('', [Validators.required]),
    });
    this.loading = true;
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.signupForm.controls;
  }
  onSubmit() {
    if (this.signupForm.invalid) {
      return;
    }
    // reset alerts on submit
    this.alertService.clear();
    this.loading = true;
    this.authService
      .signup(this.signupForm.value)
      .pipe(first())
      .subscribe(
        (data) => {
          this.alertService.success('Registration successful', {
            keepAfterRouteChange: true,
          });
          this.router.navigate(['/login'], { relativeTo: this.route });
        },
        (error) => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }
}
