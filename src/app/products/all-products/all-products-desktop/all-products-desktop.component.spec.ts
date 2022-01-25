import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProductsDesktopComponent } from './all-products-desktop.component';

describe('AllProductsDesktopComponent', () => {
  let component: AllProductsDesktopComponent;
  let fixture: ComponentFixture<AllProductsDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllProductsDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllProductsDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
