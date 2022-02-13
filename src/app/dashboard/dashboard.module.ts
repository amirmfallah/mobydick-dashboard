import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiKitModule } from '../ui-kit/ui-kit.module';
import { NewBranchComponent } from './new-branch/new-branch.component';

@NgModule({
  declarations: [DashboardComponent, NewBranchComponent],
  imports: [CommonModule, UiKitModule],
  exports: [NewBranchComponent],
})
export class DashboardModule {}
