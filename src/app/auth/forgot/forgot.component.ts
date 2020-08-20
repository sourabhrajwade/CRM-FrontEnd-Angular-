import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {
  forgotForm = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
  });
  checked = false;
  constructor(private fb: FormBuilder) {}


  ngOnInit(): void {
  }
  onSubmit() {
    console.log(this.forgotForm.value);
  }
}
