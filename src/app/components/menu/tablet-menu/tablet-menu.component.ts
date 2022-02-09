import { AuthService } from './../../../../core/services/auth.service';
import { NotificationService } from './../../../../core/services/notification.service';
import { BranchesService } from './../../../../core/services/branches.service';
import { Router } from '@angular/router';
import { Role } from './../../../../core/core.interface';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mbd-tablet-menu',
  templateUrl: './tablet-menu.component.html',
  styleUrls: ['./tablet-menu.component.scss'],
})
export class TabletMenuComponent implements OnInit {
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
  isMenuOpen = false;
  ngOnInit(): void {}

  onNavItemClicked(item: string, isPublic?: boolean): void {
    this.navItemClicked.emit(item);
    if (
      (this.branchesService.getBranch().value &&
        this.branchesService.getBranch().value.verified) ||
      this.authService.hasAccess(Role.Super) ||
      isPublic
    ) {
      this.itemClicked = item;
      this.router.navigate(['/', item]);
      return;
    }
    this.notificationService.show('شما به این برگه دسترسی ندارید.');
  }

  hasSuperAccess(): boolean {
    return this.authService.hasAccess(Role.Super);
  }

  openMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
