import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllIngredientsDesktopComponent } from './all-ingredients-desktop.component';

describe('AllIngredientsDesktopComponent', () => {
  let component: AllIngredientsDesktopComponent;
  let fixture: ComponentFixture<AllIngredientsDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AllIngredientsDesktopComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllIngredientsDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
