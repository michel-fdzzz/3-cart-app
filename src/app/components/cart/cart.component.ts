import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CartItem } from '../../models/cartitem';
import { Router } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';
import { ItemsState } from '../../store/items.reducer';
import { Store } from '@ngrx/store';
import { total } from '../../store/items.action';

@Component({
  selector: 'cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {

  items: CartItem[] = [];

  total = 0;

  constructor(
    private store: Store<{ items: ItemsState }>,
    private sharingDataService: SharingDataService, private router: Router) {

    this.store.select('items').subscribe(state => {
      this.items = state.items;
      this.total = state.total;
    });
  }
  ngOnInit(): void {
    this.store.dispatch(total());
  }
  onDeleteCart(id: number) {
    //Llamamos al metodo get de sharingDataService 
    this.sharingDataService.idProductEventEmitter.emit(id);
  }
  /*
    onAddCart(id: number) {
      //Llamamos al metodo get de sharingDataService 
      this.sharingDataService.idProductEventEmitter.emit(id);
    }*/
}
