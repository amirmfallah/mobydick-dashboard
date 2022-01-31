import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeshanMapComponent } from './neshan-map.component';

describe('NeshanMapComponent', () => {
  let component: NeshanMapComponent;
  let fixture: ComponentFixture<NeshanMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NeshanMapComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeshanMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
