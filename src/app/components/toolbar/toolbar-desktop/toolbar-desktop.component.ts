import { BranchesService } from 'src/core/services/branches.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mbd-toolbar-desktop',
  templateUrl: './toolbar-desktop.component.html',
  styleUrls: ['./toolbar-desktop.component.scss'],
})
export class ToolbarDesktopComponent implements OnInit {
  constructor(private branchesService: BranchesService) {}

  ngOnInit(): void {}
  getBranch() {
    return this.branchesService.getBranch();
  }
}
