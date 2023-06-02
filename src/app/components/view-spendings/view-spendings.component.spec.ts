import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSpendingsComponent } from './view-spendings.component';

describe('ViewSpendingsComponent', () => {
  let component: ViewSpendingsComponent;
  let fixture: ComponentFixture<ViewSpendingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewSpendingsComponent]
    });
    fixture = TestBed.createComponent(ViewSpendingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
