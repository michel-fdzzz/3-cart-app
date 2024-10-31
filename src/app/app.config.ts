import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { itemsReducer } from './store/items.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { ProductsReducer } from './store/products.reducer';
import { provideEffects } from '@ngrx/effects';
import { ProductsEffects } from './store/effects/products.effects';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes), provideStore({
    items: itemsReducer,
    products: ProductsReducer
  }), provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  provideEffects(ProductsEffects)]
};
