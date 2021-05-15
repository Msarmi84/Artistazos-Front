import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SearcherProduct } from '../models/searcher-product';
import { ProductCategory } from '../models/enums/product-category.enum';
import { IdName } from '../models/id-name';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // http://localhost:3000/products
  URL = environment.baseUrl + 'products';

  constructor(private http:HttpClient) { }


  getCategoriaDeProducto(): IdName[] {
    return [
      { id: ProductCategory.libro, name: 'Libro' },
      { id: ProductCategory.musica, name: 'Música' },
      { id: ProductCategory.fotografia, name: 'Fotografía' },
      { id: ProductCategory.video, name: 'Video' },
      { id: ProductCategory.pintura, name: 'Pintura' },
      { id: ProductCategory.escultura, name: 'Escultura' }
    ];
  }
  // getCategoriaDeProducto(): IdName[] {
  //   return [
  //     { id: 1, name: 'Libro' },
  //     { id: 2, name: 'Música' },
  //     { id: 3, name: 'Fotografía' },
  //     { id: 4, name: 'Video' },
  //     { id: 5, name: 'Pintura' },
  //     { id: 6, name: 'Escultura' }
  //   ];
  // }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.URL}`).pipe(
      map(x => x.map(product => new Product(product)))
    )
  }

  getProductsByUserId(user_id:number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.URL}/allProducts/${user_id}`).pipe(
      map(x => x.map(product => new Product(product)))
    )
  }

  searchProduct(filter: SearcherProduct): Observable<Product[]> {
    return this.http.post<Product[]>(`${this.URL}/search`, filter).pipe(
      map(x => x.map(product => new Product(product)))
    );
  }

  saveProduct( product: FormData): Observable<Product> {
    const product_id = product.get('product_id')
    const user_id = product.get('user_id')
    console.log('console del service')
    console.log(product)
    if (product_id) {
      // PUT 
      return this.http.put<Product>(`${this.URL}/${product_id}`, product).pipe(
        map((x: any) => {
          return new Product(x)
        })
      )

    } else {
      // POST 
      return this.http.post<Product>(`${this.URL}/saveProduct/${user_id}`, product).pipe(
        map((x: any) => {
          return new Product(x)
        })
      )
    }

  }

  deleteProduct( product: Product): Observable<Boolean>{
    return this.http.delete<boolean>(`${this.URL}/deleteProduct/${product.product_id}`, { observe: 'response' }).pipe(
      map((x: HttpResponse<any>) => {
        return x.ok
      })
    )
  }
}

