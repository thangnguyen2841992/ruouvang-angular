import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminComponent} from './admin/admin.component';
import {CreateProductComponent} from './create-product/create-product.component';



const routes: Routes = [
  {
    path: 'all',
    component: AdminComponent
  },
  {
    path: 'product/create',
    component: CreateProductComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
