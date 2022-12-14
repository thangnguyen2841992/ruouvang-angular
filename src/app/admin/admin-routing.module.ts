import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminComponent} from './admin/admin.component';
import {CreateProductComponent} from './create-product/create-product.component';
import {EditProductComponent} from './edit-product/edit-product.component';
import {CreateProductAccessoryComponent} from './create-product-accessory/create-product-accessory.component';
import {ListAccessoryComponent} from './list-accessory/list-accessory.component';
import {EditAccessoryComponent} from './edit-accessory/edit-accessory.component';
import {ListAlcoholByOriginComponent} from './list-alcohol-by-origin/list-alcohol-by-origin.component';
import {ListAcoholByTypeComponent} from './list-acohol-by-type/list-acohol-by-type.component';


const routes: Routes = [
  {
    path: 'all',
    component: AdminComponent
  },
  {
    path: 'accessory/list',
    component: ListAccessoryComponent
  },
  {
    path: 'alcohol/origin/:originId/:originName',
    component: ListAlcoholByOriginComponent
  },
  {
    path: 'alcohol/type/:typeId/:typeName',
    component: ListAcoholByTypeComponent
  },
  {
    path: 'alcohol/create',
    component: CreateProductComponent
  },
  {
    path: 'accessory/create',
    component: CreateProductAccessoryComponent
  },
  {
    path: 'alcohol/edit/:id',
    component: EditProductComponent
  },
  {
    path: 'accessory/edit/:id',
    component: EditAccessoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
