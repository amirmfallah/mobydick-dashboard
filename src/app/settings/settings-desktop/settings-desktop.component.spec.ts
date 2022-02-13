import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsDesktopComponent } from './settings-desktop.component';

describe('SettingsDesktopComponent', () => {
  let component: SettingsDesktopComponent;
  let fixture: ComponentFixture<SettingsDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsDesktopComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
