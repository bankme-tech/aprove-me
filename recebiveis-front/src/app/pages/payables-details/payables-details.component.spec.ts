import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayablesDetailsComponent } from './payables-details.component';

describe('PayablesDetailsComponent', () => {
  let component: PayablesDetailsComponent;
  let fixture: ComponentFixture<PayablesDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PayablesDetailsComponent]
    });
    fixture = TestBed.createComponent(PayablesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
