import { Component, OnInit, Output,EventEmitter, Input } from '@angular/core';
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
  imageUrl = environment.baseUrl + 'images/uploads/';
  //  

  @Output() deleteProduct = new EventEmitter<Product>();
  products: Product[] = [];

  constructor(private productService: ProductService) { }


  ngOnInit(): void {
    this.productService.getProducts().subscribe(product => this.products = product);
  }
  // delete(){
  //   delete this.product;
  // }

  // aumento(){
  //      this.product.aumentarCantidad();
  //      this.product.price= this.product.calcularimporte();
     
  // }

  // disminuir(){
  //     if(this.product.cantidad>0){
  //      this.product.disminuirCantidad();
  //      this.product.price= this.product.calcularimporte();
  //     }
     
  // }

}
