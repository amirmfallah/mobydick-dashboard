import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mbd-tablet-menu',
  templateUrl: './tablet-menu.component.html',
  styleUrls: ['./tablet-menu.component.scss'],
})
export class TabletMenuComponent implements OnInit {
  @Output() navItemClicked = new EventEmitter<string>();
  itemClicked = '';
  isMenuOpen = false;
  constructor() {}

  ngOnInit(): void {}

  onNavItemClicked(item: string): void {
    this.navItemClicked.emit(item);
    this.itemClicked = item;
  }

  openMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
