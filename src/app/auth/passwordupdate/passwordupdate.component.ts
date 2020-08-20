import { Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-passwordupdate',
  templateUrl: './passwordupdate.component.html',
  styleUrls: ['./passwordupdate.component.css']
})
export class PasswordupdateComponent implements OnInit {
  passwordUpdate = this.fb.group({
    currentPassword: [null, Validators.required],
    newPassword: [null, Validators.compose([
      Validators.required, Validators.minLength(6)])
    ],
    passwordConfirm:  [null, Validators.compose([
      Validators.required, Validators.minLength(6)])
    ],

  });
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
  }
  onSubmit() {
    console.log(this.passwordUpdate.value.email);
  }
}
