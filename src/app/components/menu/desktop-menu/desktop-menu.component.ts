import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'mbd-desktop-menu',
  templateUrl: './desktop-menu.component.html',
  styleUrls: ['./desktop-menu.component.scss'],
})
export class DesktopMenuComponent implements OnInit {
  @Output() navItemClicked = new EventEmitter<string>();
  itemClicked = '';
  constructor() {}

  ngOnInit(): void {}

  onNavItemClicked(item: string): void {
    this.navItemClicked.emit(item);
    this.itemClicked = item;
  }
}
