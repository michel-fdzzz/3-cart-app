import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { products } from '../data/product.data';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  findAll(): Product[] {
    //Lo completaremos más tarde
    return products;
  }
}
