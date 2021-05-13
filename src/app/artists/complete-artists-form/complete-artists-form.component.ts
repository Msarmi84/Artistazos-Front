import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { MustMatch } from 'src/app/_helpers/must-match.validator';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-complete-artists-form',
  templateUrl: './complete-artists-form.component.html',
  styleUrls: ['./complete-artists-form.component.scss']
})
export class CompleteArtistsFormComponent implements OnInit {

  
  form: FormGroup;
  imgPreview = 'assets/images/logonofoto.png';
  imageFile: File;
  imageUrl = environment.baseUrl + 'images/';
  

  @Output() formSubmitted = new EventEmitter<FormData>();

  constructor(formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) private data?: User) {
    this.form = formBuilder.group({
      artistic_name: ['', Validators.required],
      user_name: ['', Validators.required],
      last_name: ['', Validators.required],
      date_of_birth: ['', Validators.required],
      location: ['', Validators.required],
      discipline_name: [[]],
      mail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
   }

   ngOnInit(): void {
    if (this.data?.user_name) {
      this.form.patchValue(this.data);
      this.imgPreview = this.data.avatar ? this.imageUrl + this.data.avatar : 'assets/images/logonofoto.png';
    }
  }

  onSubmit(): void {
    if (this.form.invalid || this.data.user_name) {
      return;
    }
    const formData = this.generateFormData();
    this.form.reset();
    this.imgPreview = 'assets/images/logonofoto.png';
    this.formSubmitted.emit(formData);
  }
  generateFormData(): FormData {
    const formData = new FormData();
    for (const field in this.form.value) {
      if (field) {
        formData.append(field, this.form.value[field]);
      }
    }
    formData.append('img', this.imageFile);
    return formData;
  }
  onImageChanged(event: InputEvent): void {
    const inputTarget = event.target as HTMLInputElement;
    const file = inputTarget.files[0];
    this.imageFile = file;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => this.imgPreview = fileReader.result as string;
  }


}
