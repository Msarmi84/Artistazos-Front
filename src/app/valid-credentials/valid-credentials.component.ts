import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../models/user';
import { MustMatch } from '../_helpers/must-match.validator';

@Component({
  selector: 'app-valid-credentials',
  templateUrl: './valid-credentials.component.html',
  styleUrls: ['./valid-credentials.component.scss']
})
export class ValidCredentialsComponent implements OnInit {

  form: FormGroup;
  formSubmitted: any;

  constructor(formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) private data?: User) {
    this.form = formBuilder.group({
      mail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
   }

  ngOnInit(): void {
  }
  onSubmit(): void {
    if (this.form.invalid || this.data.user_name) {
      return;
    }
    const formData = this.generateFormData();
    this.form.reset();
    this.formSubmitted.emit(formData);
  }
  generateFormData(): FormData {
    const formData = new FormData();
    for (const field in this.form.value) {
      if (field) {
        formData.append(field, this.form.value[field]);
      }
    }
    return formData;
  }

}
