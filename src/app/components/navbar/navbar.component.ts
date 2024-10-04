import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../models/cartitem';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  @Input() items: CartItem[] = [];

  @Output() openEventEmitter = new EventEmitter();

  openCart(): void {
    this.openEventEmitter.emit();
  }
}
