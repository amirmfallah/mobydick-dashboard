import { UiKitModule } from './../ui-kit/ui-kit.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateNewStaffComponent } from './create-new-staff/create-new-staff.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CreateNewCategoryComponent } from './create-new-category/create-new-category.component';

@NgModule({
  declarations: [CreateNewStaffComponent, CreateNewCategoryComponent],
  imports: [CommonModule, UiKitModule, MatDialogModule],
  exports: [CreateNewStaffComponent, CreateNewCategoryComponent],
})
export class DialogsModule {}
