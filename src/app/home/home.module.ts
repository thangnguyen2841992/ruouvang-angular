import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';
import {AuthComponent} from './auth/auth.component';
import {LoginComponent} from './login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {CartComponent} from './cart/cart.component';
import {CartDetailComponent} from './cart-detail/cart-detail.component';
import {ListAlcoholByTypeComponent} from './list-alcohol-by-type/list-alcohol-by-type.component';
import { ListAlcoholByTypeRealComponent } from './list-alcohol-by-type-real/list-alcohol-by-type-real.component';


@NgModule({
  declarations: [
    HomeComponent,
    AuthComponent,
    LoginComponent,
    ProductDetailComponent,
    CartComponent,
    CartDetailComponent,
    ListAlcoholByTypeComponent,
    ListAlcoholByTypeRealComponent
    ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule
  ]
})
export class HomeModule {
}
