import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home.component';
import {AuthComponent} from './auth/auth.component';
import {LoginComponent} from './login/login.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {CartDetailComponent} from './cart-detail/cart-detail.component';
import {ListAlcoholByTypeComponent} from './list-alcohol-by-type/list-alcohol-by-type.component';
import {ListAlcoholByTypeRealComponent} from './list-alcohol-by-type-real/list-alcohol-by-type-real.component';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'register',
    component: AuthComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'product/:productId',
    component: ProductDetailComponent
  },
  {
    path: 'cart',
    component: CartDetailComponent
  },
  {
    path: 'origin/:typeId/:typeName',
    component: ListAlcoholByTypeComponent
  },
  {
    path: 'type/:typeId/:typeName',
    component: ListAlcoholByTypeRealComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
