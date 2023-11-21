import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPayableComponent } from './card-payable.component';

describe('CardPayableComponent', () => {
  let component: CardPayableComponent;
  let fixture: ComponentFixture<CardPayableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardPayableComponent]
    });
    fixture = TestBed.createComponent(CardPayableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
