import { DashboardModule } from './../dashboard/dashboard.module';
import { ComponentsModule } from './../components/components.module';
import { UiKitModule } from './../ui-kit/ui-kit.module';
import { SettingsRoutingModule } from './settings-routing.module';
import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { SettingsDesktopComponent } from './settings-desktop/settings-desktop.component';

@NgModule({
  declarations: [SettingsComponent, SettingsDesktopComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    UiKitModule,
    ComponentsModule,
    DashboardModule,
  ],
})
export class SettingsModule {}
