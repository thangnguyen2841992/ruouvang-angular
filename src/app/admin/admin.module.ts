import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {AdminComponent} from './admin/admin.component';
import {CreateProductComponent} from './create-product/create-product.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment.prod';
import {AngularFireStorage} from '@angular/fire/storage';
import { EditProductComponent } from './edit-product/edit-product.component';


@NgModule({
  declarations: [AdminComponent, CreateProductComponent, EditProductComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [
    AngularFireStorage
  ]
})
export class AdminModule {
}
