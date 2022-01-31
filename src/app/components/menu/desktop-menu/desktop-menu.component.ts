import { Router } from '@angular/router';
import { NotificationService } from './../../../../core/services/notification.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Role } from 'src/core/core.interface';
import { AuthService } from 'src/core/services/auth.service';
import { BranchesService } from 'src/core/services/branches.service';

@Component({
  selector: 'mbd-desktop-menu',
  templateUrl: './desktop-menu.component.html',
  styleUrls: ['./desktop-menu.component.scss'],
})
export class DesktopMenuComponent implements OnInit {
  @Output() navItemClicked = new EventEmitter<string>();
  itemClicked = '';
  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private branchesService: BranchesService,
    private router: Router
  ) {
    this.branchesService.loadBranch();
  }

  ngOnInit(): void {}

  onNavItemClicked(item: string, isPublic?: boolean): void {
    this.navItemClicked.emit(item);
    this.itemClicked = item;
    if (
      (this.branchesService.getBranch().value &&
        this.branchesService.getBranch().value.verified) ||
      this.authService.hasAccess(Role.Super) ||
      isPublic
    ) {
      this.router.navigate(['/', item]);
      return;
    }
    this.notificationService.show('شما به این برگه دسترسی ندارید.');
  }

  hasSuperAccess(): boolean {
    return this.authService.hasAccess(Role.Super);
  }
}
