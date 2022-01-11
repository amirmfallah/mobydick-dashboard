import { UiKitModule } from './../ui-kit/ui-kit.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateNewStaffComponent } from './create-new-staff/create-new-staff.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [CreateNewStaffComponent],
  imports: [CommonModule, UiKitModule, MatDialogModule],
  exports: [CreateNewStaffComponent],
})
export class DialogsModule {}