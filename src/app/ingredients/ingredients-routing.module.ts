import { AllIngredientsComponent } from './all-ingredients/all-ingredients.component';
import { SignedInGuard } from './../auth/guards/signed-in.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AllIngredientsComponent,
    canActivate: [SignedInGuard],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngredientsRoutingModule {}
