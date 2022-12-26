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
import { CreateProductAccessoryComponent } from './create-product-accessory/create-product-accessory.component';
import { ListAccessoryComponent } from './list-accessory/list-accessory.component';
import { EditAccessoryComponent } from './edit-accessory/edit-accessory.component';
import { ListAlcoholByOriginComponent } from './list-alcohol-by-origin/list-alcohol-by-origin.component';
import { ListAcoholByTypeComponent } from './list-acohol-by-type/list-acohol-by-type.component';
import {MatCardModule, MatProgressSpinnerModule} from '@angular/material';


@NgModule({
  declarations: [AdminComponent, CreateProductComponent, EditProductComponent, CreateProductAccessoryComponent, ListAccessoryComponent, EditAccessoryComponent, ListAlcoholByOriginComponent, ListAcoholByTypeComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    MatProgressSpinnerModule,
    MatCardModule
  ],
  providers: [
    AngularFireStorage
  ]
})
export class AdminModule {
}
