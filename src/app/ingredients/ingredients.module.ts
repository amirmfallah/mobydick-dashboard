import { IngredientsRoutingModule } from './ingredients-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllIngredientsComponent } from './all-ingredients/all-ingredients.component';
import { AllIngredientsDesktopComponent } from './all-ingredients/all-ingredients-desktop/all-ingredients-desktop.component';
import { UiKitModule } from '../ui-kit/ui-kit.module';

@NgModule({
  declarations: [AllIngredientsComponent, AllIngredientsDesktopComponent],
  imports: [CommonModule, UiKitModule, IngredientsRoutingModule],
})
export class IngredientsModule {}
