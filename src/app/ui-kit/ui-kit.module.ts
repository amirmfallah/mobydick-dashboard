import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { StaffItemDesktopComponent } from './staff-item/staff-item-desktop/staff-item-desktop.component';
import { StaffItemMobileComponent } from './staff-item/staff-item-mobile/staff-item-mobile.component';
import { MatSelectModule } from '@angular/material/select';
@NgModule({
  declarations: [StaffItemDesktopComponent, StaffItemMobileComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatSelectModule,
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatSelectModule,
    StaffItemDesktopComponent,
    StaffItemMobileComponent,
  ],
})
export class UiKitModule {}
