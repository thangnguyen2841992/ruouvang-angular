import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [HomeComponent, AuthComponent, LoginComponent],
    imports: [
        CommonModule,
        HomeRoutingModule,
        ReactiveFormsModule
    ]
})
export class HomeModule { }
