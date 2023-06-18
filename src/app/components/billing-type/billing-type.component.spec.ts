import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingTypeComponent } from './billing-type.component';

describe('BillingTypeComponent', () => {
  let component: BillingTypeComponent;
  let fixture: ComponentFixture<BillingTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BillingTypeComponent]
    });
    fixture = TestBed.createComponent(BillingTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
