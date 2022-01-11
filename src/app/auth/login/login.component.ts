import { Router } from '@angular/router';
import { AuthService } from './../../../core/services/auth.service';
import { SignInEntity } from './../shared/authentication.interface';
import { GridBreakpointObserverService } from './../../../core/services/grid-breakpoint-observer.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractForm } from 'src/core/AbstractForm';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'mbd-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent
  extends AbstractForm<SignInEntity>
  implements OnInit, OnDestroy
{
  public viewFileDesktopVisible$: Observable<boolean>;
  public viewFileTabletVisible$: Observable<boolean>;
  public viewFileMobileVisible$: Observable<boolean>;
  private readonly destroy$ = new Subject<undefined>();

  error: string;
  passwordVisibility = false;
  form: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private gridBreakpointObserverService: GridBreakpointObserverService,
    private fb: FormBuilder,
    private authService: AuthService,
    public router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.viewFileDesktopVisible$ = this.gridBreakpointObserverService
      .up('xl')
      .pipe(takeUntil(this.destroy$));
    this.viewFileTabletVisible$ = this.gridBreakpointObserverService
      .between('md', 'xl')
      .pipe(takeUntil(this.destroy$));
    this.viewFileMobileVisible$ = this.gridBreakpointObserverService
      .down('sm')
      .pipe(takeUntil(this.destroy$));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit(): void {
    if (this.form.status === 'INVALID') {
      return;
    }
    this.error = null;

    this.disableForm();
    this.authService.login(this.form.value).subscribe(
      () => {
        this.router.navigate(['/', 'dashboard']);
        this.enableForm();
      },
      (error: HttpErrorResponse) => {
        this.enableForm();
        switch (error.status) {
          case 403:
            this.error = 'نام کاربری یا رمز عبور معتبر نمی‌باشد.';
            break;
          default:
            this.error = 'مشکلی نامشخص پیش آمده است.';
        }
      }
    );
  }
}
