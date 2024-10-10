import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductService } from '../services/product.service';
//import { Product } from '../models/product';
import { CatalogComponent } from './catalog/catalog.component';
import { CartItem } from '../models/cartitem';
import { NavbarComponent } from './navbar/navbar.component';
import { Router, RouterOutlet } from '@angular/router';
import { SharingDataService } from '../services/sharing-data.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'cart-app',
  standalone: true,
  imports: [CatalogComponent, NavbarComponent, RouterOutlet],
  templateUrl: './cart-app.component.html'
})
export class CartAppComponent implements OnInit {

  //products: Product[] = [];

  items: CartItem[] = [];

  total: number = 0;

  constructor(
    private router: Router,
    private sharingDataService: SharingDataService,
    private service: ProductService) { }

  ngOnInit(): void {

    this.items = JSON.parse(sessionStorage.getItem('cart') || '[]') || []; //Carga el items de la sesion
    this.calculateTotal(); //Calcula el total al inicio de la aplicacion

    //Para que se suscriba al inicio ya que tienen la funcion subscribe
    this.onDeleteCart();
    this.onAddToCart();
  }

  onAddToCart(): void {
    this.sharingDataService.productEventEmitter.subscribe(product => {
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
      //Lo mantenmos aqui ya que si la modal no se abre, no se guardan en la sesion las cosas con el onChange
      //así cada vez que se añada algo al carrito ya se guarda en sesion
      this.saveSession();
      this.calculateTotal();//Para que se calcule el total despues de que se añada algun producto
      //this.saveSession();
      this.router.navigate(['/cart'], {
        state: { items: this.items, total: this.total }
      });
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

      Swal.fire({
        title: "Shopping Cart",
        text: "Nuevo producto agregado",
        icon: "success"
      });
    })
  }

  onDeleteCart(): void {
    //El emit lo emite y el subscribe suscribe los eventos del EventEmitter y puede 
    //definir una funcion que se ejecutará cada vez que se emita un nuevo evento
    this.sharingDataService.idProductEventEmitter.subscribe(id => {
      console.log(id + ' se ha ejecutado el evento idProductEventEmitter')

      Swal.fire({
        title: "Seguro de que quiere eliminar el producto?",
        text: "Este cambio es irreversible!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar!"
      }).then((result) => {
        if (result.isConfirmed) {


          //Si es distinto no pasa, se elimina entonces 
          this.items = this.items.filter(item => item.product.id !== id);

          //Toca hacer esto ya que si el filter deja el array vacio, no lo tiene en 
          //cuenta como cambio ya que ya ha estado vacio y siempre se queda un ultimo elemento
          //pero si es 0 borramos el carrito y ya
          if (this.items.length === 0) sessionStorage.removeItem('cart');

          this.calculateTotal(); //Para que se calcule el total despues de que se elimine algun producto
          this.saveSession();


          //Necesario para refrescar el componente
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/cart'], {
              state: { items: this.items, total: this.total }
            });
          });


          Swal.fire({
            title: "Eliminado!",
            text: "Se ha eliminado el producto.",
            icon: "success"
          });
        }
      });



    });

  }

  calculateTotal(): void {
    this.total = this.items.reduce((accumulator, item) => accumulator + item.quantity * item.product.price, 0); //0 es el valor inicial del accumulator
  }

  saveSession(): void {
    //Se tiene que guardar lo   que sea como string
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }
}
