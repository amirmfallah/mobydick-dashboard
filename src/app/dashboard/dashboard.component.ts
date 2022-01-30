import { BranchesService } from 'src/core/services/branches.service';
import { Component, OnInit } from '@angular/core';

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
  ngOnInit(): void {}
}
