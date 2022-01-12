import { DragDropDirective } from './../dialogs/directive/drag-drop.directive';
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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    StaffItemDesktopComponent,
    StaffItemMobileComponent,
    DragDropDirective,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatSelectModule,
    MatProgressSpinnerModule,
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
    DragDropDirective,
    MatProgressSpinnerModule,
  ],
})
export class UiKitModule {}
