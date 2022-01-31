import { BranchesRoutingModule } from './branches-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllBranchesComponent } from './all-branches/all-branches.component';
import { AllBranchesDesktopComponent } from './all-branches/all-branches-desktop/all-branches-desktop.component';
import { UiKitModule } from '../ui-kit/ui-kit.module';

@NgModule({
  declarations: [AllBranchesComponent, AllBranchesDesktopComponent],
  imports: [CommonModule, UiKitModule, BranchesRoutingModule],
})
export class BranchesModule {}
