import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  products = [];

  private readonly AP_TKN = 'AP_TKN';

  private isLoggedIn$: BehaviorSubject<boolean>;

  constructor(private router: Router) {
    this.isLoggedIn$ = new BehaviorSubject(this.isAuthenticated());
  }

  get isLoggedIn(): Observable<boolean> {
    return this.isLoggedIn$.asObservable();
  }

  saveUserToken(token: string): void {
    localStorage.setItem(this.AP_TKN, JSON.stringify(token));
    this.isLoggedIn$.next(true);
  }

  getUserToken(): string {
    const token = localStorage.getItem(this.AP_TKN);
    return JSON.parse(token) || null;
  }

  removeUserToken(): void {
    localStorage.removeItem(this.AP_TKN);
    this.isLoggedIn$.next(false);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.AP_TKN);
  }

  saveProduct(product) {

    let products = this.getProducts();
    console.log(products);
    
    


    let findProducts = this.products.find(x => x.product_id == product.product_id)
    console.log('findProducts')
    console.log(findProducts)
    if(findProducts == null){
    this.products.push(product);
    }

    let jProducts = JSON.stringify(this.products);
    sessionStorage.setItem("shoppingCart", jProducts);
  }

  getProducts(): any[]{

    let shoppingCart = sessionStorage.getItem("shoppingCart");
    let products = [];
    if(shoppingCart != null){
     products = JSON.parse(shoppingCart);

    }
    return products;
  }

  
}
