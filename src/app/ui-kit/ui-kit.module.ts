import { DragDropDirective } from './../dialogs/directive/drag-drop.directive';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

import {
  MatExpansionModule,
  MatExpansionPanel,
} from '@angular/material/expansion';
import { OptionItemComponent } from './option-item/option-item.component';

@NgModule({
  declarations: [
    StaffItemDesktopComponent,
    StaffItemMobileComponent,
    DragDropDirective,
    OptionItemComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatRadioModule,
    MatExpansionModule,
    MatTabsModule,
    FormsModule,
    MatSnackBarModule,
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
    MatExpansionModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTabsModule,
    OptionItemComponent,
    MatSnackBarModule,
    FormsModule,
    MatPaginatorModule,
    MatTableModule,
  ],
})
export class UiKitModule {}
