import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';
import { ProductService } from '../products/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
    
  defaultImg = 'assets/images/Imagen_por_defecto.png';
  imageUrl = environment.baseUrl + 'images/';

  @Output() deleteProduct = new EventEmitter<Product>();
  products: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(product => this.products = product);
  }
//   deleteProductClick(event: Event, product: Product): void {
//     event.stopPropagation();
//     if (window.confirm('Seguro que quiere eliminar el viaje')) {
//       this.productService.deleteProduct(product).subscribe(x => {
//         alert('Producto eliminado');
//         this.productService.getProducts().subscribe(x => {
//           this.products = x;
//         })
//       })
//     }
// }

}
