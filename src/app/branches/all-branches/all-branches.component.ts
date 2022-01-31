import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GridBreakpointObserverService } from 'src/core/services/grid-breakpoint-observer.service';

@Component({
  selector: 'mbd-all-branches',
  templateUrl: './all-branches.component.html',
  styleUrls: ['./all-branches.component.scss'],
})
export class AllBranchesComponent implements OnInit {
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
