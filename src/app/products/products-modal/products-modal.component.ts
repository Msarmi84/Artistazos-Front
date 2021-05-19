import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-products-modal',
  templateUrl: './products-modal.component.html',
  styleUrls: ['./products-modal.component.scss']
})
export class ProductsModalComponent implements OnInit {
  product: Product;
  productService: any;
  productType: string;
  productsVideo: Product[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) private data?: Product) { }

  ngOnInit(): void {
    if (this.data){
      this.product = this.data;
      this.productType = this.product.product_photo.split('.')[1];
    }
  }

}
