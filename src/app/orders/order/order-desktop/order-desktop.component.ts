import {
  CartStatusPersian,
  CartDto,
  CartItem,
  CartItemPopulated,
  CartStatus,
} from './../../interfaces/orders.interface';
import { BehaviorSubject } from 'rxjs';
import { OrdersService } from './../../services/orders.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderExistingDto } from '../../interfaces/orders.interface';

@Component({
  selector: 'mbd-order-desktop',
  templateUrl: './order-desktop.component.html',
  styleUrls: ['./order-desktop.component.scss'],
})
export class OrderDesktopComponent implements OnInit {
  constructor(
    private ordersService: OrdersService,
    private route: ActivatedRoute
  ) {}

  $order: BehaviorSubject<OrderExistingDto>;
  $cart: BehaviorSubject<CartDto>;
  cartStatusPerisan = CartStatusPersian;
  cartStatus = CartStatus;
  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('id');
    this.ordersService
      .getOrderById(orderId)
      .subscribe((res: OrderExistingDto) => {
        this.$order = new BehaviorSubject<OrderExistingDto>(res);
        this.ordersService
          .getCartById(res.cartId._id)
          .subscribe((cart: CartDto) => {
            console.log(cart);
            this.$cart = new BehaviorSubject<CartDto>(cart);
          });
      });
  }

  getOptionName(item: CartItemPopulated) {
    return item.productId.price.filter((x) => x._id == item.option)[0]
      .optionName;
  }

  changeStatus(orderId: string, e) {
    console.log(e);
    this.ordersService
      .updateOrder(orderId, { status: CartStatus[e] })
      .subscribe();
  }
}
