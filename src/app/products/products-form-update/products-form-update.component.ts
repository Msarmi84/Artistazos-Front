import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Product } from 'src/app/models/product';
import { environment } from 'src/environments/environment';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products-form-update',
  templateUrl: './products-form-update.component.html',
  styleUrls: ['./products-form-update.component.scss']
})
export class ProductsFormUpdateComponent implements OnInit {

  user_id=null;
  submitted: Boolean = false;
  form: FormGroup;
  imgPreview =  environment.baseUrl + 'images/uploads/noProductPhoto.jpeg'

  imageUrl = environment.baseUrl + 'images/uploads/';
  imageFile: File;
  product_id: number;
  defaultImg = environment.baseUrl + 'images/uploads/noProductPhoto.jpeg'

  formData: FormData;

  @Output() formSubmitted = new EventEmitter<FormData>();

  constructor(
    formBuilder: FormBuilder, 
    private route:ActivatedRoute, 

    @Inject(MAT_DIALOG_DATA) private data?: Product
    ) {
    this.form = formBuilder.group({
      product_id:[''],
      user_id:[''],
      product_name: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      product_photo: ['', Validators.required],
      price: [null, Validators.required],
      tag: ['', Validators.required],
    });
   }

   ngOnInit(): void {
    this.route.params.subscribe((params) => (this.user_id = params.id));
    if (this.data?.product_name) {
      this.form.patchValue(this.data);
      this.product_id = this.data.product_id;
      this.formData = this.generateFormData()
      this.imgPreview = this.data.product_photo ? this.imageUrl + this.data.product_photo : this.defaultImg;
    }

    this.form.valueChanges.pipe(debounceTime(400), distinctUntilChanged()).subscribe(() => {
      this.formData = this.generateFormData()
    })
  }


  generateFormData(): FormData {
    const formData = new FormData();
    for (const field in this.form.value) {
      if (field) {
        formData.append(field, this.form.value[field]);
      }
    }
    console.log('console del formdata')
    console.log(formData)
    return formData;
  }

  onImageChanged(event: InputEvent): void {
    const inputTarget = event.target as HTMLInputElement;
    const file = inputTarget.files[0];
    this.imageFile = file;
    this.formData.append('product_photo', this.imageFile);
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => this.imgPreview = fileReader.result as string;
  }


}
