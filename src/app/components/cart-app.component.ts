import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { CatalogComponent } from './catalog/catalog.component';
import { CartComponent } from './cart/cart.component';
import { CartItem } from '../models/cartitem';

@Component({
  selector: 'cart-app',
  standalone: true,
  imports: [CatalogComponent, CartComponent],
  templateUrl: './cart-app.component.html'
})
export class CartAppComponent implements OnInit {

  products: Product[] = [];

  items: CartItem[] = [];

  total: number = 0;

  showCart: boolean = false;

  constructor(private service: ProductService) { }

  ngOnInit(): void {
    this.products = this.service.findAll();
    this.items = JSON.parse(sessionStorage.getItem('cart')!) || []; //Carga el items de la sesion
    this.calculateTotal(); //Calcula el total al inicio de la aplicacion
  }

  onAddToCart(product: Product) {
    const hasItem = this.items.find(item => item.product.id === product.id);

    if (hasItem) {
      /* 1
      hasItem.quantity++;
      */

      // 2
      this.items = this.items.map(item => {
        if (item.product.id === product.id) {
          //item.quantity++; tambien funciona pero modifica el array original
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    } else {
      this.items = [... this.items, { product: { ...product }, quantity: 1 }];
    }
    this.calculateTotal();//Para que se calcule el total despues de que se añada algun producto
    this.saveSession();
    /* 
    Se copia items para que la lista original no se vea afectada y ya cogemos 
     esa copia y le añadimos un objeto product que tiene la info del producto 
     copiada y la cantidad
     */


    /*
    Con ... queda así, como un solo array normal: 
    this.items = [
      { product: { name: 'Laptop', price: 1000 }, quantity: 1 },
      { product: { name: 'Phone', price: 500 }, quantity: 2 }
    ];

    SIN ... queda así como dos arrays diferentes dentro del mismo:
    [ 
        { product: { name: 'Laptop', price: 1000 }, quantity: 1 },
        { product: { name: 'Phone', price: 500 }, quantity: 2 }
      ],
      { product: { name: 'Tablet', price: 300 }, quantity: 1 }
    ];
    */
  }

  onDeleteCart(id: number): void {
    //Si es distinto no pasa, se elimina entonces 
    this.items = this.items.filter(item => item.product.id !== id);
    this.calculateTotal(); //Para que se calcule el total despues de que se elimine algun producto
    this.saveSession();
  }

  calculateTotal(): void {
    this.total = this.items.reduce((accumulator, item) => accumulator + item.quantity * item.product.price, 0); //0 es el valor inicial del accumulator
  }

  saveSession(): void {
    //Se tiene que guardar lo   que sea como string
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }

  openCart(): void {
    //Lo cambia a su valor contrario
    this.showCart = !this.showCart;
  }
}
