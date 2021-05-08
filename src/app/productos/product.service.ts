import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BuscadorProducto } from '../models/buscador-producto';
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

  searchProduct(filter: BuscadorProducto): Observable<Product[]> {
    return this.http.post<Product[]>(`${this.URL}/search`, filter).pipe(
      map(x => x.map(product => new Product(product)))
    )
  }
}
