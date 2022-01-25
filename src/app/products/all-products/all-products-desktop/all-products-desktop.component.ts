import { switchMap } from 'rxjs/operators';
import { ProductUnpopulated } from './../../interfaces/products.interface';
import { BehaviorSubject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'mbd-all-products-desktop',
  templateUrl: './all-products-desktop.component.html',
  styleUrls: ['./all-products-desktop.component.scss'],
})
export class AllProductsDesktopComponent implements OnInit {
  products = new BehaviorSubject<ProductUnpopulated[]>(undefined);
  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService
      .getAllProducts()
      .subscribe((res: ProductUnpopulated[]) => {
        this.products.next(res);
      });
  }

  delete(id: string): void {
    this.productsService
      .deleteProductById(id)
      .pipe(
        switchMap(() => {
          return this.productsService.getAllProducts();
        })
      )
      .subscribe((res: ProductUnpopulated[]) => {
        this.products.next(res);
      });
  }
}
