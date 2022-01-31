import { BranchesModule } from './branches/branches.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import { StaffModule } from './staff/staff.module';
import { DialogsModule } from './dialogs/dialogs.module';
import { ComponentsModule } from './components/components.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './auth/auth.module';
import { UiKitModule } from './ui-kit/ui-kit.module';
import { BrowserModule } from '@angular/platform-browser';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CategoriesModule } from './categories/categories.module';
import { IngredientsService } from 'src/core/services/ingredients.service';
import { CategoriesService } from './categories/services/categories.service';
import { DashboardModule } from './dashboard/dashboard.module';
import { NotificationService } from '../core/services/notification.service';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomPaginator } from 'src/core/CustomPaginatorConfiguration';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    UiKitModule,
    AuthModule,
    BrowserAnimationsModule,
    MatIconModule,
    ComponentsModule,
    DialogsModule,
    StaffModule,
    CategoriesModule,
    DashboardModule,
    IngredientsModule,
    BranchesModule,
  ],
  providers: [
    IngredientsService,
    CategoriesService,
    NotificationService,
    { provide: MatPaginatorIntl, useValue: CustomPaginator() },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
