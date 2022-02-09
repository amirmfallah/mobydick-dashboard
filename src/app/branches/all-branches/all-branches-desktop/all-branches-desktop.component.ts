import { ConfirmDialogComponent } from './../../../dialogs/confirm-dialog/confirm-dialog.component';
import { branch } from 'src/app/products/interfaces/branches.interface';
import { BranchesService } from 'src/core/services/branches.service';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, interval, Subject } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { debounce, map, switchMap } from 'rxjs/operators';
import { searchResponse } from 'src/core/interfaces/shared.interfaces';
import { EditBranchDialogComponent } from 'src/app/dialogs/edit-branch-dialog/edit-branch-dialog.component';

@Component({
  selector: 'mbd-all-branches-desktop',
  templateUrl: './all-branches-desktop.component.html',
  styleUrls: ['./all-branches-desktop.component.scss'],
})
export class AllBranchesDesktopComponent implements OnInit {
  branches = new BehaviorSubject<branch[]>(undefined);
  pages = new BehaviorSubject<number>(undefined);
  limit = new BehaviorSubject<number>(undefined);
  count = new BehaviorSubject<number>(undefined);
  currentPage = new BehaviorSubject<number>(undefined);
  pageEvent: PageEvent;
  $search = new Subject();
  searchExp: string = '';
  constructor(
    private branchesService: BranchesService,
    private dialog: MatDialog
  ) {
    this.$search
      .pipe(
        debounce(() => interval(1000)),
        map((exp: string) =>
          this.branchesService
            .getAllBranches(0, exp)
            .subscribe((res: searchResponse<branch>) => {
              console.log(res);
              this.branches.next(res.items);
              this.pages.next(res.pages);
              this.limit.next(res.limit);
              this.count.next(res.count);
              this.currentPage.next(res.currentPage);
            })
        )
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.branchesService
      .getAllBranches(0)
      .subscribe((res: searchResponse<branch>) => {
        console.log(res);
        this.branches.next(res.items);
        this.pages.next(res.pages);
        this.limit.next(res.limit);
        this.count.next(res.count);
        this.currentPage.next(res.currentPage);
      });
  }
  openNewCategoryDialog() {
    //const dialogRef = this.dialog.open(CreateNewCategoryComponent);
  }

  delete(id: string): void {
    this.dialog
      .open(ConfirmDialogComponent)
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.branchesService
            .deleteBranchById(id)
            .pipe(
              switchMap(() => {
                return this.branchesService.getAllBranches(
                  this.currentPage.value
                );
              })
            )
            .subscribe((res: searchResponse<branch>) => {
              this.branches.next(res.items);
            });
        }
      });
  }

  updateData(event?: PageEvent) {
    this.branchesService
      .getAllBranches(event.pageIndex)
      .subscribe((res: searchResponse<branch>) => {
        console.log(res);
        this.branches.next(res.items);
        this.pages.next(res.pages);
        this.limit.next(res.limit);
        this.count.next(res.count);
        this.currentPage.next(res.currentPage);
      });
    return event;
  }

  search(e) {
    console.log(this.searchExp);
    this.$search.next(this.searchExp);
  }

  editBranch(b: branch) {
    let dialogRef = this.dialog.open(EditBranchDialogComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.updateData(<PageEvent>{ pageIndex: 0 });
    });
    console.log(b);
    dialogRef.componentInstance.$branch.next(b);
  }
}
