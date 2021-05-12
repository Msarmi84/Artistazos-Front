import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/models/product';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-products-form-update',
  templateUrl: './products-form-update.component.html',
  styleUrls: ['./products-form-update.component.scss']
})
export class ProductsFormUpdateComponent implements OnInit {

  productForm: FormGroup;
  imgPreview = 'assets/images/proyecto1.png';
  // imageUrl = environment.baseUrl + 'images/';
  imageUrl = 'assets/images/';
  imageFile: File;
  @Output() formSubmitted = new EventEmitter<FormData>();

  constructor(formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) private data?: Product) {
    this.productForm = formBuilder.group({
      product_name: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      product_photo: ['', Validators.required],
      price: [null, Validators.required],
      tag: ['', Validators.required],
    });
   }

   ngOnInit(): void {
    if (this.data?.product_name) {
      this.productForm.patchValue(this.data);
      this.imgPreview = this.data.product_photo ? this.imageUrl + this.data.product_photo : 'assets/images/proyecto1.png';
    }
  }

  
  onSubmit(): void {
    if (this.productForm.invalid || this.data.product_name) {
      return;
    }
    const formData = this.generateFormData();
    this.productForm.reset();
    this.imgPreview = 'assets/images/proyecto1.png';
    this.formSubmitted.emit(formData);
    console.log(formData+ 'oooooooooooooooooooooo')
  }

  generateFormData(): FormData {
    const formData = new FormData();
    for (const field in this.productForm.value) {
      if (field) {
        formData.append(field, this.productForm.value[field]);
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
