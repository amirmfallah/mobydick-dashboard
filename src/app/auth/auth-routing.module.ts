import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { SignedOutGuard } from './guards/signed-out.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/sign-in',
    pathMatch: 'full',
  },
  {
    path: 'sign-in',
    canActivate: [SignedOutGuard],
    component: LoginComponent,
  },
  {
    path: 'sign-up',
    canActivate: [SignedOutGuard],
    component: SignupComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
