import { takeUntil } from 'rxjs/operators';
import { GridBreakpointObserverService } from './../../core/services/grid-breakpoint-observer.service';
import { Observable, Subject } from 'rxjs';
import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'mbd-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class StaffComponent implements OnInit, OnDestroy {
  public viewFileDesktopVisible$: Observable<boolean>;
  public viewFileTabletVisible$: Observable<boolean>;
  public viewFileMobileVisible$: Observable<boolean>;
  private readonly destroy$ = new Subject<undefined>();
  constructor(
    private gridBreakpointObserverService: GridBreakpointObserverService
  ) {}

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
}
