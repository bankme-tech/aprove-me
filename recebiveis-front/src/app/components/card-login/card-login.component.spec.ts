import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardLoginComponent } from './card-login.component';

describe('CardLoginComponent', () => {
  let component: CardLoginComponent;
  let fixture: ComponentFixture<CardLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardLoginComponent]
    });
    fixture = TestBed.createComponent(CardLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
