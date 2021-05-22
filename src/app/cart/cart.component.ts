import { isNgContent } from '@angular/compiler';
import { Component, OnInit, Output,EventEmitter, Input } from '@angular/core';
import { Subscription } from 'rxjs';
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

  productsStorage: any[] = [];
  amount: number [] =[];
  productObject:  Array<any> = [];
  subscriptions: Subscription;
  total: number;
 


  constructor(private productService: ProductService, private lss: LocalStorageService) { }


  ngOnInit(): void {
    this.productsStorage = this.lss.getProducts();
    this.productObject = this.getProducts();
    console.log(this.productObject,'productObject');
    
    
}
  private getProducts(): Array<any> {
    let newArray: Array<any> = [];
   this.subscriptions = this.productService.getProducts().subscribe(product => {

      let product2 = product;

      console.log(product, 'productt');
      
      for (let i = 0; i < product2.length; i++) {
        for (let j = 0; j < this.productsStorage.length; j++) {
          if (product2[i].product_id == this.productsStorage[j].product_id) {

            newArray[i]= ({ product: product[i], amount: this.productsStorage[j].amount });
            console.log(newArray, 'primer log');
            
          }
        }
      }
    });
    console.log(newArray[0],' newArray');
    
    return newArray;
    // this.calculateAmount();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  updateAmount(idProduct: number, signe: string): void {
    this.lss.updateAmount(idProduct, signe);
    this.ngOnInit();
  }

  deleteProduct(idProduct: number): void {
    this.lss.deleteProducts(idProduct);
    this.ngOnInit();
  }


  calculateAmount():void {
  //   // for(let price of this.productObject){
  //   //   console.log('holaaaaaa')
      
  //   //   this.total += (price.amount * price.product.price);
  //   //   console.log(this.total);
  //   // }
    console.log( this.productObject);
    
    const prices = this.productObject.map(x => x.product.price )
    this.total = prices[0];
     console.log(prices, 'pricessssssssss');
      console.log(this.total, 'segundoooooooo');
      
      
      
    //   {
    //   let precios = x.product.price * x.amount ;
    //   console.log(precios)
    // }) 
    
    // for(let i = 0; i < this.productObject.length; i++){
    //   console.log('holaaaaaaaaaaaaaaa');
    //   console.log(this.productObject);
      
    //   console.log(this.productObject.length)
    //   if(i == 0){
    //   this.total += this.productObject[i].amount * this.productObject[i].product.price;
    //   console.log(this.total)
    // }
    // }
      // this.total += this.productObject.amount;
    
  }
}
