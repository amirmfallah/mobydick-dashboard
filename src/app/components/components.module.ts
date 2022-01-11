import { RouterModule } from '@angular/router';
import { UiKitModule } from './../ui-kit/ui-kit.module';
import { DesktopMenuComponent } from './menu/desktop-menu/desktop-menu.component';
import { ToolbarMobileComponent } from './toolbar/toolbar-mobile/toolbar-mobile.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ToolbarDesktopComponent } from './toolbar/toolbar-desktop/toolbar-desktop.component';
import { TabletMenuComponent } from './menu/tablet-menu/tablet-menu.component';

@NgModule({
  declarations: [
    ToolbarMobileComponent,
    DesktopMenuComponent,
    ToolbarDesktopComponent,
    TabletMenuComponent,
  ],
  imports: [CommonModule, MatIconModule, UiKitModule, RouterModule],
  exports: [
    ToolbarMobileComponent,
    DesktopMenuComponent,
    ToolbarDesktopComponent,
    TabletMenuComponent,
  ],
})
export class ComponentsModule {}
