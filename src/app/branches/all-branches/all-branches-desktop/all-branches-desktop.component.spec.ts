import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBranchesDesktopComponent } from './all-branches-desktop.component';

describe('AllBranchesDesktopComponent', () => {
  let component: AllBranchesDesktopComponent;
  let fixture: ComponentFixture<AllBranchesDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AllBranchesDesktopComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllBranchesDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
