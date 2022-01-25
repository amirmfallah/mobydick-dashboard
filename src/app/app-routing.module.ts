import { StaffComponent } from './staff/staff.component';
import { ToolbarDesktopComponent } from './components/toolbar/toolbar-desktop/toolbar-desktop.component';
import { SignedInGuard } from './auth/guards/signed-in.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [SignedInGuard],
  },
  {
    path: 'categories',
    canActivate: [SignedInGuard],
    loadChildren: () =>
      import('./categories/categories.module').then((m) => m.CategoriesModule),
  },
  {
    path: 'products',
    canActivate: [SignedInGuard],
    loadChildren: () =>
      import('./products/products.module').then((m) => m.ProductsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
