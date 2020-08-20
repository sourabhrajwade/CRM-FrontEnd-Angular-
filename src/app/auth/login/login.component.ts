import { ToastService } from './../../services/toast.service';
import { first } from 'rxjs/operators';

import { AuthService } from './../auth.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loading = false;
  loginForm = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    password: [
      null,
      Validators.compose([Validators.required, Validators.minLength(6)]),
    ],
    passwordConfirm: [
      null,
      Validators.compose([Validators.required, Validators.minLength(6)]),
    ],
    checked: [null, Validators.required],
  });
  checked = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  onSubmit() {
    this.loading = true;
    this.authService
      .login(
        this.loginForm.value.email,
        this.loginForm.value.password,
        this.loginForm.value.passwordConfirm
      )
      .pipe(first())
      .subscribe(
        (data) => {
          this.showSuccess();
          this.router.navigate(['/dashboard']);
        },
        (err) => {
          console.log(err);
          this.router.navigate(['/login']);
        }
      );
  }
  showStandard() {
    this.toastService.show('I am a standard toast', {
      delay: 2000,
      autohide: true
    });
  }

  showSuccess() {
    this.toastService.show('I am a success toast', {
      classname: 'bg-success text-light',
      delay: 2000 ,
      autohide: true,
      headertext: 'Toast Header'
    });
  }
  showError() {
    this.toastService.show('I am a success toast', {
      classname: 'bg-danger text-light',
      delay: 2000 ,
      autohide: true,
      headertext: 'Error!!!'
    });
  }

  showCustomToast(customTpl) {
    this.toastService.show(customTpl, {
      classname: 'bg-info text-light',
      delay: 3000,
      autohide: true
    });
  }
}

