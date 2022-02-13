import { branchSearch } from './../orders/interfaces/orders.interface';
import { switchMap } from 'rxjs/operators';
import { BranchesService } from 'src/core/services/branches.service';
import { Component, OnInit } from '@angular/core';
import { of, BehaviorSubject } from 'rxjs';
export interface ReportDto {
  totalCount: number;
  totalOpen: number;
  totalSold: number;
}

@Component({
  selector: 'mbd-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private branchesService: BranchesService) {
    this.branchesService.loadBranch();
  }
  hasBranch() {
    return this.branchesService.getBranch();
  }
  $branchDetail = new BehaviorSubject<ReportDto>({
    totalCount: 0,
    totalOpen: 0,
    totalSold: 0,
  });
  ngOnInit(): void {
    of('')
      .pipe(
        switchMap(() => this.branchesService.getMyBranch()),
        switchMap((branch: branchSearch) =>
          this.branchesService.getMybranchReport(branch._id)
        )
      )
      .subscribe((res: ReportDto) => {
        this.$branchDetail.next(res);
      });
  }
}
