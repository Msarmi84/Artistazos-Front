import { isNgContent } from '@angular/compiler';
import { Component, OnInit, Output,EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';
import { ProductService } from '../products/product.service';
import { LocalStorageService } from '../services/local-storage.service';
import { PaymentService } from '../services/payment.service';
import { loadStripe } from '@stripe/stripe-js';
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

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
  isLoggedIn: boolean = false;
  isLoggedSub: Subscription;

  constructor(
    private router: Router,
    private productService: ProductService,
    private paymentService: PaymentService,
    private lss: LocalStorageService) { }


  ngOnInit(): void {
    this.isLoggedSub = this.lss.isLoggedIn.subscribe(loggedIn => this.isLoggedIn = loggedIn);
    this.productsStorage = this.lss.getProducts();
    this.getCartProducts();
    this.calculateAmount(this.productObject); 
  }

  private getCartProducts(): void {
    this.subscriptions = this.productService.getProducts().subscribe(products => {
      this.productObject = [];
      // Map with product as key
      let productMap = {}
      for (let product of products) {
        productMap[product.product_id] = product;
      }
      for (let j = 0; j < this.productsStorage.length; j++) {
        const productId = this.productsStorage[j].product_id
        this.productObject.push({ product: productMap[productId], amount: this.productsStorage[j].amount });          
      }
      this.calculateAmount(this.productObject);
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  updateAmount(idProduct: number, signe: string): void {
    this.lss.updateAmount(idProduct, signe);
    this.productObject = [];
    this.ngOnInit();
  
  }

  deleteProduct(idProduct: number): void {
    this.lss.deleteProducts(idProduct);
    this.productObject = [];
    this.ngOnInit();
 
  }


  calculateAmount(productObject: any):void {
    
    this.total = productObject.map(x => x.product.price * x.amount )
      .reduce((price1, price2) => price1 + price2, 0);
    
  }

  comprarClick() {
    if (!this.isLoggedIn) {
      // Si no esta logueado, lo llevamos a que se registre como comprador
      this.router.navigateByUrl('/purchaser-form');
    } else {
      // Realizar compra
      this.paymentService.checkout(this.productObject).subscribe((session_id) => {
        this.stripeCheckout(session_id);
      })
    }
  }

  async stripeCheckout(session_id) {
    return (await stripePromise).redirectToCheckout({ sessionId: session_id });
  }
}
