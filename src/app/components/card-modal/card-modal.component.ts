import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartComponent } from '../cart/cart.component';
import { CartItem } from '../../models/cartitem';

@Component({
  selector: 'card-modal',
  standalone: true,
  imports: [CartComponent],
  templateUrl: './card-modal.component.html'
})
export class CardModalComponent {
  @Input() items: CartItem[] = [];
  @Input() total = 0;


  @Output() idProductEventEmitter = new EventEmitter();
  @Output() closeEventEmitter = new EventEmitter();


  onDeleteCart(id: number) {
    this.idProductEventEmitter.emit(id);
  }

  closeCart(): void {
    this.closeEventEmitter.emit();
  }
}
