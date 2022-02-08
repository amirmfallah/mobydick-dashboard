import { Router } from '@angular/router';
import { AuthService } from './../../../../core/services/auth.service';
import { BranchesService } from 'src/core/services/branches.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mbd-toolbar-desktop',
  templateUrl: './toolbar-desktop.component.html',
  styleUrls: ['./toolbar-desktop.component.scss'],
})
export class ToolbarDesktopComponent implements OnInit {
  constructor(
    private branchesService: BranchesService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  getBranch() {
    return this.branchesService.getBranch();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
