import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { ProductsList } from './pages/products-list/products-list';
import { ProductDetails } from './pages/product-details/product-details';
import { ProductForm } from './pages/product-form/product-form';

export const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'products',
    component: ProductsList
  },
  {
    path: 'products/:id',
    component: ProductDetails
  },
  {
    path: 'add-product',
    component: ProductForm
  },
  {
    path: 'edit-product/:id',
    component: ProductForm
  },
  {
    path: '**',
    redirectTo: ''
  }
];