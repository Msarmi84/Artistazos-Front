import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ProductCategory } from 'src/app/models/enums/product-category.enum';
import { IdName } from 'src/app/models/id-name';
import { Product } from 'src/app/models/product';
import { environment } from 'src/environments/environment';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products-form-update',
  templateUrl: './products-form-update.component.html',
  styleUrls: ['./products-form-update.component.scss'],
})
export class ProductsFormUpdateComponent implements OnInit {
  user_id = null;
  submitted: Boolean = false;
  form: FormGroup;
  imgPreview = environment.baseUrl + 'images/uploads/noProductPhoto.jpeg';

  imageUrl = environment.baseUrl + 'images/uploads/';
  imageFile: File;
  product_id: number;
  defaultImg = environment.baseUrl + 'images/uploads/noProductPhoto.jpeg';
  categories: IdName[];
  formData: FormData;
  product_type: string;

  tag: string;
  tags: string[] = [];
  tag3: string;

  @Output() formSubmitted = new EventEmitter<FormData>();

  constructor(
    formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private productService: ProductService,
    @Inject(MAT_DIALOG_DATA) private data?: { product: Product; type: string }
  ) {
    this.form = formBuilder.group({
      product_id: [''],
      user_id: [''],
      product_name: ['', Validators.required],
      category: [null, Validators.required],
      description: ['', Validators.required],
      product_photo: ['', Validators.required],
      price: [null, Validators.required],
      tag: [''],
    });
  }

  ngOnInit(): void {
    this.categories = this.productService.getCategoriaDeProducto();

    console.log(this.categories);
    this.route.params.subscribe((params) =>
      this.form.patchValue({ user_id: params.id })
    );
    console.log(this.form);

    if (this.data?.type){
      this.product_type = this.data.type;
      console.log(this.data.type, 'tipo de input')
     
    }


    if (this.data?.product.product_id) {
      this.form.patchValue(this.data.product);
      this.product_id = this.data.product.product_id;
      console.log(this.product_id, 'ID que llega')
      this.formData = this.generateFormData();
      this.imgPreview = this.data.product.product_photo
        ? this.imageUrl + this.data.product.product_photo
        : this.defaultImg;
    } else {
      this.user_id = this.data.product;
      this.form.patchValue({ user_id: this.data.product });
   }





    this.form.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(() => {
        this.formData = this.generateFormData();
      });
  }

  generateFormData(): FormData {
    const formData = new FormData();
    for (const field in this.form.value) {
      if(field) {
        formData.append(field, this.form.value[field]);
      }
      formData.append('tag', this.tag3);
    }
    // console.log('console del formdata')
    // console.log(this.form.value)
    formData.append('img', this.imageFile);

    return formData;
  }

  onImageChanged(event: InputEvent): void {
    const inputTarget = event.target as HTMLInputElement;
    const file = inputTarget.files[0];
    this.imageFile = file;
    this.formData.append('product_photo', this.imageFile);
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => (this.imgPreview = fileReader.result as string);
  }

  addTag(event) {
    if (event.keyCode == 32 || event.keyCode == 'Space') {
      this.tag = event.target.value;
      event.target.value = '';
      this.tags.push(this.tag);
      this.tag3 = this.tags.toString();
      this.tag3 = this.tag3.toLowerCase();
    }
  }

  removeTag(tag) {
    this.tags = this.tags.filter((i) => i !== tag);
    this.tag3 = this.tags.toString();
  }
}
