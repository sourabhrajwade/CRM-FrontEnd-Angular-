import { Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-updatedetail',
  templateUrl: './updatedetail.component.html',
  styleUrls: ['./updatedetail.component.css']
})
export class UpdatedetailComponent implements OnInit {
  updateForm = this.fb.group({
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    password: [null, Validators.compose([
      Validators.required, Validators.minLength(6)])
    ],
    passwordConfirm:  [null, Validators.compose([
      Validators.required, Validators.minLength(6)])
    ],
    checked: [null, Validators.required]
  });
  checked = false;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
  }
  onSubmit() {
    console.log(this.updateForm.value);
  }

}
