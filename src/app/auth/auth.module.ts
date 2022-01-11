import { ComponentsModule } from './../components/components.module';
import { SignupDesktopComponent } from './signup/signup-desktop/signup-desktop.component';
import { SignupComponent } from './signup/signup.component';
import { SignedOutGuard } from './guards/signed-out.guard';
import { SignedInGuard } from './guards/signed-in.guard';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { LoginTabletComponent } from './login/login-tablet/login-tablet.component';
import { LoginMobileComponent } from './login/login-mobile/login-mobile.component';
import { LoginDesktopComponent } from './login/login-desktop/login-desktop.component';
import { UiKitModule } from './../ui-kit/ui-kit.module';
import { AuthService } from '../../core/services/auth.service';
import { TokenInterceptor } from '../../core/interceptors/token.interceptor';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { SignupMobileComponent } from './signup/signup-mobile/signup-mobile.component';

@NgModule({
  declarations: [
    LoginDesktopComponent,
    LoginMobileComponent,
    LoginTabletComponent,
    LoginComponent,
    SignupDesktopComponent,
    SignupComponent,
    SignupMobileComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    UiKitModule,
    MatInputModule,
    ComponentsModule,
  ],
  providers: [
    SignedInGuard,
    SignedOutGuard,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
})
export class AuthModule {}
