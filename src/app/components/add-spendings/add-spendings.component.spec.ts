import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSpendingsComponent } from './add-spendings.component';

describe('AddSpendingsComponent', () => {
  let component: AddSpendingsComponent;
  let fixture: ComponentFixture<AddSpendingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSpendingsComponent]
    });
    fixture = TestBed.createComponent(AddSpendingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
