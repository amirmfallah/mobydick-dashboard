import { AuthService } from './../../../../core/services/auth.service';
import { Role } from './../../../../core/core.interface';
import { searchResponse } from './../../../../core/interfaces/shared.interfaces';
import { BranchesModule } from './../../../branches/branches.module';
import { OrderDto, CartStatus } from './../../interfaces/orders.interface';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, interval, Subject } from 'rxjs';
import { OrdersService } from '../../services/orders.service';
import { debounce, map } from 'rxjs/operators';

@Component({
  selector: 'mbd-all-orders-desktop',
  templateUrl: './all-orders-desktop.component.html',
  styleUrls: ['./all-orders-desktop.component.scss'],
})
export class AllOrdersDesktopComponent implements OnInit {
  orders = new BehaviorSubject<OrderDto[]>(undefined);
  pages = new BehaviorSubject<number>(undefined);
  limit = new BehaviorSubject<number>(undefined);
  count = new BehaviorSubject<number>(undefined);
  currentPage = new BehaviorSubject<number>(undefined);
  pageEvent: PageEvent;
  $search = new Subject();
  searchExp: string = '';
  cartStatus = CartStatus;
  constructor(
    private ordersService: OrdersService,
    private authService: AuthService
  ) {
    this.$search
      .pipe(
        debounce(() => interval(1000)),
        map((exp: string) =>
          this.ordersService
            .getAllOrders(0, exp)
            .subscribe((res: searchResponse<OrderDto>) => {
              console.log(res);
              this.orders.next(res.items);
              this.pages.next(res.pages);
              this.limit.next(res.limit);
              this.count.next(res.count);
              this.currentPage.next(res.currentPage);
            })
        )
      )
      .subscribe();
  }

  ngOnInit(): void {
    console.log('ssd');
    this.ordersService
      .getAllOrders(0)
      .subscribe((res: searchResponse<OrderDto>) => {
        console.log(res);
        this.orders.next(res.items);
        this.pages.next(res.pages);
        this.limit.next(res.limit);
        this.count.next(res.count);
        this.currentPage.next(res.currentPage);
      });
  }

  changeStatus(orderId: string, e) {
    console.log(e);
    this.ordersService
      .updateOrder(orderId, { status: CartStatus[e] })
      .subscribe();
  }

  hasSuperAccess(): boolean {
    return this.authService.hasAccess(Role.Super);
  }

  delete(id: string): void {
    // this.ordersService
    //   .deleteIngredientsById(id)
    //   .pipe(
    //     switchMap(() => {
    //       return this.ingredientsService.getAllIngredients(
    //         this.currentPage.value
    //       );
    //     })
    //   )
    //   .subscribe((res: searchResponse<Ingredients>) => {
    //     this.ingredients.next(res.items);
    //   });
  }

  updateData(event?: PageEvent) {
    // this.ingredientsService
    //   .getAllIngredients(event.pageIndex)
    //   .subscribe((res: searchResponse<Ingredients>) => {
    //     this.ingredients.next(res.items);
    //     this.pages.next(res.pages);
    //     this.limit.next(res.limit);
    //     this.count.next(res.count);
    //     this.currentPage.next(res.currentPage);
    //   });
    return event;
  }

  search(e) {
    console.log(this.searchExp);
    this.$search.next(this.searchExp);
  }
}
