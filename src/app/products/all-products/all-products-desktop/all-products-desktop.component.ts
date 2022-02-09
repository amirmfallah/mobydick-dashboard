import { ConfirmDialogComponent } from './../../../dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { debounce, map, switchMap } from 'rxjs/operators';
import {
  ProductUnpopulated,
  productsResponse,
} from './../../interfaces/products.interface';
import { BehaviorSubject, interval, Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'mbd-all-products-desktop',
  templateUrl: './all-products-desktop.component.html',
  styleUrls: ['./all-products-desktop.component.scss'],
})
export class AllProductsDesktopComponent implements OnInit {
  products = new BehaviorSubject<ProductUnpopulated[]>(undefined);
  pages = new BehaviorSubject<number>(undefined);
  limit = new BehaviorSubject<number>(undefined);
  count = new BehaviorSubject<number>(undefined);
  currentPage = new BehaviorSubject<number>(undefined);
  pageEvent: PageEvent;
  $search = new Subject();
  searchExp: string = '';
  constructor(
    private productsService: ProductsService,
    private dialog: MatDialog
  ) {
    this.$search
      .pipe(
        debounce(() => interval(1000)),
        map((exp: string) =>
          this.productsService
            .getAllProducts(0, exp)
            .subscribe((res: productsResponse) => {
              console.log(res);
              this.products.next(res.items);
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
    this.productsService
      .getAllProducts(0)
      .subscribe((res: productsResponse) => {
        this.products.next(res.items);
        this.pages.next(res.pages);
        this.limit.next(res.limit);
        this.count.next(res.count);
        this.currentPage.next(res.currentPage);
      });
  }

  delete(id: string): void {
    this.dialog
      .open(ConfirmDialogComponent)
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.productsService
            .deleteProductById(id)
            .pipe(
              switchMap(() => {
                return this.productsService.getAllProducts(
                  this.currentPage.value
                );
              })
            )
            .subscribe((res: productsResponse) => {
              this.products.next(res.items);
            });
        }
      });
  }

  updateData(event?: PageEvent) {
    this.productsService
      .getAllProducts(event.pageIndex)
      .subscribe((res: productsResponse) => {
        this.products.next(res.items);
        this.pages.next(res.pages);
        this.limit.next(res.limit);
        this.count.next(res.count);
        this.currentPage.next(res.currentPage);
      });
    return event;
  }

  search(e) {
    console.log(this.searchExp);
    this.$search.next(this.searchExp);
  }
}
