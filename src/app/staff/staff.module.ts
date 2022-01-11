import { ComponentsModule } from './../components/components.module';
import { StaffComponent } from './staff.component';
import { StaffDesktopComponent } from './staff-desktop/staff-desktop.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffItemMobileComponent } from '../ui-kit/staff-item/staff-item-mobile/staff-item-mobile.component';
import { UiKitModule } from '../ui-kit/ui-kit.module';
import { StaffMobileComponent } from './staff-mobile/staff-mobile.component';

@NgModule({
  declarations: [StaffDesktopComponent, StaffComponent, StaffMobileComponent],
  imports: [CommonModule, UiKitModule, ComponentsModule],
})
export class StaffModule {}
