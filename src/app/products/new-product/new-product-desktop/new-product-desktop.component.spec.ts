import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProductDesktopComponent } from './new-product-desktop.component';

describe('NewProductDesktopComponent', () => {
  let component: NewProductDesktopComponent;
  let fixture: ComponentFixture<NewProductDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewProductDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProductDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
