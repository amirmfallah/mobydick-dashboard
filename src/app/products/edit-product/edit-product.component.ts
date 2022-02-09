import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GridBreakpointObserverService } from 'src/core/services/grid-breakpoint-observer.service';

@Component({
  selector: 'mbd-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
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
