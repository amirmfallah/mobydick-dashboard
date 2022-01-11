import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabletMenuComponent } from './tablet-menu.component';

describe('TabletMenuComponent', () => {
  let component: TabletMenuComponent;
  let fixture: ComponentFixture<TabletMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabletMenuComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabletMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
