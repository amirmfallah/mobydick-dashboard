import { searchResponse } from './../../../../core/interfaces/shared.interfaces';
import { PageEvent } from '@angular/material/paginator';
import { debounce, map, switchMap } from 'rxjs/operators';
import { CreateNewCategoryComponent } from './../../../dialogs/create-new-category/create-new-category.component';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, interval, Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CategoryItem } from '../../interfaces/categories.interface';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'mbd-categories-desktop',
  templateUrl: './categories-desktop.component.html',
  styleUrls: ['./categories-desktop.component.scss'],
})
export class CategoriesDesktopComponent implements OnInit {
  categories = new BehaviorSubject<CategoryItem[]>(undefined);
  pages = new BehaviorSubject<number>(undefined);
  limit = new BehaviorSubject<number>(undefined);
  count = new BehaviorSubject<number>(undefined);
  currentPage = new BehaviorSubject<number>(undefined);
  pageEvent: PageEvent;
  $search = new Subject();
  searchExp: string = '';
  constructor(
    private categoryService: CategoriesService,
    private dialog: MatDialog
  ) {
    this.$search
      .pipe(
        debounce(() => interval(1000)),
        map((exp: string) =>
          this.categoryService
            .getAllCategories(0, exp)
            .subscribe((res: searchResponse<CategoryItem>) => {
              console.log(res);
              this.categories.next(res.items);
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
    this.categoryService
      .getAllCategories(0)
      .subscribe((res: searchResponse<CategoryItem>) => {
        console.log(res);
        this.categories.next(res.items);
        this.pages.next(res.pages);
        this.limit.next(res.limit);
        this.count.next(res.count);
        this.currentPage.next(res.currentPage);
      });
  }
  openNewCategoryDialog() {
    const dialogRef = this.dialog
      .open(CreateNewCategoryComponent, {
        data: undefined,
      })
      .afterClosed()
      .subscribe(() => {
        this.categoryService
          .getAllCategories(0)
          .subscribe((res: searchResponse<CategoryItem>) => {
            console.log(res);
            this.categories.next(res.items);
            this.pages.next(res.pages);
            this.limit.next(res.limit);
            this.count.next(res.count);
            this.currentPage.next(res.currentPage);
          });
      });
  }

  editCategory(category: CategoryItem) {
    const dialogRef = this.dialog
      .open(CreateNewCategoryComponent, {
        data: category,
      })
      .afterClosed()
      .subscribe(() => {
        this.categoryService
          .getAllCategories(0)
          .subscribe((res: searchResponse<CategoryItem>) => {
            console.log(res);
            this.categories.next(res.items);
            this.pages.next(res.pages);
            this.limit.next(res.limit);
            this.count.next(res.count);
            this.currentPage.next(res.currentPage);
          });
      });
  }

  delete(id: string): void {
    this.categoryService
      .deleteCategoryById(id)
      .pipe(
        switchMap(() => {
          return this.categoryService.getAllCategories(this.currentPage.value);
        })
      )
      .subscribe((res: searchResponse<CategoryItem>) => {
        this.categories.next(res.items);
      });
  }

  updateData(event?: PageEvent) {
    this.categoryService
      .getAllCategories(event.pageIndex)
      .subscribe((res: searchResponse<CategoryItem>) => {
        console.log(res);
        this.categories.next(res.items);
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
