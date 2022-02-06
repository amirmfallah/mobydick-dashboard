import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllOrdersDesktopComponent } from './all-orders-desktop.component';

describe('AllOrdersDesktopComponent', () => {
  let component: AllOrdersDesktopComponent;
  let fixture: ComponentFixture<AllOrdersDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AllOrdersDesktopComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllOrdersDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
