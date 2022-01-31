import { UiKitModule } from './../ui-kit/ui-kit.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateNewStaffComponent } from './create-new-staff/create-new-staff.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CreateNewCategoryComponent } from './create-new-category/create-new-category.component';
import { EditBranchDialogComponent } from './edit-branch-dialog/edit-branch-dialog.component';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [
    CreateNewStaffComponent,
    CreateNewCategoryComponent,
    EditBranchDialogComponent,
  ],
  imports: [CommonModule, UiKitModule, MatDialogModule, ComponentsModule],
  exports: [
    CreateNewStaffComponent,
    CreateNewCategoryComponent,
    EditBranchDialogComponent,
  ],
})
export class DialogsModule {}
