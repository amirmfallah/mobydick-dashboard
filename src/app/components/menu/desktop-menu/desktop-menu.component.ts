import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Role } from 'src/core/core.interface';
import { AuthService } from 'src/core/services/auth.service';

@Component({
  selector: 'mbd-desktop-menu',
  templateUrl: './desktop-menu.component.html',
  styleUrls: ['./desktop-menu.component.scss'],
})
export class DesktopMenuComponent implements OnInit {
  @Output() navItemClicked = new EventEmitter<string>();
  itemClicked = '';
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onNavItemClicked(item: string): void {
    this.navItemClicked.emit(item);
    this.itemClicked = item;
  }

  hasSuperAccess(): boolean {
    return this.authService.hasAccess(Role.Super);
  }
}
