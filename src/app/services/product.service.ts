import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { products } from '../data/product.data';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  findAll(): Observable<Product[]> {
    //Lo completaremos más tarde
    return of(products);
  }
}
