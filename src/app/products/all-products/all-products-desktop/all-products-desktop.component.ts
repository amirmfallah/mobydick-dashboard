import { switchMap } from 'rxjs/operators';
import {
  ProductUnpopulated,
  productsResponse,
} from './../../interfaces/products.interface';
import { BehaviorSubject } from 'rxjs';
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

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService
      .getAllProducts(1)
      .subscribe((res: productsResponse) => {
        this.products.next(res.items);
        this.pages.next(res.pages);
        this.limit.next(res.limit);
        this.count.next(res.count);
        this.currentPage.next(res.currentPage);
      });
  }

  delete(id: string): void {
    this.productsService
      .deleteProductById(id)
      .pipe(
        switchMap(() => {
          return this.productsService.getAllProducts(this.currentPage.value);
        })
      )
      .subscribe((res: productsResponse) => {
        this.products.next(res.items);
      });
  }

  updateData(event?: PageEvent) {
    this.productsService
      .getAllProducts(event.pageIndex + 1)
      .subscribe((res: productsResponse) => {
        this.products.next(res.items);
        this.pages.next(res.pages);
        this.limit.next(res.limit);
        this.count.next(res.count);
        this.currentPage.next(res.currentPage);
      });
    return event;
  }
}
