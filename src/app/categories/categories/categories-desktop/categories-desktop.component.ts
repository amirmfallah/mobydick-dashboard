import { switchMap } from 'rxjs/operators';
import { CreateNewCategoryComponent } from './../../../dialogs/create-new-category/create-new-category.component';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { categoryItem } from '../../interfaces/categories.interface';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'mbd-categories-desktop',
  templateUrl: './categories-desktop.component.html',
  styleUrls: ['./categories-desktop.component.scss'],
})
export class CategoriesDesktopComponent implements OnInit {
  constructor(
    private categoryService: CategoriesService,
    private dialog: MatDialog
  ) {}
  categories = new BehaviorSubject<categoryItem[]>(undefined);

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe((res: categoryItem[]) => {
      this.categories.next(res);
    });
  }

  openNewCategoryDialog() {
    const dialogRef = this.dialog.open(CreateNewCategoryComponent);
  }

  delete(id: string) {
    this.categoryService
      .deleteCategoryById(id)
      .pipe(
        switchMap(() => {
          return this.categoryService.getAllCategories();
        })
      )
      .subscribe((res) => {
        this.categories.next(res);
      });
  }
}
