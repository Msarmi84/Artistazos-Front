import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product';
import { getUserFromToken } from '../_helpers/tokenHelper';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  products = [];
  productObject:  Array<any> = [];
  

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

  //Almacena los productos en el sessionStorage
  saveProduct(product) {
    const user_id = getUserFromToken().user_id;

    let products = this.getProducts();
    console.log(products);   
    let findProducts = this.products.find(x => x.product_id == product.product_id)
    if(findProducts == null){
    this.products.push(product);
    }
    let jProducts = JSON.stringify(this.products); 
    sessionStorage.setItem( user_id? user_id: "shoppingCart", jProducts);
  }

  //Obtiene los productos del sessionStorage
  getProducts(): any[]{
    const user_id = getUserFromToken().user_id;
    let shoppingCart = sessionStorage.getItem(user_id ? user_id: "shoppingCart");
    let shoppingCartGuest = sessionStorage.getItem("shoppingCart");
    let products = [];
    if(shoppingCart != null){
     products = JSON.parse(shoppingCart);

    } else if (shoppingCartGuest != null) {
      products = JSON.parse(shoppingCartGuest);
    } else {
      this.products = [];
    }
    return products;
  }

  //Elimina el carrito de aquellos usuarios no logueados
  deleteCart():any {
    
      sessionStorage.removeItem("shoppingCart");
      this.getProducts();
    
  }

    //Elimina todos los carritos del sessionStorage
  cleanProducts():void {
    const user_id = getUserFromToken().user_id;
    sessionStorage.removeItem(user_id ? user_id: "shoppingCart");
    sessionStorage.removeItem("shoppingCart");
  }

  //elimina productos del sessionStorage
  deleteProducts(idProduct:number):void {
    const user_id = getUserFromToken().user_id;
    this.productObject = this.getProducts();
    this.productObject = this.productObject.filter(x => x.product_id !== idProduct );
    this.products = this.productObject;
    let newProducts = JSON.stringify(this.productObject);
    sessionStorage.setItem(user_id? user_id: "shoppingCart", newProducts);

  }


  //Aumenta o disminuye el monto total
  updateAmount(idProduct:number, signe: string):void {
    const user_id = getUserFromToken().user_id;
    let products = this.getProducts();
    for(let i = 0; i < products.length; i++){
        if(products[i].product_id == idProduct && signe === '+'){ 
          console.log('suma') 
          products[i].amount++;
        }
        if(products[i].product_id == idProduct && signe === '-'){  
          if(products[i].amount > 1){
            console.log('resta')
            products[i].amount--;
          };
        }
      }
    let jProducts = JSON.stringify(products);
    sessionStorage.setItem(user_id? user_id: "shoppingCart", jProducts); 
  }

  
}
