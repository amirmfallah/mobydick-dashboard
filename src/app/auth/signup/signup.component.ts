import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AbstractForm } from 'src/core/AbstractForm';
import { AuthService } from './../../../core/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GridBreakpointObserverService } from './../../../core/services/grid-breakpoint-observer.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { SignUpEntity } from '../shared/authentication.interface';

@Component({
  selector: 'mbd-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent
  extends AbstractForm<SignUpEntity>
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
    email: ['', [Validators.required, Validators.email]],
    name: ['', Validators.required],
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
    this.authService.signup(this.form.value).subscribe(
      () => {
        this.router.navigate(['/', 'dashboard']);
        this.enableForm();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        this.enableForm();
        switch (error.status) {
          case 409:
            this.error = 'کاربری با این مشخصات وجود دارد.';
            break;
          default:
            this.error = 'مشکلی نامشخص پیش آمده است.';
        }
        console.log(this.error);
      }
    );
  }
}
