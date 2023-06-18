import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpendingTypeComponent } from './spending-type.component';

describe('SpendingTypeComponent', () => {
  let component: SpendingTypeComponent;
  let fixture: ComponentFixture<SpendingTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpendingTypeComponent]
    });
    fixture = TestBed.createComponent(SpendingTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
