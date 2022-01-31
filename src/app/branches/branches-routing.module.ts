import { AllBranchesComponent } from './all-branches/all-branches.component';
import { AllBranchesDesktopComponent } from './all-branches/all-branches-desktop/all-branches-desktop.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SignedInGuard } from 'src/app/auth/guards/signed-in.guard';

const routes: Routes = [
  {
    path: '',
    component: AllBranchesComponent,
    canActivate: [SignedInGuard],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BranchesRoutingModule {}
