import { UiKitModule } from './../ui-kit/ui-kit.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { AllOrdersDesktopComponent } from './all-orders/all-orders-desktop/all-orders-desktop.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersService } from './services/orders.service';
import { OrderComponent } from './order/order.component';
import { OrderDesktopComponent } from './order/order-desktop/order-desktop.component';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [
    AllOrdersComponent,
    AllOrdersDesktopComponent,
    OrderComponent,
    OrderDesktopComponent,
  ],
  imports: [CommonModule, OrdersRoutingModule, UiKitModule, ComponentsModule],
  providers: [OrdersService],
})
export class OrdersModule {}
