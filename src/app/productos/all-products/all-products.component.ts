import { Component, OnInit} from '@angular/core';
import { BuscadorProducto } from 'src/app/models/buscador-producto';
import { Product } from 'src/app/models/product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {

  products: Product[] = [];

  constructor(private productService: ProductService) {

  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(x => {
      this.products = x;
      console.log(this.products);
    });
  }

  searchProduct(filter: BuscadorProducto): void {
    this.productService.searchProduct(filter).subscribe(x => {
      this.products = x;
    });
  }
}
