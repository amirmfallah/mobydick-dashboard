import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductDesktopComponent } from './edit-product-desktop.component';

describe('EditProductDesktopComponent', () => {
  let component: EditProductDesktopComponent;
  let fixture: ComponentFixture<EditProductDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditProductDesktopComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProductDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
