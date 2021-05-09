import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BuscadorProducto } from 'src/app/models/buscador-producto';
import { IdName } from 'src/app/models/id-name';
import { ProductService } from '../productos/product.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss']
})
export class BuscadorComponent implements OnInit {

  @Output() filter = new EventEmitter<BuscadorProducto>();
  productCategory: IdName[] = [];

  filterForm: FormGroup;
  
  constructor(fb: FormBuilder, private productService: ProductService) {
    this.filterForm = fb.group({
      name: [''],
      productCategory: [''],
      artist: [''],
      minPrice:[null],
      maxPrice:[null]
    });
   }

  ngOnInit(): void {
    this.productCategory = this.productService.getCategoriaDeProducto();
  }

  onSubmit(): void {
    this.filter.emit(this.filterForm.value);
  }
}
