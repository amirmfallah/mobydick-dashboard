import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesDesktopComponent } from './categories/categories-desktop/categories-desktop.component';
import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories/categories.component';
import { CategoriesService } from './services/categories.service';
import { CategoryComponent } from './category/category.component';
import { UiKitModule } from '../ui-kit/ui-kit.module';
import { DialogsModule } from '../dialogs/dialogs.module';

@NgModule({
  declarations: [
    CategoriesComponent,
    CategoriesDesktopComponent,
    CategoryComponent,
  ],
  imports: [CommonModule, CategoriesRoutingModule, UiKitModule, DialogsModule],
  providers: [CategoriesService],
})
export class CategoriesModule {}
