import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlySpendingComponent } from './monthly-spending.component';

describe('MonthlySpendingComponent', () => {
  let component: MonthlySpendingComponent;
  let fixture: ComponentFixture<MonthlySpendingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonthlySpendingComponent]
    });
    fixture = TestBed.createComponent(MonthlySpendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
