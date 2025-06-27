import { Routes } from '@angular/router';
import { CartContainer } from './components/cart-container/cart-container';
import { ProductsContainer } from './components/products-container/products-container';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/products-container/products-container').then(
        (m) => m.ProductsContainer
      ),
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./components/cart-container/cart-container').then(
        (m) => m.CartContainer
      ),
  },
  {
    path: 'product/:id',
    loadComponent: () =>
      import('./components/product-details/product-details').then(
        (m) => m.ProductDetails
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./components/register/register').then((m) => m.Register),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login').then((m) => m.Login),
  },
];
