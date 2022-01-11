import { AuthService } from 'src/core/services/auth.service';
import { takeUntil } from 'rxjs/operators';
import { GridBreakpointObserverService } from './../core/services/grid-breakpoint-observer.service';
import { Subject, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mbd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private gridBreakpointObserverService: GridBreakpointObserverService,
    private authService: AuthService
  ) {}
  public viewFileDesktopVisible$: Observable<boolean>;
  public viewFileTabletVisible$: Observable<boolean>;
  public viewFileMobileVisible$: Observable<boolean>;
  private readonly destroy$ = new Subject<undefined>();

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

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
