import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../models/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Router } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';
import { ProductService } from '../../services/product.service';
import { Store } from '@ngrx/store';
import { load } from '../../store/products.actions';

@Component({
  selector: 'catalog',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './catalog.component.html'
})
export class CatalogComponent implements OnInit {

  products!: Product[];

  productEventEmitter: EventEmitter<Product> = new EventEmitter();

  constructor(
    private store: Store<{ products: any }>,
    private productService: ProductService,
    private sharingDataService: SharingDataService) {
    this.store.select('products').subscribe(state => { this.products = state.products; });
  }

  ngOnInit(): void {
    //Esta opcion se va despachar al store y en el store va a buscar que reducer cntiene alguna accion llamada load (en app.config.ts lo mira)
    this.store.dispatch(load({ products: this.productService.findAll() }));
  }

  onAddToCart(product: Product) {
    this.sharingDataService.productEventEmitter.emit(product);
  }

}
