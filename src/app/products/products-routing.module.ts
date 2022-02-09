import { EditProductComponent } from './edit-product/edit-product.component';
import { SignedInGuard } from './../auth/guards/signed-in.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AllProductsComponent } from './all-products/all-products.component';
import { NewProductComponent } from './new-product/new-product.component';

const routes: Routes = [
  {
    path: '',
    component: AllProductsComponent,
    canActivate: [SignedInGuard],
  },
  {
    path: 'new',
    component: NewProductComponent,
    canActivate: [SignedInGuard],
  },
  {
    path: ':id',
    component: EditProductComponent,
    canActivate: [SignedInGuard],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
