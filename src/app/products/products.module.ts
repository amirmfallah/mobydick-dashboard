import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { AllProductsComponent } from './all-products/all-products.component';
import { UiKitModule } from '../ui-kit/ui-kit.module';
import { ProductsService } from './services/products.service';
import { AllProductsDesktopComponent } from './all-products/all-products-desktop/all-products-desktop.component';
import { NewProductComponent } from './new-product/new-product.component';
import { NewProductDesktopComponent } from './new-product/new-product-desktop/new-product-desktop.component';

@NgModule({
  declarations: [
    AllProductsComponent,
    AllProductsDesktopComponent,
    NewProductComponent,
    NewProductDesktopComponent,
  ],
  imports: [CommonModule, ProductsRoutingModule, UiKitModule],
  providers: [ProductsService],
})
export class ProductsModule {}
