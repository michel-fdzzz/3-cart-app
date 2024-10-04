import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CartItem } from '../../models/cartitem';

@Component({
  selector: 'cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnChanges {

  @Input() items: CartItem[] = [];

  total = 0;

  @Output() idProductEventEmitter = new EventEmitter();

  //Cada vez que se cambie el items se ejecuta el metodo ngOnChanges
  ngOnChanges(changes: SimpleChanges): void {
    //let itemsChanges = changes['items'];
    this.calculateTotal();
    this.saveSession();
  }

  onDeleteCart(id: number) {
    this.idProductEventEmitter.emit(id);
  }

  calculateTotal(): void {
    this.total = this.items.reduce((accumulator, item) => accumulator + item.quantity * item.product.price, 0); //0 es el valor inicial del accumulator
  }

  //Se mantiene auqi esta funcion ya que si borramos productos del carrito al abrir la modal, ha de guardarse en 
  //sesion por los cambios, si lo quitamos y solo lo dejamos en el addCart pues las eliminaciones no cuentan
  saveSession(): void {
    //Se tiene que guardar lo   que sea como string
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }
}
