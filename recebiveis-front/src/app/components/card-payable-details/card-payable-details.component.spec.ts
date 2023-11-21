import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPayableDetailsComponent } from './card-payable-details.component';

describe('CardPayableDetailsComponent', () => {
  let component: CardPayableDetailsComponent;
  let fixture: ComponentFixture<CardPayableDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardPayableDetailsComponent]
    });
    fixture = TestBed.createComponent(CardPayableDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
