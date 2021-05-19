import { Component, OnInit, Output,EventEmitter, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';
import { ProductService } from '../products/product.service';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  defaultImg = 'assets/images/Imagen_por_defecto.png';
  imageUrl = environment.baseUrl + 'images/uploads/';
  // @Input() product: Product;

  @Output() deleteProduct = new EventEmitter<Product>();
  productsStorage: any[] = [];
  products: Product[] = [];

  constructor(private productService: ProductService, private lss: LocalStorageService) { }


  ngOnInit(): void {
    this.productsStorage = this.lss.getProducts();
    this.productService.getProducts().subscribe(product =>{
     let product2 = product;
      for(let i = 0; i < product2.length; i++){
        
        for(let j = 0; j < this.productsStorage.length; j++){
          
          if (product2[i].product_id == this.productsStorage[j].product_id){
            this.products.push(product[i]); 
          }
        }
      }
    })

}

  
  // delete(){
  //   delete this.product;
  // }

  // aumento(){
  //      this.product.aumentarCantidad();
  //      this.product.importe= this.product.calcularimporte();
     
  // }

  // disminuir(){
  //     if(this.product.cantidad>0){
  //      this.product.disminuirCantidad();
  //      this.product.importe= this.product.calcularimporte();
  //     }
     
  // }

}
