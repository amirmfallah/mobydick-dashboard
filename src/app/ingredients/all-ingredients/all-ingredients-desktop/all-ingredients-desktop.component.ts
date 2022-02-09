import { ConfirmDialogComponent } from './../../../dialogs/confirm-dialog/confirm-dialog.component';
import { CreateIngredient } from './../../../../core/interfaces/shared.interfaces';
import { CreateIngredientDialogComponent } from './../../../dialogs/create-ingredient-dialog/create-ingredient-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { debounce, map, switchMap } from 'rxjs/operators';
import { IngredientsService } from './../../../../core/services/ingredients.service';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, Subject, interval } from 'rxjs';
import { searchResponse } from 'src/core/interfaces/shared.interfaces';
import { Ingredients } from 'src/app/products/interfaces/products.interface';

@Component({
  selector: 'mbd-all-ingredients-desktop',
  templateUrl: './all-ingredients-desktop.component.html',
  styleUrls: ['./all-ingredients-desktop.component.scss'],
})
export class AllIngredientsDesktopComponent implements OnInit {
  ingredients = new BehaviorSubject<Ingredients[]>(undefined);
  pages = new BehaviorSubject<number>(undefined);
  limit = new BehaviorSubject<number>(undefined);
  count = new BehaviorSubject<number>(undefined);
  currentPage = new BehaviorSubject<number>(undefined);
  pageEvent: PageEvent;
  $search = new Subject();
  searchExp: string = '';
  constructor(
    private ingredientsService: IngredientsService,
    private dialog: MatDialog
  ) {
    this.$search
      .pipe(
        debounce(() => interval(1000)),
        map((exp: string) =>
          this.ingredientsService
            .getAllIngredients(0, exp)
            .subscribe((res: searchResponse<Ingredients>) => {
              console.log(res);
              this.ingredients.next(res.items);
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
    this.ingredientsService
      .getAllIngredients(0)
      .subscribe((res: searchResponse<Ingredients>) => {
        console.log(res);
        this.ingredients.next(res.items);
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
          this.ingredientsService
            .deleteIngredientsById(id)
            .pipe(
              switchMap(() => {
                return this.ingredientsService.getAllIngredients(
                  this.currentPage.value
                );
              })
            )
            .subscribe((res: searchResponse<Ingredients>) => {
              this.ingredients.next(res.items);
            });
        }
      });
  }

  updateData(event?: PageEvent) {
    this.ingredientsService
      .getAllIngredients(event.pageIndex)
      .subscribe((res: searchResponse<Ingredients>) => {
        this.ingredients.next(res.items);
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

  createIngredient() {
    this.dialog
      .open(CreateIngredientDialogComponent, { data: undefined })
      .afterClosed()
      .subscribe(() => {
        this.ingredientsService
          .getAllIngredients(0)
          .subscribe((res: searchResponse<Ingredients>) => {
            console.log(res);
            this.ingredients.next(res.items);
            this.pages.next(res.pages);
            this.limit.next(res.limit);
            this.count.next(res.count);
            this.currentPage.next(res.currentPage);
          });
      });
  }

  editIngredient(ing: CreateIngredient) {
    this.dialog
      .open(CreateIngredientDialogComponent, { data: ing })
      .afterClosed()
      .subscribe(() => {
        this.ingredientsService
          .getAllIngredients(0)
          .subscribe((res: searchResponse<Ingredients>) => {
            console.log(res);
            this.ingredients.next(res.items);
            this.pages.next(res.pages);
            this.limit.next(res.limit);
            this.count.next(res.count);
            this.currentPage.next(res.currentPage);
          });
      });
  }
}
